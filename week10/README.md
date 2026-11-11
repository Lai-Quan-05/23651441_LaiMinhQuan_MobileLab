# Tuần 10 — createAsyncThunk

Tuần 10 có hai bài, chọn tại màn hình **Tuần 10** trong ứng dụng.

## Bài 1: Thêm bài viết bằng POST

Mã: [create_async_thunk](create_async_thunk).

- Form nhập tiêu đề và nội dung, gửi `POST /posts` với `userId: 1`.
- `createAsyncThunk` quản lý `pending`, `fulfilled`, `rejected`.
- `rejectWithValue` đưa thông báo lỗi vào slice.
- Khi thành công, dùng `unshift` thêm kết quả vào đầu danh sách.
- Component dùng `dispatch(addPost(...)).unwrap()` và chỉ xóa form sau khi thành công.
- Chặn nhấn gửi trùng trong lúc đang gửi.

## Bài 2: CRUD bài viết

Mã: [crud_createasyncthunk_run](crud_createasyncthunk_run).

- GET `/posts?_limit=10`: tải 10 bài và có nút thử lại khi lỗi.
- POST `/posts`: thêm bài vào đầu danh sách.
- PUT `/posts/:id`: sửa bài có sẵn từ GET.
- DELETE `/posts/:id`: xóa bài có sẵn từ GET, hiển thị “Đang xóa...” trên đúng dòng.
- Có chọn bài để sửa, hủy sửa, khóa thao tác khi đang lưu/xóa và giữ dữ liệu cũ khi API lỗi.

## API mô phỏng

Hai bài gọi `https://jsonplaceholder.typicode.com/posts`, không cần API key. JSONPlaceholder giả lập ghi dữ liệu; thay đổi không được lưu thật trên máy chủ. [Tài liệu API](https://jsonplaceholder.typicode.com/).

POST có thể trả cùng id `101` cho nhiều bài. `PostItem.key` dùng `requestId` để phân biệt chúng trong phiên. Những bài mới này được sửa/xóa tại máy, vì chúng chưa tồn tại trên API. Bài từ GET vẫn thực hiện PUT/DELETE qua HTTP.

Nút **Tải lại dữ liệu gốc** lấy lại danh sách API và đặt lại thay đổi ở bài CRUD. Hai bài có state riêng trong [store.ts](store.ts), giữ state khi đổi bài trong phiên ứng dụng.
