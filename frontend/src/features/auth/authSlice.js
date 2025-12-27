import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const tokenFromStorage = localStorage.getItem('token');

export const signup = createAsyncThunk(
    'auth/signup',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/signup', data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/login', data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null,
        error: null,
        signupSuccess: false

    },
    reducers: {
        loadUserFromStorage: state => {
            const user = localStorage.getItem('user');
            if (user) {
                state.user = JSON.parse(user);
            }
        },

        logout: state => {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signup.pending, state => {
                state.loading = true;
                state.error = null;
                state.signupSuccess = false;
            })
            .addCase(signup.fulfilled, state => {
                state.loading = false;
                state.signupSuccess = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export const { loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
