import BookingForm from '../components/BookingForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

 const logout = () => {
  localStorage.clear();
  navigate('/login', { replace: true });
};


  return (
    <div className="dashboard">
      <h2>Welcome, {user?.firstName} 👋</h2>
      <button onClick={logout}>Logout</button>
      <BookingForm />
    </div>
  );
}
