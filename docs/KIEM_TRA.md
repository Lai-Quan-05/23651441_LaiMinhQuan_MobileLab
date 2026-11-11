# Kiểm tra sau khi chép code

Ngày: 11/11/2026.

- Đã đối chiếu 97 file mã nguồn và ảnh: 91 file trùng bản gốc, 6 file chỉ thay thông tin sinh viên hoặc đường dẫn tuần 5.
- Thông tin sinh viên: Lại Minh Quân, MSSV 23651441. Đã tìm lại trong mã các tuần, không còn tên/MSSV cũ. Email đăng nhập giả lập dùng 23651441@example.com.
- TypeScript và lint của phần nối ứng dụng đạt; lint còn một cảnh báo biến catch không dùng trong App tuần 10 gốc.
- Format đạt cho phần nối và tài liệu. Các thư mục code gốc không được tự định dạng, lint hoặc kiểm tra kiểu để giữ nguyên nội dung; chúng được kiểm tra qua đối chiếu bản sao và bundle.
- Bundle web, Android và iOS thành công sau khi thay code.
- Đã gỡ test của giỏ hàng và store tự viết vì các phần đó đã được thay bằng code gốc. Chưa chạy lại các test tiện ích API trong lượt này.
- Chưa kiểm tra tương tác trên thiết bị hoặc gọi API thật. URL API được giữ như bản gốc.
- Tuần 4 vẫn chờ đề. Tuần 2 và 3 dùng chung bài nhà sách theo nội dung đã có.

README gốc của repo giữ nguyên câu được yêu cầu. Bộ công cụ Mockaroo được giữ riêng, chưa gắn vào các App gốc.
