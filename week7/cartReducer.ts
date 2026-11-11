export type BikeCart = Record<string, number>;
export type BikeCartAction =
  | { type: 'add'; id: string }
  | { type: 'change'; id: string; quantity: number }
  | { type: 'clear' };
export function bikeCartReducer(state: BikeCart, action: BikeCartAction): BikeCart {
  if (action.type === 'clear') return {};
  if (action.type === 'add')
    return { ...state, [action.id]: Math.min((state[action.id] ?? 0) + 1, 99) };
  if (!Number.isFinite(action.quantity)) return state;
  const quantity = Math.max(0, Math.min(99, Math.floor(action.quantity)));
  const next = { ...state };
  if (!quantity) delete next[action.id];
  else next[action.id] = quantity;
  return next;
}
