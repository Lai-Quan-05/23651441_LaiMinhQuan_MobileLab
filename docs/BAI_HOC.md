# Kiến thức cần nắm khi trình bày bài

## Tuần 1 — component, props, state và effect

Mở [Basics.tsx](../week1/Basics.tsx).

1. `UserCard` nhận `name`, `age`, `isAdmin` qua props. `isAdmin && ...` chỉ hiện phần quản trị khi điều kiện đúng.
2. Counter dùng `useState`. `setCount(n => n + 1)` lấy giá trị trước đó, hữu ích khi nhiều lần cập nhật được gom lại.
3. Todo dùng mảng đối tượng. `map` đổi một phần tử, `filter` xóa phần tử, spread thêm phần tử. Không sửa trực tiếp mảng state.
4. `Button` dùng chung nhận `title`, `onPress`, `disabled`, định nghĩa trong [ui.tsx](../src/components/ui.tsx).
5. Live Input là controlled input: `value` đọc state, `onChangeText` ghi state.
6. `LoadingWrapper` nhận `children`. Khi loading thì hiện indicator, hết loading thì hiện nội dung con. Timer trong effect được dọn bằng `clearTimeout`.
7. Gender Selector lưu một giá trị, so sánh từng lựa chọn để hiển thị trạng thái đang chọn.
8. App Button khóa tương tác trong lúc giả lập lưu. Loading và disabled là hai trạng thái riêng.

Tự giải thích: Vì sao cần `key` cho danh sách? Vì sao cleanup timer? Vì sao không dùng `todos.push(...)` rồi giữ nguyên tham chiếu state?

## Tuần 2 — chia component và bố cục

Mở [Bookstore.tsx](../src/components/books/Bookstore.tsx).

`BookCover` nhận một cuốn sách. `BookCard` kết hợp bìa với tên, tác giả, thể loại và giá. Cùng một component render nhiều cuốn nhờ props. `flexDirection: 'row'` xếp bìa và thông tin ngang; `flex: 1` cho phần thông tin chiếm khoảng trống còn lại.

Tự sửa: Thêm một sách trong [catalog.ts](../src/data/catalog.ts), kiểm tra danh sách cập nhật mà không thêm JSX riêng.

## Tuần 3 — lọc dữ liệu và danh sách nhiều cột

`filtered` được tính từ `query`, `category` và catalogue. `useMemo` tránh tính lại khi các đầu vào không đổi. Việc tìm kiếm chỉ thay danh sách hiển thị, không sửa dữ liệu gốc.

`FlatList` dùng `id` làm key. Khi đổi `numColumns`, key của cả FlatList cũng đổi để React tạo lại danh sách theo cấu trúc cột mới.

Tự giải thích: Khác nhau giữa `key` của FlatList và `keyExtractor` của từng sách là gì?

## Tuần 5 — navigation và params

Mở [chi tiết điện thoại](../src/app/week5/index.tsx) và [chọn màu](../src/app/week5/colors.tsx).

Chi tiết đọc `color` bằng `useLocalSearchParams`. Khi mở bảng màu, truyền `selected`. Sau xác nhận, `router.dismissTo` trở về màn hình chi tiết với `color` mới. `findColor` cung cấp màu mặc định nếu URL có giá trị không hợp lệ.

Tự thử: Mở `/week5?color=red`, sau đó `/week5?color=invalid` trên web. Trình bày vì sao cần kiểm tra params.

## Tuần 6 — bất đồng bộ và trạng thái tải

Mở [Movies.tsx](../week6/Movies.tsx) và [api.ts](../src/data/api.ts).

Khởi tạo gọi dữ liệu trong effect; callback chỉ cập nhật state khi màn hình còn hoạt động. Người dùng tải lại qua nút hoặc kéo danh sách. `loading` dùng cho tải đầu, `refreshing` dùng cho tải lại. Lỗi được giữ riêng với dữ liệu, nên tải lại thất bại vẫn xem được kết quả cũ.

`requestJson` kiểm tra `response.ok`, hủy kết nối sau 12 giây và đọc JSON. HTTP 204 được chấp nhận cho thao tác cập nhật. `AbortSignal` hủy request khi rời màn hình phim. `parseMovies` kiểm tra dữ liệu trước khi dùng trong UI. Chế độ mẫu đi qua nhánh bất đồng bộ với độ trễ, chế độ HTTP gọi `fetch`.

