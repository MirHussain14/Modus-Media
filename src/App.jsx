// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BundleWithout from "./pages/BundleWith";
import OneWithout from "./pages/OneWithout";
import TwoVIP from "./pages/TwoVIP";
import TwoWith from "./pages/TwoWith";
import TwoWithout from "./pages/TwoWithout";
import Vbdeo from "./pages/Vbdeo";
import Video from "./pages/Video";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route - empty/no component */}
        <Route path="/" element={<div></div>} />
        
        {/* Page routes */}
        <Route path="/twowith" element={<TwoWith />} />
        <Route path="/onewithout" element={<OneWithout />} />
        <Route path="/twowithout" element={<TwoWithout />} />
        <Route path="/video" element={<Video />} />
        <Route path="/twovip" element={<TwoVIP />} />
        <Route path="/vbdeo" element={<Vbdeo />} />
        <Route path="/bundlewithout" element={<BundleWithout />} />
      </Routes>
    </Router>
  );
};

export default App;