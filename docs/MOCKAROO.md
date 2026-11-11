# Cấu hình Mockaroo cho MobileLab

## Trạng thái

Bộ handler đã được chuẩn bị trong repo. Chưa xác nhận tạo và lưu các route trên tài khoản Mockaroo; cần có phiên tài khoản truy cập được để thực hiện và kiểm tra với dịch vụ thật.

## Ba route cần tạo

Mở [Mockaroo → APIs → New Mock API](https://www.mockaroo.com/apis/new) trong tài khoản của bạn. Với từng dòng, chọn phương thức, nhập route và dán toàn bộ nội dung file vào Handler Script rồi lưu.

| Phương thức | Route                      | Handler                                        |
| ----------- | -------------------------- | ---------------------------------------------- |
| GET         | `mobilelab/movies.json`    | [get-movies.rb](../mockaroo/get-movies.rb)     |
| GET         | `mobilelab/tours.json`     | [get-tours.rb](../mockaroo/get-tours.rb)       |
| PUT         | `mobilelab/tours/:id.json` | [put-favorite.rb](../mockaroo/put-favorite.rb) |

Handler GET trả dữ liệu cố định để id và thông tin tour không bị đổi khi tải lại. Handler PUT đọc `params['id']` và `entity['isFavorite']`, trả xác nhận cho tour hợp lệ. Các API này dùng khả năng trả dữ liệu tĩnh và đọc request của [Mockaroo Handler API](https://mockaroo.com/apis/new).

Khi thay seed trong `src/data/api.ts`, chạy `npm run mockaroo:prepare` để cập nhật hai handler GET và hai file JSON, rồi lưu lại handler trên Mockaroo. Nếu thêm/xóa tour, cập nhật danh sách id hợp lệ trong `put-favorite.rb`.

## Server trung gian

Khóa tài khoản được giữ trên server. File cấu hình riêng đã được gitignore:

```powershell
Copy-Item .env.server.example .env.server.local
```

Trong `.env.server.local`, điền `MOCKAROO_API_KEY` bằng khóa của tài khoản, kiểm tra URL ba route vừa tạo. Không gửi khóa qua chat hoặc commit file này. Mockaroo hỗ trợ xác thực bằng header `X-API-Key`. [Tài liệu xác thực](https://www.mockaroo.com/docs).

```bash
npm run api:start
```

Server mặc định nghe ở `127.0.0.1:3001`. `GET http://127.0.0.1:3001/health` xác nhận server đang chạy, còn `/movies` và `/tours` kiểm tra kết nối tới Mockaroo.

## Kết nối ứng dụng

Tạo `.env.local` từ `.env.example` và đặt URL tương ứng thiết bị:

```dotenv
EXPO_PUBLIC_MOVIES_API_URL=http://127.0.0.1:3001/movies
EXPO_PUBLIC_TOURS_API_URL=http://127.0.0.1:3001/tours
EXPO_PUBLIC_TOUR_FAVORITE_API_URL=
```

- Trình duyệt trên cùng máy: dùng `127.0.0.1` như trên, mở Expo ở `http://localhost:8081` hoặc `http://127.0.0.1:8081`.
- Android Emulator chuẩn: dùng `10.0.2.2` thay `127.0.0.1`.
- Điện thoại cùng mạng: đặt `API_HOST=0.0.0.0` trong cấu hình server và dùng IP LAN của máy tính trong URL app; cấu hình mạng trên máy phải cho phép kết nối đến cổng API.
- Nếu Expo web dùng origin khác, thêm origin đó vào `API_ALLOWED_ORIGINS`, ngăn cách bằng dấu phẩy.

Khởi động lại Expo sau khi đổi biến môi trường. Giữ server chạy đồng thời với Expo.

## Kiểm tra sau khi tạo route

1. Mở `/movies`, `/tours` trên server: trả mảng đúng schema trong [API.md](API.md).
2. Vào tuần 6: tải phim, đổi số cột, xem chi tiết và tải lại.
3. Vào tuần 8: tắt mô phỏng lỗi, đổi yêu thích rồi tải lại. Trạng thái được giữ trong cùng phiên server.
4. Bật mô phỏng lỗi: yêu thích phải trở về trạng thái trước thao tác và báo lỗi.
5. Dừng rồi chạy lại server: yêu thích trở về dữ liệu gốc. Đây là bộ nhớ phiên của proxy; route Mockaroo không phải cơ sở dữ liệu lưu tour.

Các kiểm thử tự động của proxy dùng phản hồi Mockaroo mô phỏng. Chúng không xác nhận route đã tồn tại trên tài khoản thật.
