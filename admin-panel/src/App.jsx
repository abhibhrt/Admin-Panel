import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import { useSelector } from 'react-redux';
import CheckAuth from './utils/checkAuth';
import Dashboard from './pages/dashboard/Dashboard';
import { useEffect, useState } from 'react';
import Loader from './components/loading/Loading';

function App() {
  const authorised = useSelector((state) => state.personal.data !== null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function wakeServer() {
      setLoading(true);
      try {
        const wake = await fetch(import.meta.env.VITE_API_URL);
        if (wake.ok) {
          console.log("Server Is Ready Now");
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
    wakeServer();
  }, []);

  return (
    <Router>
      <CheckAuth />
      {
        loading && <Loader/>
      }
      <Routes>
        <Route path="/" element={<Home />} />
        {!authorised ? (
          <>
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
