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
- `title`, `genre`: chuỗi.
- `year`: số nguyên.
- `rating`: số hữu hạn từ 0 đến 10.

## Tours — tuần 8

Endpoint trong `EXPO_PUBLIC_TOURS_API_URL` hỗ trợ:

- `GET /tours` → mảng tour.
- `PUT /tours/:id`, body `{"isFavorite": true}` → JSON của bản ghi đã cập nhật. API cần giữ các trường còn lại khi cập nhật yêu thích.

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
- `departure`: chuỗi ngày hợp lệ; khuyến nghị `YYYY-MM-DD`.
- `isFavorite`: boolean, không dùng chuỗi `"true"`.
- `id`: duy nhất; `name`, `city`: chuỗi.

## Thiết lập bằng MockAPI

1. Tạo project trên tài khoản của bạn.
2. Tạo resource `movies` và `tours` có các trường đúng schema trên.
3. Nhập dữ liệu JSON minh họa, kiểm tra URL GET trả về mảng.
4. Điền hai URL resource vào `.env` theo `.env.example`.
5. Khởi động lại Expo, vào tuần 6/8. Dòng nguồn dữ liệu phải hiển thị API riêng.
6. Bấm yêu thích tour, tải lại rồi kiểm tra trạng thái còn được lưu ở máy chủ.

Khi chạy web, API cần cho phép CORS cho GET và PUT với `Content-Type: application/json`. Các biến `EXPO_PUBLIC_*` chỉ dành cho thông tin công khai.

## Xử lý lỗi

- HTTP không thành công, JSON sai schema, id trùng hoặc kết nối quá 12 giây đều được báo trên màn hình.
- Tải lại thất bại giữ dữ liệu đã tải trước đó, kèm thông báo lỗi.
- Khi bấm yêu thích, UI đổi ngay; nút của tour đó tạm khóa. Nếu PUT lỗi, chỉ tour đó được khôi phục.
- Không tải lại danh sách trong lúc đang lưu yêu thích để tránh ghi đè thay đổi chưa hoàn tất.
- Công tắc “Mô phỏng lỗi cập nhật” ở tuần 8 tạo lỗi trước khi gửi PUT, dùng để kiểm tra rollback trong cả hai chế độ.
