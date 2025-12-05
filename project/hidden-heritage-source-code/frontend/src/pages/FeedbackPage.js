import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await axios.post(`${API}/feedback`, {
        name: formData.name,
        email: formData.email,
        rating: formData.rating ? parseInt(formData.rating) : null,
        message: formData.message
      });
      
      toast.success('Thank you for your feedback!');
      setFormData({
        name: '',
        email: '',
        rating: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div data-testid="feedback-page">
      <Navbar />
      
      <div className="page-banner" data-testid="feedback-banner">
        <img
          src="https://images.unsplash.com/photo-1606498438291-8d420fdae11c?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Feedback"
          className="banner-image"
        />
        <div className="banner-overlay"></div>
        <h1 className="banner-title" data-testid="feedback-title">Share Your Experience</h1>
      </div>

      <section className="section">
        <p className="section-subtitle" data-testid="feedback-subtitle">
          We value your feedback! Help us improve and serve you better.
        </p>
        
        <form className="feedback-form" onSubmit={handleSubmit} data-testid="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              data-testid="feedback-name-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              data-testid="feedback-email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (Optional)</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              data-testid="feedback-rating-select"
            >
              <option value="">Select a rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              data-testid="feedback-message-textarea"
            />
          </div>

          <button type="submit" className="submit-button" data-testid="feedback-submit-btn">
            Submit Feedback
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default FeedbackPage;
