import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

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
        error: null,
        token: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(signup.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, state => {
                state.loading = false;
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
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
