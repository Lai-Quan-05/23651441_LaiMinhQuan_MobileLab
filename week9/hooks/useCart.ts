import {
    BookCartItem,
    addBookToCart,
    clearBookCart,
    removeBookFromCart,
    updateBookQuantity,
} from '../store/bookCartSlice';
import { useAppDispatch, useAppSelector } from '../store/index';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.bookCart.items);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cartItems: items,
    totalQuantity,
    totalPrice,
    addBook: (book: Omit<BookCartItem, 'quantity'>) => dispatch(addBookToCart(book)),
    removeBook: (bookId: string) => dispatch(removeBookFromCart(bookId)),
    changeQuantity: (bookId: string, quantity: number) =>
      dispatch(updateBookQuantity({ bookId, quantity })),
    clearAll: () => dispatch(clearBookCart()),
  };
};