import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SiteDetail = () => {
  const { slug } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteData();
  }, [slug]);

  const fetchSiteData = async () => {
    try {
      const response = await axios.get(`${API}/sites/${slug}`);
      setSite(response.data);
    } catch (error) {
      console.error('Error fetching site data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div data-testid="loading-site">
        <Navbar />
        <div className="section">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div data-testid="site-not-found">
        <Navbar />
        <div className="section">
          <h2>Site not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="site-detail" data-testid="site-detail-page">
      <Navbar />
      
      <div className="page-banner" data-testid="site-banner">
        <img src={site.image} alt={site.name} className="banner-image" />
        <div className="banner-overlay"></div>
        <h1 className="banner-title" data-testid="site-name">{site.name}</h1>
      </div>

      <section className="section">
        <span className="site-type-badge" data-testid="site-type-badge">{site.type}</span>
        
        <div className="site-metadata">
          <div className="metadata-item" data-testid="entry-fee-display">
            <div className="metadata-label">Entry Fee</div>
            <div className="metadata-value">₹{site.entry_fee}</div>
          </div>
          <div className="metadata-item" data-testid="visit-time-display">
            <div className="metadata-label">Avg. Visit Time</div>
            <div className="metadata-value">{site.avg_visit_time_mins} mins</div>
          </div>
          <div className="metadata-item" data-testid="location-display">
            <div className="metadata-label">Location</div>
            <div className="metadata-value">{site.latitude.toFixed(4)}°N, {site.longitude.toFixed(4)}°E</div>
          </div>
        </div>

        <div className="about-content">
          <h3>About {site.name}</h3>
          <p data-testid="site-full-description">{site.full_description}</p>
        </div>

        <div className="site-images">
          <img src={site.image} alt={site.name} className="site-image" data-testid="site-detail-image" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SiteDetail;
