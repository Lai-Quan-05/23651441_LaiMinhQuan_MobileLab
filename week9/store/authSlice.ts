import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginFake: (state) => {
      state.isLoggedIn = true;
      state.user = { id: 'u1', name: 'Lại Minh Quân', email: '23651441@example.com' };
      state.token = 'fake-token-123456';
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginFake, logout } = authSlice.actions;
export default authSlice.reducer;