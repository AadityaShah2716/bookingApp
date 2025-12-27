import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, resetBookingState } from '../features/booking/bookingSlice';

export default function BookingForm() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.booking);

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    bookingDate: '',
    bookingType: 'FULL',
    bookingSlot: '',
    fromTime: '',
    toTime: ''
  });

  useEffect(() => {
    if (success) {
      alert('Booking Successful');
      dispatch(resetBookingState());
    }
  }, [success, dispatch]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      bookingDate: form.bookingDate,
      bookingType: form.bookingType
    };

    if (form.bookingType === 'HALF') {
      payload.bookingSlot = form.bookingSlot;
    }

    if (form.bookingType === 'CUSTOM') {
      payload.fromTime = form.fromTime;
      payload.toTime = form.toTime;
    }

    dispatch(createBooking(payload));
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3>Create Booking</h3>

      <input name="customerName" placeholder="Customer Name" required onChange={handleChange} />
      <input name="customerEmail" type="email" placeholder="Customer Email" required onChange={handleChange} />
      <input name="bookingDate" type="date" required onChange={handleChange} />

      <select name="bookingType" onChange={handleChange}>
        <option value="FULL">Full Day</option>
        <option value="HALF">Half Day</option>
        <option value="CUSTOM">Custom</option>
      </select>

      {form.bookingType === 'HALF' && (
        <select name="bookingSlot" required onChange={handleChange}>
          <option value="">Select Slot</option>
          <option value="FIRST_HALF">First Half</option>
          <option value="SECOND_HALF">Second Half</option>
        </select>
      )}

      {form.bookingType === 'CUSTOM' && (
        <>
          <input name="fromTime" type="time" required onChange={handleChange} />
          <input name="toTime" type="time" required onChange={handleChange} />
        </>
      )}

      <button disabled={loading}>Create Booking</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
