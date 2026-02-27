import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Academics from './pages/Academics';
import Publications from './pages/Publications';
import Students from './pages/Students';
import Projects from './pages/Projects';
import Download from './pages/Download';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter basename="/trivedi">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="academics" element={<Academics />} />
            <Route path="publications" element={<Publications />} />
            <Route path="students" element={<Students />} />
            <Route path="projects" element={<Projects />} />
            <Route path="download" element={<Download />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
