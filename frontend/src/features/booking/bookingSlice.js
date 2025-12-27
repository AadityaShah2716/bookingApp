import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const createBooking = createAsyncThunk(
    'booking/create',
    async (data, thunkAPI) => {
        try {
            const res = await api.post('/bookings', data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        resetBookingState: state => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createBooking.pending, state => {
                state.loading = true;
            })
            .addCase(createBooking.fulfilled, state => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
