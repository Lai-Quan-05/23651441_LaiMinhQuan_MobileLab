export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  color: string;
};
export const books: Book[] = [
  {
    id: 'b1',
    title: 'Những ngày xanh',
    author: 'An Nhiên',
    category: 'Văn học',
    price: 89000,
    color: '#205d63',
  },
  {
    id: 'b2',
    title: 'Học React từng bước',
    author: 'Nhóm Mobile Lab',
    category: 'Công nghệ',
    price: 159000,
    color: '#284e85',
  },
  {
    id: 'b3',
    title: 'Một giờ cho bản thân',
    author: 'Minh Hạ',
    category: 'Kỹ năng',
    price: 109000,
    color: '#994f34',
  },
  {
    id: 'b4',
    title: 'Chuyện của mây',
    author: 'Thanh Lam',
    category: 'Văn học',
    price: 75000,
    color: '#6a5789',
  },
  {
    id: 'b5',
    title: 'TypeScript thực hành',
    author: 'Nhóm Mobile Lab',
    category: 'Công nghệ',
    price: 179000,
    color: '#356e88',
  },
  {
    id: 'b6',
    title: 'Thói quen nhỏ',
    author: 'Hoài An',
    category: 'Kỹ năng',
    price: 99000,
    color: '#8a6726',
  },
];
export type Bike = {
  id: string;
  name: string;
  kind: 'Road' | 'Mountain';
  price: number;
  color: string;
  description: string;
};
export const bikes: Bike[] = [
  {
    id: 'r1',
    name: 'Urban Sprint',
    kind: 'Road',
    price: 4590000,
    color: '#bde3dd',
    description:
      'Khung nhôm nhẹ, bộ truyền động 14 tốc độ. Phù hợp đường phố và những chuyến đi cuối tuần.',
  },
  {
    id: 'r2',
    name: 'Coast Runner',
    kind: 'Road',
    price: 5290000,
    color: '#c7d9ee',
    description:
      'Thiết kế thoải mái, phanh đĩa và lốp bám đường. Bạn đồng hành cho hành trình dài.',
  },
  {
    id: 'm1',
    name: 'Trail Explorer',
    kind: 'Mountain',
    price: 6790000,
    color: '#e7d6ba',
    description:
      'Phuộc trước giảm xóc, 21 tốc độ, lốp địa hình. Dành cho cung đường nhiều thử thách.',
  },
  {
    id: 'm2',
    name: 'Forest Ride',
    kind: 'Mountain',
    price: 7490000,
    color: '#d9cfe7',
    description:
      'Bánh 27.5 inch, khung chắc chắn và tay lái rộng. Tự tin khám phá các cung đường mới.',
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
