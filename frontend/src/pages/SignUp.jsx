import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, signupSuccess } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (signupSuccess) {
      navigate('/login');
    }
  }, [signupSuccess, navigate]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(form));
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button disabled={loading}>Signup</button>
      </form>

      {error && <p className="error">{error}</p>}
      {signupSuccess && <p className="success">Signup successful! Verify email.</p>}
    </div>
  );
}
