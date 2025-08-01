import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user'; // Ensure you have this
import { getUserFromStorage } from '../services/localStorageService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getUserFromStorage(),  // <-- load user from storage
  loading: false,
  error: null,
};

// Async thunk for password reset (example)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string, thunkAPI) => {
    try {
      // Replace this with real API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ message: 'Reset email sent to ' + email }), 1000)
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to reset password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
    },
    setUserFromStorage: (state) => {
      state.user = getUserFromStorage();  // <-- sync Redux with localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loginSuccess, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;