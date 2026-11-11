import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react';
import { bikeCartReducer, type BikeCart, type BikeCartAction } from './cartReducer';
const Context = createContext<{ items: BikeCart; dispatch: Dispatch<BikeCartAction> } | null>(null);
export function BikeCartProvider({ children }: PropsWithChildren) {
  const [items, dispatch] = useReducer(bikeCartReducer, {});
  return <Context.Provider value={{ items, dispatch }}>{children}</Context.Provider>;
}
export function useBikeCart() {
  const cart = useContext(Context);
  if (!cart) throw new Error('Cần BikeCartProvider');
  return cart;
}
