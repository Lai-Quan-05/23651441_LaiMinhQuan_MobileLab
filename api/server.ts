import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { buildFavoriteUrl, parseMovies, parseTours, type Tour } from '../src/data/api';

export type MockarooConfig = {
  apiKey: string;
  moviesUrl: string;
  toursUrl: string;
  favoriteUrl: string;
  allowedOrigins?: string[];
  fetchImpl?: typeof fetch;
};
class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}
function checkMockarooUrl(value: string) {
  const url = new URL(value);
  if (
    url.origin !== 'https://my.api.mockaroo.com' ||
    url.username ||
    url.password ||
    url.searchParams.has('key')
  ) {
    throw new Error('URL phải thuộc https://my.api.mockaroo.com và không chứa khóa truy cập.');
  }
}
function send(response: ServerResponse, status: number, value: unknown) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(value));
}
async function readBody(request: IncomingMessage): Promise<unknown> {
  if (!request.headers['content-type']?.toLowerCase().startsWith('application/json'))
    throw new HttpError(415, 'Body phải có Content-Type application/json.');
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > 8192) throw new HttpError(413, 'Body vượt quá 8 KB.');
    chunks.push(buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
  } catch {
    throw new HttpError(400, 'Body không phải JSON hợp lệ.');
  }
}

export function createMockarooServer(config: MockarooConfig) {
  if (!config.apiKey.trim()) throw new Error('Thiếu MOCKAROO_API_KEY trong .env.server.local.');
  for (const url of [config.moviesUrl, config.toursUrl, config.favoriteUrl]) checkMockarooUrl(url);
  if (!new URL(config.favoriteUrl).pathname.includes(':id'))
    throw new Error('MOCKAROO_FAVORITE_URL cần chứa :id.');
  const upstreamFetch = config.fetchImpl ?? fetch;
  const allowedOrigins = new Set(
    config.allowedOrigins ?? ['http://localhost:8081', 'http://127.0.0.1:8081'],
  );
  const favorites = new Map<string, boolean>();
  let latestTours: Tour[] | null = null;

  async function upstream(url: string, options: RequestInit = {}): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await upstreamFetch(url, {
        ...options,
        headers: { 'Content-Type': 'application/json', 'X-API-Key': config.apiKey },
        signal: controller.signal,
        redirect: 'error',
      });
      if (!response.ok) throw new HttpError(502, `Mockaroo trả về HTTP ${response.status}.`);
      const text = await response.text();
      return text.trim() ? (JSON.parse(text) as unknown) : null;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(
        502,
        controller.signal.aborted
          ? 'Mockaroo phản hồi quá 10 giây.'
          : 'Không nhận được JSON hợp lệ từ Mockaroo.',
      );
    } finally {
      clearTimeout(timer);
    }
  }
  async function fetchTours() {
    try {
      latestTours = parseTours(await upstream(config.toursUrl));
      return latestTours;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(502, 'Schema tour từ Mockaroo không hợp lệ.');
    }
  }
  async function handle(request: IncomingMessage, response: ServerResponse) {
    const origin = request.headers.origin;
    if (origin && !allowedOrigins.has(origin))
      throw new HttpError(403, 'Origin chưa được cho phép.');
    if (origin) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
    }
    response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (request.method === 'OPTIONS') {
      response.writeHead(204);
      response.end();
      return;
    }
    const { pathname } = new URL(request.url ?? '/', 'http://localhost');
    if (request.method === 'GET' && pathname === '/health') {
      send(response, 200, { status: 'ok', provider: 'mockaroo', favoriteStorage: 'memory' });
      return;
    }
    if (request.method === 'GET' && pathname === '/movies') {
      let movies;
      try {
        movies = parseMovies(await upstream(config.moviesUrl));
      } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError(502, 'Schema phim từ Mockaroo không hợp lệ.');
      }
      send(response, 200, movies);
      return;
    }
    if (request.method === 'GET' && pathname === '/tours') {
      const tours = await fetchTours();
      send(
        response,
        200,
        tours.map((tour) => ({ ...tour, isFavorite: favorites.get(tour.id) ?? tour.isFavorite })),
      );
      return;
    }
    const match = /^\/tours\/([A-Za-z0-9_-]{1,80})$/.exec(pathname);
    if (request.method === 'PUT' && match) {
      const id = match[1]!;
      const body = await readBody(request);
      if (
        !body ||
        typeof body !== 'object' ||
        Array.isArray(body) ||
        !('isFavorite' in body) ||
        typeof body.isFavorite !== 'boolean'
      )
        throw new HttpError(400, 'isFavorite phải là boolean.');
      if (!(latestTours ?? (await fetchTours())).some((tour) => tour.id === id))
        throw new HttpError(404, 'Không tìm thấy tour.');
      const result = await upstream(buildFavoriteUrl(config.toursUrl, id, config.favoriteUrl), {
        method: 'PUT',
        body: JSON.stringify({ isFavorite: body.isFavorite }),
      });
      if (
        !result ||
        typeof result !== 'object' ||
        !('id' in result) ||
        String(result.id) !== id ||
        !('isFavorite' in result) ||
        result.isFavorite !== body.isFavorite
      )
        throw new HttpError(502, 'Mockaroo chưa xác nhận đúng nội dung cập nhật.');
      // Mockaroo mô phỏng phản hồi; proxy giữ yêu thích trong phiên chạy của server.
      favorites.set(id, body.isFavorite);
      send(response, 200, { id, isFavorite: body.isFavorite });
      return;
    }
    throw new HttpError(
      ['GET', 'PUT'].includes(request.method ?? '') ? 404 : 405,
      'Không hỗ trợ đường dẫn hoặc phương thức này.',
    );
  }
  return createServer((request, response) => {
    void handle(request, response).catch((error) => {
      if (response.headersSent) {
        response.destroy();
        return;
      }
      send(response, error instanceof HttpError ? error.status : 500, {
        error: error instanceof HttpError ? error.message : 'Lỗi xử lý API.',
      });
    });
  });
}
