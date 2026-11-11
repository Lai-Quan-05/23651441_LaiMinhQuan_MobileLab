import { createMockarooServer } from './server';

const port = Number(process.env.API_PORT ?? 3001);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('API_PORT không hợp lệ.');
const server = createMockarooServer({
  apiKey: process.env.MOCKAROO_API_KEY ?? '',
  moviesUrl: process.env.MOCKAROO_MOVIES_URL ?? 'https://my.api.mockaroo.com/mobilelab/movies.json',
  toursUrl: process.env.MOCKAROO_TOURS_URL ?? 'https://my.api.mockaroo.com/mobilelab/tours.json',
  favoriteUrl:
    process.env.MOCKAROO_FAVORITE_URL ?? 'https://my.api.mockaroo.com/mobilelab/tours/:id.json',
  allowedOrigins: process.env.API_ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
});
server.on('error', (error) => {
  console.error(`Không mở được API: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, process.env.API_HOST ?? '127.0.0.1', () => {
  console.log(`MobileLab API đã sẵn sàng tại cổng ${port}.`);
});
