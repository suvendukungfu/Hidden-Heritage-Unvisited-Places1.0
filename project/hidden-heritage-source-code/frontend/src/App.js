import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import RegionDetail from '@/pages/RegionDetail';
import SiteDetail from '@/pages/SiteDetail';
import TripBuilder from '@/pages/TripBuilder';
import About from '@/pages/About';
import FeedbackPage from '@/pages/FeedbackPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/region/:slug" element={<RegionDetail />} />
          <Route path="/site/:slug" element={<SiteDetail />} />
          <Route path="/trip-builder" element={<TripBuilder />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
