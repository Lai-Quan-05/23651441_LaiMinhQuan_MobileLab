# Mobile Lab — Lại Minh Quân

**MSSV:** 23651441 · **Lớp:** DHKTPM19ATT

**Học phần:** Lập trình Thiết bị di động

**Công nghệ:** React Native, Expo SDK 58, TypeScript, Expo Router, Redux Toolkit.

Một ứng dụng chung có màn hình chọn tuần, mỗi bài có màn hình và phần mã riêng. Cài thư viện một lần để chạy các tuần.

## Phạm vi hiện tại

Đã triển khai **8 tuần: 1, 2, 3, 5, 6, 7, 8, 9**. **Tuần 4 và tuần 10 chờ đề**, hiển thị đúng trạng thái trên trang chủ. Nội dung được đối chiếu từ repo tham khảo của bạn cùng lớp, chưa có đề chính thức để xác nhận toàn bộ tiêu chí chấm.

| Tuần | Nội dung                                                                                                 | Mã nguồn chính                                                                             |
| ---- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1    | 8 bài: User Card, Counter, Todo, Custom Button, Live Input, Loading Wrapper, Gender Selector, App Button | [Basics.tsx](src/weeks/week1/Basics.tsx)                                                   |
| 2    | Header, bìa sách, thẻ sách, bố cục Flexbox                                                               | [Bookstore.tsx](src/weeks/bookstore/Bookstore.tsx), [route tuần 2](src/app/week2.tsx)      |
| 3    | Tìm sách/tác giả, lọc thể loại, đổi lưới và danh sách                                                    | [Bookstore.tsx](src/weeks/bookstore/Bookstore.tsx), [route tuần 3](src/app/week3.tsx)      |
| 4    | Chờ đề                                                                                                   | —                                                                                          |
| 5    | Chi tiết Vsmart, chọn 4 màu, truyền tham số qua Expo Router                                              | [week5](src/app/week5)                                                                     |
| 6    | Movie App, API, loading/error/empty, đổi 1–2 cột, kéo tải lại, xem chi tiết                              | [Movies.tsx](src/weeks/week6/Movies.tsx)                                                   |
| 7    | Bike Shop: chào, lọc loại xe, chi tiết, giỏ hàng dùng Context + reducer                                  | [week7](src/app/week7), [reducer](src/weeks/week7/cartReducer.ts)                          |
| 8    | Tour Việt, tìm kiếm, SectionList theo thành phố, yêu thích ngang, PUT, rollback khi lỗi                  | [Tours.tsx](src/weeks/week8/Tours.tsx)                                                     |
| 9    | Redux Toolkit: sách/chi tiết, counter, giỏ hàng, badge, tổng tiền, đặt hàng và tài khoản mô phỏng        | [store](src/weeks/week9/store.ts), [tabs](src/app/week9), [checkout](src/app/checkout.tsx) |
| 10   | Chờ đề                                                                                                   | —                                                                                          |

Repo tham khảo gộp tuần 2–3 thành một bài nhà sách. Ở đây chia phần bố cục vào tuần 2 và phần tương tác vào tuần 3; cách phân chia này chưa được xác nhận bằng đề giảng viên. Tuần 9 bám phạm vi bản mobile `week9-reduxToolkit` của nguồn tham khảo.

## Cài đặt và chạy

Cần **Node.js 22.13 trở lên** và npm. Phiên bản cụ thể được khóa trong `package-lock.json`.

```bash
git clone https://github.com/Lai-Quan-05/23651441_LaiMinhQuan_MobileLab.git
cd 23651441_LaiMinhQuan_MobileLab
npm ci
npm start
```

- Trên điện thoại: dùng Expo Go tương thích SDK 58, kết nối cùng mạng với máy tính rồi quét QR.
- Trên Android Emulator đã cài sẵn: nhấn `a` trong Expo hoặc chạy `npm run android`.
- Trên trình duyệt: chạy `npm run web`.
- Trên macOS có iOS Simulator: chạy `npm run ios`.

Trang đầu có nút vào từng tuần. State giỏ hàng, counter và đăng nhập tồn tại trong phiên chạy; tải lại ứng dụng sẽ đặt lại. Dữ liệu tour mẫu giữ thay đổi khi chuyển màn hình trong cùng phiên.

## Dữ liệu và API

Mặc định dùng dữ liệu mẫu kèm độ trễ mô phỏng, nên có thể thực hành mà chưa cần tài khoản API. Phim, sách, tác giả, tour, giá và điểm đánh giá đều là dữ liệu minh họa. Hình minh họa được dựng bằng React Native Views.

Để thực hành HTTP ở tuần 6 và 8, sao chép `.env.example` thành `.env`, rồi điền endpoint **của bạn**:

```dotenv
EXPO_PUBLIC_MOVIES_API_URL=https://YOUR_PROJECT.mockapi.io/movies
EXPO_PUBLIC_TOURS_API_URL=https://YOUR_PROJECT.mockapi.io/tours
```

Khởi động lại Expo sau khi đổi `.env`. Các biến `EXPO_PUBLIC_*` được đưa vào ứng dụng, chỉ điền URL công khai. Xem [schema, dữ liệu nhập mẫu và cách kiểm tra API](docs/API.md). Khi cấu hình HTTP, lỗi máy chủ được hiển thị rõ; ứng dụng giữ chế độ API để người dùng có thể sửa kết nối.

## Đọc và tự kiểm tra bài

- [Giải thích kiến thức từng tuần](docs/BAI_HOC.md)
- [Kịch bản chạy thử từng chức năng](docs/TU_KIEM_TRA.md)
- [Nguồn tham khảo và cách đối chiếu](docs/NGUON_THAM_KHAO.md)
- [Kết quả kiểm tra và giới hạn môi trường](docs/KIEM_TRA.md)

```bash
npm run typecheck
npm run lint
npm test
npm run export:web
npm run export:android
```

`export:android` kiểm tra quá trình bundle JavaScript cho Android, không tạo APK. Đăng nhập và đặt hàng trong tuần 9 là mô phỏng trên máy. Các biểu mẫu chỉ cần dữ liệu giả để thực hành.

GitHub Actions tự chạy typecheck, lint, test và export web khi push/PR.
