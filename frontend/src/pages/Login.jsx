import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(state => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button disabled={loading}>Login</button>
      </form>

      {error && <p className="error">{error}</p>}
            <p className="auth-link">
        Don’t have an account?{' '}
        <Link to="/signup">Sign up</Link>
      </p>

    </div>
  );
}
