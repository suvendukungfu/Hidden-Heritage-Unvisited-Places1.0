import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapView from '@/components/MapView';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RegionDetail = () => {
  const { slug } = useParams();
  const [region, setRegion] = useState(null);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegionData();
  }, [slug]);

  const fetchRegionData = async () => {
    try {
      const [regionRes, sitesRes] = await Promise.all([
        axios.get(`${API}/regions/${slug}`),
        axios.get(`${API}/sites`)
      ]);
      setRegion(regionRes.data);
      const regionSites = sitesRes.data.filter(site => site.region_id === regionRes.data.id);
      setSites(regionSites);
    } catch (error) {
      console.error('Error fetching region data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div data-testid="loading-region">
        <Navbar />
        <div className="section">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div data-testid="region-not-found">
        <Navbar />
        <div className="section">
          <h2>Region not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="region-detail-page">
      <Navbar />
      
      <div className="page-banner" data-testid="region-banner">
        <img src={region.banner_image} alt={region.name} className="banner-image" />
        <div className="banner-overlay"></div>
        <h1 className="banner-title" data-testid="region-name">{region.name}</h1>
      </div>

      <section className="section">
        <p className="section-subtitle" data-testid="region-description">{region.description}</p>
        
        <h2 className="section-title">Interactive Map</h2>
        <MapView sites={sites} />
        
        <h2 className="section-title" style={{ marginTop: '4rem' }}>Heritage Sites</h2>
        <div className="asymmetric-grid">
          {sites.map((site) => (
            <div className="card" key={site.id} data-testid={`site-card-${site.slug}`}>
              <img src={site.image} alt={site.name} className="card-image" />
              <div className="card-content">
                <span className="site-type-badge" data-testid={`site-type-${site.slug}`}>{site.type}</span>
                <h3 className="card-title">{site.name}</h3>
                <p className="card-description">{site.short_description}</p>
                <Link to={`/site/${site.slug}`} className="card-button" data-testid={`site-more-btn-${site.slug}`}>
                  More..
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegionDetail;
