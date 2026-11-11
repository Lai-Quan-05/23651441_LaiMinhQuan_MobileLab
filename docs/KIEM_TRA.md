# Kết quả kiểm tra

Ngày kiểm tra: **11/11/2026**.

Môi trường: Windows, Node.js 22.22.3, Expo SDK 58.0.23, React Native 0.88.1, TypeScript 6.0.3.

| Kiểm tra               | Kết quả                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run typecheck`    | Đạt, không có lỗi TypeScript.                                         |
| `npm run lint`         | Đạt, không có lỗi hoặc cảnh báo lint.                                 |
| `npm test`             | Đạt 18/18 bài kiểm thử.                                               |
| `npm run format:check` | Đạt, định dạng code nhất quán.                                        |
| Export web             | Đạt, Metro bundle thành công vào `dist/`.                             |
| Export Android và iOS  | Đạt, Metro tạo bundle Hermes khi export toàn bộ nền tảng vào `dist/`. |

Các bài kiểm thử bao gồm: thêm sách trùng, giới hạn số lượng, xóa giỏ, tính tiền từ catalogue, tách biệt counter/auth/cart, cập nhật giỏ xe bất biến, kiểm tra schema API, ngày lịch không hợp lệ, id trùng, nhóm tour, lỗi HTTP, phản hồi 204, hủy request, URL có query string và cập nhật yêu thích mẫu thành công/thất bại.

Đã kiểm tra HTTP của server trung gian bằng phản hồi Mockaroo mô phỏng: lấy phim, xác nhận PUT, giữ yêu thích trong phiên server, body sai, tour không tồn tại, CORS và lỗi upstream. Server không đưa API key vào phản hồi.

Đã đối chiếu 66 file dự án (không tính dependency, thư mục Git và sản phẩm build), parse 7 file JSON, kiểm tra 21 đường dẫn tài liệu cục bộ. Dependency trong `package.json` khớp lockfile. README giữ nguyên nội dung được yêu cầu.

## Lỗi đã sửa trong lượt rà soát

- HTTP 204 không còn gây lỗi đọc JSON sau khi cập nhật thành công.
- URL cập nhật yêu thích giữ query string và hỗ trợ route riêng có `:id.json`.
- Phim ngừng request khi rời màn hình và chặn tải lại trùng lặp.
- Schema từ chối chuỗi rỗng, năm không hợp lệ và ngày không tồn tại như 31/02.
- Giỏ xe từ chối id không có trong catalogue; các nút thêm sản phẩm khóa khi đạt giới hạn 99.
- Tích hợp Mockaroo qua server giữ khóa riêng, với handler GET/PUT được chuẩn bị tại `mockaroo/`.

## Giới hạn đã xác định

- Chưa kiểm tra thao tác tương tác hoặc bố cục trên trình duyệt/điện thoại/emulator. Công cụ truy cập trình duyệt trong phiên làm việc báo không kết nối được browser host.
- Chưa xác nhận tạo route trên tài khoản Mockaroo hoặc kết nối dịch vụ thật. Công cụ không truy cập được phiên trình duyệt; chưa có cấu hình khóa riêng tại máy để kiểm tra HTTP thật. Xem [MOCKAROO.md](MOCKAROO.md).
- Bundle Android thành công không thay thế cho chạy trên thiết bị và không tạo APK.
- Tuần 4 và tuần 10 đang chờ đề bài.

Các bước kiểm tra trực tiếp được ghi trong [TU_KIEM_TRA.md](TU_KIEM_TRA.md).
