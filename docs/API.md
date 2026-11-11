# API phim và tour

Không cấu hình `.env`: ứng dụng dùng dữ liệu mẫu từ [api.ts](../src/data/api.ts), độ trễ mô phỏng 350 ms. Chế độ này không gửi HTTP. Cấu hình `.env`: chuyển sang gọi API thật của bạn.

## Movies — tuần 6

Endpoint trong `EXPO_PUBLIC_MOVIES_API_URL` phải hỗ trợ `GET`, trả về **mảng trực tiếp**:

```json
[
  { "id": "1", "title": "Hành trình bình minh", "year": 2025, "genre": "Phiêu lưu", "rating": 8.1 },
  { "id": "2", "title": "Góc phố mùa hạ", "year": 2024, "genre": "Tình cảm", "rating": 7.8 }
]
```

- `id`: chuỗi không rỗng hoặc số; sau chuẩn hóa phải duy nhất.
- `title`, `genre`: chuỗi không rỗng.
- `year`: số nguyên từ 1 đến 9999.
- `rating`: số hữu hạn từ 0 đến 10.

## Tours — tuần 8

Endpoint trong `EXPO_PUBLIC_TOURS_API_URL` hỗ trợ:

- `GET /tours` → mảng tour.
- `PUT /tours/:id`, body `{"isFavorite": true}` → JSON xác nhận hoặc HTTP 204. API cần giữ các trường còn lại khi cập nhật yêu thích.
- Nếu route PUT khác GET (ví dụ `/tours/:id.json`), đặt URL có `:id` vào `EXPO_PUBLIC_TOUR_FAVORITE_API_URL`.

```json
[
  {
    "id": "1",
    "name": "Một sáng bên Hồ Xuân Hương",
    "city": "Đà Lạt",
    "price": 1890000,
    "days": 3,
    "departure": "2026-12-12",
    "isFavorite": true
  },
  {
    "id": "2",
    "name": "Biển xanh Sơn Trà",
    "city": "Đà Nẵng",
    "price": 3290000,
    "days": 4,
    "departure": "2026-12-20",
    "isFavorite": false
  }
]
```

- `price`: số hữu hạn, không âm; đơn vị VND.
- `days`: số nguyên dương.
- `departure`: ngày lịch hợp lệ, đúng định dạng `YYYY-MM-DD`.
- `isFavorite`: boolean, không dùng chuỗi `"true"`.
- `id`: duy nhất; `name`, `city`: chuỗi.

## Thiết lập bằng Mockaroo

Xem [hướng dẫn tạo ba route và chạy server trung gian](MOCKAROO.md). Các handler và dữ liệu được đặt trong thư mục [mockaroo](../mockaroo).

Mockaroo yêu cầu API key trong query hoặc header `X-API-Key`; ở đây server gửi header để khóa không nằm trong ứng dụng. [Tài liệu Mockaroo](https://www.mockaroo.com/docs).

Server trung gian cung cấp `GET /movies`, `GET /tours`, `PUT /tours/:id`. Mockaroo mô phỏng phản hồi PUT, còn server giữ phần thay đổi yêu thích trong bộ nhớ. Khởi động lại server sẽ đặt lại các thay đổi này. Dữ liệu phim và tour không thay đổi id giữa các lượt tải.

Khi chạy web, API cần cho phép CORS cho GET và PUT với `Content-Type: application/json`. Các biến `EXPO_PUBLIC_*` chỉ dành cho URL công khai. Khóa Mockaroo chỉ đặt trong `.env.server.local`, không đặt vào biến `EXPO_PUBLIC_*`.

## Xử lý lỗi

- HTTP không thành công, JSON sai schema, id trùng hoặc kết nối quá 12 giây đều được báo trên màn hình.
- Tải lại thất bại giữ dữ liệu đã tải trước đó, kèm thông báo lỗi.
- Khi bấm yêu thích, UI đổi ngay; nút của tour đó tạm khóa. Nếu PUT lỗi, chỉ tour đó được khôi phục.
- Không tải lại danh sách trong lúc đang lưu yêu thích để tránh ghi đè thay đổi chưa hoàn tất.
- Công tắc “Mô phỏng lỗi cập nhật” ở tuần 8 tạo lỗi trước khi gửi PUT, dùng để kiểm tra rollback trong cả hai chế độ.

## Bài viết — tuần 10

Tuần 10 gọi `https://jsonplaceholder.typicode.com/posts` theo hai bài thực hành createAsyncThunk: GET lấy 10 bài, POST thêm, PUT sửa và DELETE xóa. Không cần API key. Mã hai bài nằm trong [create_async_thunk](../week10/create_async_thunk/App.tsx) và [crud_createasyncthunk_run](../week10/crud_createasyncthunk_run/App.tsx).

JSONPlaceholder trả phản hồi ghi dữ liệu giả lập, không lưu thay đổi thật. Các thao tác giữ nguyên theo code hai bài đã cung cấp. [Tài liệu JSONPlaceholder](https://jsonplaceholder.typicode.com/).
