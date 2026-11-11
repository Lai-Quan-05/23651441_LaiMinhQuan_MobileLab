import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { movieSeed, tourSeed } from '../src/data/api';

const folder = join(process.cwd(), 'mockaroo');
mkdirSync(folder, { recursive: true });
for (const [name, rows] of [
  ['movies', movieSeed],
  ['tours', tourSeed],
] as const) {
  const json = JSON.stringify(rows, null, 2);
  writeFileSync(join(folder, `${name}.json`), `${json}\n`);
  const ruby = json.replace(/"([A-Za-z_]+)":/g, '"$1" =>');
  writeFileSync(
    join(folder, `get-${name}.rb`),
    `# GET /mobilelab/${name}.json\nheader 'Content-Type', 'application/json'\n${ruby}\n`,
  );
}
console.log('Đã tạo dữ liệu và handler GET trong thư mục mockaroo. Chưa tạo route trên tài khoản.');
