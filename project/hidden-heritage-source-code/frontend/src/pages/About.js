import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div data-testid="about-page">
      <Navbar />
      
      <div className="page-banner" data-testid="about-banner">
        <img
          src="https://images.unsplash.com/photo-1681054559674-7e80aad3d2ff?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="About Us"
          className="banner-image"
        />
        <div className="banner-overlay"></div>
        <h1 className="banner-title" data-testid="about-title">About Hidden Heritage</h1>
      </div>

      <section className="section">
        <div className="about-content" data-testid="about-content">
          <h3>Our Mission</h3>
          <p>
            Hidden Heritage is dedicated to revealing India's forgotten archaeological treasures and bringing them back into the spotlight. 
            We believe that every stone, every carving, and every ancient site has a story to tell—stories that have been overlooked 
            for far too long.
          </p>

          <h3>Why Hidden Heritage Exists</h3>
          <p>
            India is home to thousands of heritage sites, yet only a handful receive the attention they deserve. Magnificent temples, 
            ancient rock art, and mysterious forts lie hidden in remote corners, waiting to be rediscovered. Our platform bridges the gap 
            between these forgotten treasures and curious travelers who seek authentic, off-the-beaten-path experiences.
          </p>

          <h3>Our Vision</h3>
          <p>
            We envision a future where every heritage site, no matter how remote, is accessible, documented, and celebrated. Through 
            technology and community engagement, we're creating a movement to preserve and promote India's rich cultural legacy. Our goal 
            is to expand beyond Chambal to cover hidden heritage sites across the entire country.
          </p>

          <h3>Community & Local Involvement</h3>
          <p>
            Hidden Heritage works closely with local communities, archaeologists, and heritage conservationists. We employ local guides 
            who are deeply connected to their heritage and passionate about sharing their knowledge. A portion of all trip bookings goes 
            directly to conservation efforts and community development in the regions we serve.
          </p>

          <h3>About the Team</h3>
          <p>
            Our team consists of archaeologists, historians, travel enthusiasts, and technology experts united by a common passion: 
            preserving India's heritage. We've spent years researching, documenting, and exploring these sites to bring you the most 
            authentic and enriching travel experiences.
          </p>

          <p style={{ marginTop: '3rem', fontStyle: 'italic', textAlign: 'center', fontSize: '1.2rem', color: 'var(--deep-brown)' }}>
            "The past is not dead. It's not even past." - William Faulkner
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
