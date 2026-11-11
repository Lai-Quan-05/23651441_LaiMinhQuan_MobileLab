export const phoneColors = [
  { id: 'blue', label: 'Xanh', hex: '#83accc' },
  { id: 'silver', label: 'Bạc', hex: '#b7c4cd' },
  { id: 'red', label: 'Đỏ', hex: '#bb4d59' },
  { id: 'black', label: 'Đen', hex: '#293642' },
] as const;
export const findColor = (id: unknown) =>
  phoneColors.find((color) => color.id === id) ?? phoneColors[0];
