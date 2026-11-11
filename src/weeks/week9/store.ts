import { configureStore, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { books, type Book } from '../../data/catalog';

type CartLine = { bookId: string; quantity: number };
export type CartState = { lines: CartLine[] };
export const cartSlice = createSlice({
  name: 'cart',
  initialState: { lines: [] } as CartState,
  reducers: {
    addBook(state, action: PayloadAction<string>) {
      if (!books.some((book) => book.id === action.payload)) return;
      const line = state.lines.find((item) => item.bookId === action.payload);
      if (line) line.quantity = Math.min(99, line.quantity + 1);
      else state.lines.push({ bookId: action.payload, quantity: 1 });
    },
    changeQuantity(state, action: PayloadAction<{ bookId: string; quantity: number }>) {
      if (!Number.isFinite(action.payload.quantity)) return;
      const line = state.lines.find((item) => item.bookId === action.payload.bookId);
      if (!line) return;
      const quantity = Math.max(0, Math.min(99, Math.floor(action.payload.quantity)));
      if (!quantity)
        state.lines = state.lines.filter((item) => item.bookId !== action.payload.bookId);
      else line.quantity = quantity;
    },
    removeBook(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((item) => item.bookId !== action.payload);
    },
    clearCart(state) {
      state.lines = [];
    },
  },
});
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    resetCounter(state) {
      state.value = 0;
    },
  },
});
type User = { name: string; email: string };
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null as User | null },
  reducers: {
    signIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
    },
  },
});
export const { addBook, changeQuantity, removeBook, clearCart } = cartSlice.actions;
export const { increment, decrement, resetCounter } = counterSlice.actions;
export const { signIn, signOut } = authSlice.actions;
export const createLabStore = () =>
  configureStore({
    reducer: { cart: cartSlice.reducer, counter: counterSlice.reducer, auth: authSlice.reducer },
  });
export const store = createLabStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectCart = createSelector([(state: RootState) => state.cart.lines], (lines) =>
  lines.flatMap((line) => {
    const book = books.find((book) => book.id === line.bookId);
    return book ? [{ book: book as Book, quantity: line.quantity }] : [];
  }),
);
export const selectCartCount = createSelector([selectCart], (lines) =>
  lines.reduce((total, line) => total + line.quantity, 0),
);
export const selectCartTotal = createSelector([selectCart], (lines) =>
  lines.reduce((total, line) => total + line.book.price * line.quantity, 0),
);
