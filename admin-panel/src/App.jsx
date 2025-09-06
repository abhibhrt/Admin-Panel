import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/notfound/NotFound';
import { useSelector } from 'react-redux';
import CheckAuth from './utils/checkAuth';
import Dashboard from './pages/dashboard/Dashboard';
import { useEffect } from 'react';

function App() {
  const authorised = useSelector((state) => state.personal.data !== null);
  useEffect(() => {
    async function wakeServer() {
      try {
        const wake = await fetch(import.meta.env.VITE_API_URL);
        if (wake.ok) {
          console.log("Server Ready");
        }
      } catch (err) {
        console.log(err)
      }
    }
    wakeServer();
  }, []);

  return (
    <Router>
      <CheckAuth />
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
