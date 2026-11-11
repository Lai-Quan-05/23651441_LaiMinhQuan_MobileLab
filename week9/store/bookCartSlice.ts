import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookCartItem {
  bookId: string;
  name: string;
  price: number;
  quantity: number;
}

interface BookCartState {
  items: BookCartItem[];
}

const initialState: BookCartState = {
  items: [
    { bookId: 'b1', name: 'Đắc Nhân Tâm', price: 100000, quantity: 1 },
    { bookId: 'b2', name: 'Nhà Giả Kim', price: 85000, quantity: 2 },
  ],
};

export const bookCartSlice = createSlice({
  name: 'bookCart',
  initialState,
  reducers: {
    addBookToCart: (state, action: PayloadAction<Omit<BookCartItem, 'quantity'>>) => {
      const item = state.items.find(i => i.bookId === action.payload.bookId);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeBookFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.bookId !== action.payload);
    },
    updateBookQuantity: (state, action: PayloadAction<{ bookId: string; quantity: number }>) => {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.bookId !== bookId);
      } else {
        const item = state.items.find(i => i.bookId === bookId);
        if (item) item.quantity = quantity;
      }
    },
    clearBookCart: (state) => {
      state.items = [];
    },
  },
});

export const { addBookToCart, removeBookFromCart, updateBookQuantity, clearBookCart } = bookCartSlice.actions;
export default bookCartSlice.reducer;