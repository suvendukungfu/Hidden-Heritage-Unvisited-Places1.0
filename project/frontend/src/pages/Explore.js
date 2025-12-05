import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Explore = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axios.get(`${API}/regions`);
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  return (
    <div data-testid="explore-page">
      <Navbar />
      
      <div className="page-banner" data-testid="explore-banner">
        <img
          src="https://images.unsplash.com/photo-1583043550616-ac6e0a1b9574?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Explore Heritage"
          className="banner-image"
        />
        <div className="banner-overlay"></div>
        <h1 className="banner-title" data-testid="explore-title">Explore Heritage Regions</h1>
      </div>

      <section className="section">
        <h2 className="section-title">Available Regions</h2>
        <p className="section-subtitle">Select a region to discover hidden heritage sites</p>
        
        <div className="cards-grid">
          {regions.map((region) => (
            <div className="card" key={region.id} data-testid={`explore-region-card-${region.slug}`}>
              <img src={region.banner_image} alt={region.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{region.name}</h3>
                <p className="card-description">{region.short_description}</p>
                <Link to={`/region/${region.slug}`} className="card-button" data-testid={`explore-region-btn-${region.slug}`}>
                  Explore Region
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

export default Explore;
