export type Movie = { id: string; title: string; year: number; genre: string; rating: number };
export type Tour = {
  id: string;
  name: string;
  city: string;
  price: number;
  days: number;
  departure: string;
  isFavorite: boolean;
};
export const movieSeed: Movie[] = [
  { id: '1', title: 'Hành trình bình minh', year: 2025, genre: 'Phiêu lưu', rating: 8.1 },
  { id: '2', title: 'Góc phố mùa hạ', year: 2024, genre: 'Tình cảm', rating: 7.8 },
  { id: '3', title: 'Trạm không gian', year: 2026, genre: 'Khoa học viễn tưởng', rating: 8.6 },
  { id: '4', title: 'Bức thư cuối', year: 2025, genre: 'Tâm lý', rating: 8.2 },
  { id: '5', title: 'Đường về nhà', year: 2023, genre: 'Gia đình', rating: 7.9 },
  { id: '6', title: 'Mật mã xanh', year: 2026, genre: 'Trinh thám', rating: 8.4 },
];
export const tourSeed: Tour[] = [
  {
    id: '1',
    name: 'Một sáng bên Hồ Xuân Hương',
    city: 'Đà Lạt',
    price: 1890000,
    days: 3,
    departure: '2026-12-12',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Săn mây đồi chè',
    city: 'Đà Lạt',
    price: 2190000,
    days: 3,
    departure: '2026-12-19',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Biển xanh Sơn Trà',
    city: 'Đà Nẵng',
    price: 3290000,
    days: 4,
    departure: '2026-12-20',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Dạo phố và những cây cầu',
    city: 'Đà Nẵng',
    price: 2590000,
    days: 3,
    departure: '2026-12-26',
    isFavorite: true,
  },
  {
    id: '5',
    name: 'Phố cổ trong nắng',
    city: 'Hội An',
    price: 2790000,
    days: 3,
    departure: '2027-01-02',
    isFavorite: false,
  },
];
export const movieEndpoint = process.env.EXPO_PUBLIC_MOVIES_API_URL?.trim();
export const tourEndpoint = process.env.EXPO_PUBLIC_TOURS_API_URL?.trim();
const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 350));

export async function requestJson(url: string, options: RequestInit = {}): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`Máy chủ trả về HTTP ${response.status}.`);
    return await response.json();
  } catch (error) {
    if (controller.signal.aborted) throw new Error('Kết nối quá 12 giây. Hãy thử lại.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
const hasId = (value: Record<string, unknown>) =>
  (typeof value.id === 'string' && value.id.length > 0) ||
  (typeof value.id === 'number' && Number.isFinite(value.id));
export function parseMovies(value: unknown): Movie[] {
  if (!Array.isArray(value)) throw new Error('API phim phải trả về một mảng JSON.');
  const ids = new Set<string>();
  return value.map((item) => {
    if (
      !object(item) ||
      !hasId(item) ||
      typeof item.title !== 'string' ||
      typeof item.genre !== 'string' ||
      typeof item.year !== 'number' ||
      !Number.isInteger(item.year) ||
      typeof item.rating !== 'number' ||
      !Number.isFinite(item.rating) ||
      item.rating < 0 ||
      item.rating > 10
    )
      throw new Error('Dữ liệu phim không đúng schema trong docs/API.md.');
    const id = String(item.id);
    if (ids.has(id)) throw new Error('API phim có id trùng nhau.');
    ids.add(id);
    return { id, title: item.title, genre: item.genre, year: item.year, rating: item.rating };
  });
}
export function parseTours(value: unknown): Tour[] {
  if (!Array.isArray(value)) throw new Error('API tour phải trả về một mảng JSON.');
  const ids = new Set<string>();
  return value.map((item) => {
    if (
      !object(item) ||
      !hasId(item) ||
      typeof item.name !== 'string' ||
      typeof item.city !== 'string' ||
      typeof item.price !== 'number' ||
      !Number.isFinite(item.price) ||
      item.price < 0 ||
      typeof item.days !== 'number' ||
      !Number.isInteger(item.days) ||
      item.days < 1 ||
      typeof item.departure !== 'string' ||
      !Number.isFinite(Date.parse(item.departure)) ||
      typeof item.isFavorite !== 'boolean'
    )
      throw new Error('Dữ liệu tour không đúng schema trong docs/API.md.');
    const id = String(item.id);
    if (ids.has(id)) throw new Error('API tour có id trùng nhau.');
    ids.add(id);
    return {
      id,
      name: item.name,
      city: item.city,
      price: item.price,
      days: item.days,
      departure: item.departure,
      isFavorite: item.isFavorite,
    };
  });
}
let demoTours = tourSeed.map((tour) => ({ ...tour }));
export async function getMovies(): Promise<Movie[]> {
  if (movieEndpoint) return parseMovies(await requestJson(movieEndpoint));
  await wait();
  return movieSeed.map((movie) => ({ ...movie }));
}
export async function getTours(): Promise<Tour[]> {
  if (tourEndpoint) return parseTours(await requestJson(tourEndpoint));
  await wait();
  return demoTours.map((tour) => ({ ...tour }));
}
export async function saveFavorite(
  id: string,
  isFavorite: boolean,
  simulateFailure = false,
): Promise<void> {
  if (simulateFailure) {
    await wait();
    throw new Error('Lỗi mô phỏng: trạng thái đã được khôi phục.');
  }
  if (tourEndpoint) {
    await requestJson(`${tourEndpoint.replace(/\/$/, '')}/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite }),
    });
    return;
  }
  await wait();
  demoTours = demoTours.map((tour) => (tour.id === id ? { ...tour, isFavorite } : tour));
}
export function groupTours(tours: Tour[]) {
  const groups = new Map<string, Tour[]>();
  for (const tour of tours) groups.set(tour.city, [...(groups.get(tour.city) ?? []), tour]);
  return Array.from(groups, ([title, data]) => ({ title, data }));
}
export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.';
}
