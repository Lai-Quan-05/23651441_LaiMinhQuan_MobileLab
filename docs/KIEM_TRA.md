# Kết quả kiểm tra

Ngày kiểm tra: **11/11/2026**.

Môi trường: Windows, Node.js 22.22.3, Expo SDK 58.0.23, React Native 0.88.1, TypeScript 6.0.3.

| Kiểm tra            | Kết quả                                           |
| ------------------- | ------------------------------------------------- |
| `npm run typecheck` | Đạt, không có lỗi TypeScript.                     |
| `npm run lint`      | Đạt, không có lỗi hoặc cảnh báo lint.             |
| `npm test`          | Đạt 10/10 bài kiểm thử.                           |
| Export web          | Đạt, Metro bundle thành công vào `dist/`.         |
| Export Android      | Đạt, Metro tạo bundle Hermes vào `dist-android/`. |

Các bài kiểm thử bao gồm: thêm sách trùng, giới hạn số lượng, xóa giỏ, tính tiền từ catalogue, tách biệt counter/auth/cart, cập nhật giỏ xe bất biến, kiểm tra schema API, id trùng, nhóm tour, lỗi HTTP và cập nhật yêu thích mẫu thành công/thất bại.

## Giới hạn đã xác định

- Chưa kiểm tra thao tác tương tác hoặc bố cục trên trình duyệt/điện thoại/emulator. Công cụ truy cập trình duyệt trong phiên làm việc báo không kết nối được browser host.
- Chưa có endpoint của người học để kiểm tra HTTP thật. Đã kiểm tra helper HTTP bằng response mô phỏng và luồng dữ liệu mẫu bằng test.
- Bundle Android thành công không thay thế cho chạy trên thiết bị và không tạo APK.
- Tuần 4 và tuần 10 đang chờ đề bài.

Các bước kiểm tra trực tiếp được ghi trong [TU_KIEM_TRA.md](TU_KIEM_TRA.md).
