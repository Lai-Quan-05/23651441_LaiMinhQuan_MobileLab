# Kịch bản tự chạy thử

Các bước dưới đây là hướng dẫn kiểm tra thủ công. Kết quả đã thực hiện trong môi trường phát triển được ghi riêng ở [KIEM_TRA.md](KIEM_TRA.md).

## Trang chủ

- Mở ứng dụng, kiểm tra tên/MSSV/lớp và 9 tuần có nút vào bài.
- Tuần 4 hiện chờ đề.
- Vào một tuần rồi dùng nút back để trở về.

## Tuần 1

- Chọn đủ 8 bài, kiểm tra nội dung thay đổi.
- Counter: tăng 2 lần, giảm 1 lần, reset về 0.
- Todo: chuỗi trắng không thêm được; thêm việc, đánh dấu hoàn tất, xóa.
- Custom Button: nút disabled không đổi thông báo.
- Live Input: nhập tên rồi xóa, lời chào trở về trạng thái ban đầu.
- Loading Wrapper: chờ tải, nhấn tải lại, chuyển bài khi đang tải để kiểm tra cleanup.
- Gender: chọn lần lượt, chỉ một lựa chọn ở trạng thái active.
- App Button: nhấn lưu, trong lúc loading không nhấn được lần nữa; thử công tắc disabled.

## Tuần 2–3

- Tuần 2 hiển thị 6 sách và giá VND.
- Tuần 3 tìm `React`, tìm tên tác giả, kết hợp với thể loại.
- Nhập từ khóa không tồn tại: hiện trạng thái trống.
- Xóa tìm kiếm, chọn tất cả, chuyển qua lại lưới và danh sách; thử màn hình hẹp.

## Tuần 5

- Chọn đủ 4 màu, xác nhận, kiểm tra tên màu và hình điện thoại đổi.
- Vào chọn màu rồi back mà chưa xác nhận: giữ màu cũ.
- Mở trực tiếp `/week5?color=invalid`: dùng màu mặc định.

## Tuần 6

- Tải đầu có indicator, sau đó có phim và dòng nguồn dữ liệu.
- Chuyển lưới/list, kéo tải lại hoặc dùng nút tải lại trên web.
- Chạm phim: modal hiển thị thông tin; đóng modal hoạt động.
- Cấu hình API sai: hiện lỗi và có thể thử lại; kiểm tra API trả mảng rỗng.

## Tuần 7

- Chào → catalog, lọc Road/Mountain, vào chi tiết.
- Thêm cùng xe hai lần: một dòng, số lượng 2, tổng tiền đúng.
- Tăng/giảm/xóa, giảm về 0: dòng được bỏ khỏi giỏ.
- Back về catalogue: số lượng trong giỏ được giữ.
- Mở `/week7/khong-ton-tai`: có thông báo không tìm thấy.

## Tuần 8

- Kiểm tra section theo Đà Lạt, Đà Nẵng, Hội An và hàng yêu thích ngang.
- Tìm tour: section cập nhật, hàng yêu thích vẫn giữ toàn bộ tour yêu thích.
- Tắt mô phỏng lỗi, đổi yêu thích: trạng thái giữ khi tải lại trong chế độ mẫu.
- Bật mô phỏng lỗi, đổi yêu thích: sau khoảng 350 ms trạng thái trở về cũ và báo lỗi.
- Thử đổi nhanh hai tour khác nhau; kiểm tra cập nhật một tour không ghi đè trạng thái tour còn lại.
- Khi có API riêng, xác nhận PUT và dữ liệu giữ sau khi khởi động lại app.

## Tuần 9

- Thêm sách ở tab Sách, mở chi tiết một sách, thêm vào giỏ.
- Kiểm tra badge, số lượng, tổng tiền, xóa một dòng và xóa tất cả.
- Tăng Counter, đổi tab rồi quay lại: giá trị được giữ.
- Tài khoản: email sai phải báo lỗi; nhập tên/email giả đúng định dạng, đăng nhập rồi đăng xuất.
- Đặt hàng: biểu mẫu thiếu/sai phải báo lỗi; nhập dữ liệu mẫu đúng để xem xác nhận và giỏ được xóa.
- Tải lại app: state phiên được đặt lại theo thiết kế.

## Tuần 10

- Bài 1: nhập tiêu đề và nội dung rồi thêm bài; kết quả mới nằm đầu danh sách.
- Trong lúc gửi, nút lưu bị khóa. API lỗi thì báo lỗi và giữ form để thử lại.
- Bài 2: tải 10 bài, chọn một bài có sẵn để sửa, hủy sửa rồi sửa thành công.
- Xóa một bài có sẵn: chỉ dòng đó hiển thị “Đang xóa...”; thất bại thì dòng vẫn còn và nút được mở khóa.
- Các thao tác POST/PUT/DELETE giữ nguyên cách gọi API của code hai bài đã cung cấp.
- Chuyển qua lại hai bài: mỗi bài dùng store riêng.
