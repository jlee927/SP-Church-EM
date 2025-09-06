import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Connect from './pages/Connect';
import Event from './pages/Event';
import Gallery from './pages/Gallery';
import AlbumView from "./pages/AlbumView.jsx";
import Footer from './components/Footer';
import About from './pages/About';
import './index.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor (e.g., /about#team), honor it.
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" }); // or "smooth"
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }); // or "smooth"
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <>
      <AppNavbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/events" element={<Event />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:albumSlug" element={<AlbumView />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
      <Footer />
    </Router>
  );
}

export default App;

