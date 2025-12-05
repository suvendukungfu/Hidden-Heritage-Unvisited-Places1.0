import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
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

  const scrollToExplore = () => {
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const treadmillImages = [
    'https://images.unsplash.com/photo-1681054559674-7e80aad3d2ff?w=400',
    'https://images.unsplash.com/photo-1663997943673-9c679560f5a5?w=400',
    'https://images.unsplash.com/photo-1606498438291-8d420fdae11c?w=400',
    'https://images.unsplash.com/photo-1583043550616-ac6e0a1b9574?w=400',
    'https://images.unsplash.com/photo-1715790357004-81af9a3b1967?w=400',
    'https://images.unsplash.com/photo-1681054559674-7e80aad3d2ff?w=400',
    'https://images.unsplash.com/photo-1663997943673-9c679560f5a5?w=400',
    'https://images.unsplash.com/photo-1606498438291-8d420fdae11c?w=400',
  ];

  return (
    <div data-testid="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <img
          src="https://images.unsplash.com/photo-1583043550616-ac6e0a1b9574?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Chambal Heritage"
          className="hero-background"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title" data-testid="hero-title">Explore India's Hidden Heritage</h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Uncover ancient temples, mysterious ravines, and timeless rock art in the heart of Chambal. 
            Journey beyond the guidebooks.
          </p>
          <button className="hero-cta" onClick={scrollToExplore} data-testid="hero-cta">
            Start Your Journey
          </button>
        </div>
        
        {/* Photo Treadmill */}
        <div className="photo-treadmill" data-testid="photo-treadmill">
          <div className="treadmill-track">
            {treadmillImages.map((img, index) => (
              <img key={index} src={img} alt="Heritage" className="treadmill-image" />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="section" id="explore-section" data-testid="explore-section">
        <h2 className="section-title">Discover Regions</h2>
        <p className="section-subtitle">Begin your journey through India's forgotten heritage sites</p>
        
        <div className="cards-grid">
          {regions.map((region) => (
            <div className="card" key={region.id} data-testid={`region-card-${region.slug}`}>
              <img src={region.banner_image} alt={region.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{region.name}</h3>
                <p className="card-description">{region.short_description}</p>
                <Link to={`/region/${region.slug}`} className="card-button" data-testid={`region-details-btn-${region.slug}`}>
                  Details..
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

export default Home;
