import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Footer from './components/Footer';
import About from './pages/About';
import './index.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Gallery from './pages/Gallery';

// wrapper so we can check current path
function Layout() {
  const location = useLocation();

  // don't render navbar on Home page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {/*!hideNavbar && <AppNavbar />*/}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          {/* add more routes here */}
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <Footer />
    </Router>
  );
}

export default App;

