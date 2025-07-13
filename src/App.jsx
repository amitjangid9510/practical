
import { Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Products from './pages/Products';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './utils/ScrollToTop';


function App() {
  return (
    <>
     <ScrollToTop />
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/Home" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;