Tự giải thích: Vì sao HTTP 404 không tự làm `fetch` reject? Vì sao cần kiểm tra schema dù đã khai báo kiểu TypeScript?

## Tuần 7 — nhiều màn hình và state dùng chung

Luồng: Welcome → Catalog → Detail → Cart. Route động `[id]` nhận mã xe từ danh mục. Nếu id sai, hiện màn hình không tìm thấy.

[BikeCartProvider](../week7/cart.tsx) dùng Context để chia sẻ state cho các màn hình. [Reducer](../week7/cartReducer.ts) quản lý add/change/clear; thêm lại một xe sẽ tăng số lượng. Tổng tiền được suy ra từ catalogue và số lượng.

Tự giải thích: Nếu đặt state giỏ hàng trong mỗi trang, chuyện gì xảy ra khi chuyển từ catalog sang cart?

## Tuần 8 — SectionList và optimistic update

`useMemo` lọc tour theo tên, sau đó `groupTours` tạo các section `{title, data}` theo thành phố. Danh sách yêu thích ngang nằm trong header, không bị bộ lọc tên làm mất các tour đã thích.

Khi yêu thích, UI cập nhật trước khi API trả lời. Trong lúc chờ, khóa thao tác lặp trên cùng tour. Nếu lỗi, khôi phục giá trị cũ **chỉ cho id thất bại**, tránh ghi đè cập nhật thành công của tour khác. Công tắc mô phỏng lỗi giúp quan sát quá trình này.

Khi dùng [Mockaroo](MOCKAROO.md), API key ở server trung gian. Mockaroo trả xác nhận giả lập, server giữ thay đổi yêu thích trong bộ nhớ cho đến khi server khởi động lại.

Tự giải thích: Vì sao khôi phục toàn bộ mảng tour cũ có thể làm mất thay đổi của người dùng?

## Tuần 9 — Redux Toolkit

Mở [store.ts](../week9/store.ts).

- Store có ba nhánh: `cart`, `counter`, `auth`.
- `createSlice` tạo reducer và action creators. Cú pháp sửa state trong slice được Immer xử lý để tạo cập nhật bất biến.
- `dispatch(addBook(id))` gửi action.
- `useAppSelector` đăng ký đọc một phần state. Badge giỏ hàng thay đổi cùng state mà không truyền props qua nhiều tầng.
- `createSelector` suy ra danh sách giỏ, tổng số cuốn và tổng tiền; không lưu các tổng trùng lặp trong store.
- `useAppDispatch` và `useAppSelector` có kiểu TypeScript suy ra từ store.
- Đăng nhập và đặt hàng là mô phỏng. Xác nhận đơn ghi kết quả trên màn hình rồi xóa giỏ.

Tự thử: Thêm cùng sách hai lần, đổi tab, tăng counter, quay về giỏ. Giải thích state nào cục bộ và state nào nằm trong Redux.

## Tuần 10 — createAsyncThunk và CRUD

Mở [bài thêm bài viết](../week10/create_async_thunk/App.tsx) và [bài CRUD](../week10/crud_createasyncthunk_run/App.tsx).

`createAsyncThunk` tạo ba action theo vòng đời bất đồng bộ: `pending` khi bắt đầu, `fulfilled` khi thành công, `rejected` khi thất bại. `extraReducers` cập nhật loading, dữ liệu và thông báo lỗi tương ứng.

Ở bài 1, `rejectWithValue(message)` đưa lỗi vào `action.payload`. Component dùng `.unwrap()` để chỉ xóa form sau khi thêm thành công.

Bài 1 chỉ POST và thêm kết quả vào đầu mảng bằng `unshift`. Bài 2 có GET/POST/PUT/DELETE, form thêm hoặc sửa và `deletingId` xác định id đang xóa. Mỗi file App.tsx có store và Provider riêng như code đã cung cấp.

Hai file App.tsx được giữ nguyên nội dung code từ hai bài đã cung cấp. Phần chọn bài chỉ dùng để mở chúng trong ứng dụng chung.

Tự giải thích: Vai trò của pending, fulfilled và rejected là gì? `.unwrap()` dùng để làm gì? `deletingId` được cập nhật khi nào?
