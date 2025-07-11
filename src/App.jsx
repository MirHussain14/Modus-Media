// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BundleWithout from "./pages/BundleWithout";
import OneWithout from "./pages/OneWithout";
import TwoVIP from "./pages/TwoVIP";
import TwoWith from "./pages/TwoWith";
import TwoWithout from "./pages/TwoWithout";
import Vbdeo from "./pages/Vbdeo";
import Video from "./pages/Video";
import BundleWith from './pages/BundleWith';
import OneWith from './pages/OneWith';
import BundleWithPDF from './pdf/pages/BundleWithPDF';
import BundleWithoutPDF from './pdf/pages/BundleWithoutPDF';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route - empty/no component */}
        <Route path="/" element={<div></div>} />
        
        {/* Page routes */}
        <Route path="/twowith" element={<TwoWith />} />
        <Route path="/onewithout" element={<OneWithout />} />
        <Route path="/onewith" element={<OneWith />} />
        <Route path="/twowithout" element={<TwoWithout />} />
        <Route path="/video" element={<Video />} />
        <Route path="/twovip" element={<TwoVIP />} />
        <Route path="/vbdeo" element={<Vbdeo />} />
        <Route path="/bundlewithout" element={<BundleWithout />} />
        <Route path="/bundlewith" element={<BundleWith />} />
      </Routes>
    </Router>
  );
};

export default App;