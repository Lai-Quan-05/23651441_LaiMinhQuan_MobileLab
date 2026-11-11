# Bộ công cụ Mockaroo

Bộ công cụ được giữ riêng. Các App tuần 6 và 8 hiện dùng URL trong code gốc, chưa gọi server này.

## Tạo route

Mở [Mockaroo APIs](https://www.mockaroo.com/apis/new), tạo các route và dán handler tương ứng:

| Method | Route                    | Handler                                        |
| ------ | ------------------------ | ---------------------------------------------- |
| GET    | mobilelab/movies.json    | [get-movies.rb](../mockaroo/get-movies.rb)     |
| GET    | mobilelab/tours.json     | [get-tours.rb](../mockaroo/get-tours.rb)       |
| PUT    | mobilelab/tours/:id.json | [put-favorite.rb](../mockaroo/put-favorite.rb) |

Sao chép .env.server.example thành .env.server.local, điền MOCKAROO_API_KEY tại máy rồi chạy npm run api:start. Không commit khóa tài khoản.

Server có GET /movies, GET /tours và PUT /tours/:id. Yêu thích giữ trong bộ nhớ server và được đặt lại khi khởi động lại server. Các handler chưa được xác nhận đã lưu trên tài khoản Mockaroo thật.
