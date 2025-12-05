import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TripBuilder = () => {
  const [sites, setSites] = useState([]);
  const [guides, setGuides] = useState([]);
  const [presetPackages, setPresetPackages] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  const [budget, setBudget] = useState(10000);
  const [days, setDays] = useState(3);
  const [selectedGuide, setSelectedGuide] = useState('');
  const [estimate, setEstimate] = useState(null);
  const [tripName, setTripName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sitesRes, guidesRes, packagesRes] = await Promise.all([
        axios.get(`${API}/sites`),
        axios.get(`${API}/guides`),
        axios.get(`${API}/preset-packages`)
      ]);
      setSites(sitesRes.data);
      setGuides(guidesRes.data);
      setPresetPackages(packagesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load trip builder data');
    }
  };

  const handleSiteToggle = (siteId) => {
    setSelectedSites(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const handleEstimate = async () => {
    if (selectedSites.length === 0) {
      toast.error('Please select at least one site');
      return;
    }

    try {
      const response = await axios.post(`${API}/trip/estimate`, {
        site_ids: selectedSites,
        budget: parseInt(budget),
        days: parseInt(days),
        guide_id: selectedGuide || null
      });
      setEstimate(response.data);
      toast.success('Trip estimate calculated!');
    } catch (error) {
      console.error('Error estimating trip:', error);
      toast.error('Failed to calculate trip estimate');
    }
  };

  const handleSaveTrip = async () => {
    if (!tripName) {
      toast.error('Please enter a trip name');
      return;
    }
    if (!estimate) {
      toast.error('Please calculate estimate first');
      return;
    }

    try {
      await axios.post(`${API}/trips`, {
        name: tripName,
        site_ids: selectedSites,
        total_cost: estimate.total_cost,
        total_time_mins: estimate.total_time_mins,
        guide_id: selectedGuide || null
      });
      toast.success('Trip saved successfully!');
      setTripName('');
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip');
    }
  };

  const loadPresetPackage = (pkg) => {
    setSelectedSites(pkg.site_ids);
    setDays(pkg.days);
    setBudget(pkg.estimated_cost);
    toast.success(`Loaded ${pkg.name} package`);
  };

  return (
    <div data-testid="trip-builder-page">
      <Navbar />
      
      <div className="page-banner" data-testid="trip-builder-banner">
        <img
          src="https://images.unsplash.com/photo-1583043550616-ac6e0a1b9574?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Trip Builder"
          className="banner-image"
        />
        <div className="banner-overlay"></div>
        <h1 className="banner-title" data-testid="trip-builder-title">Dynamic Trip Builder</h1>
      </div>

      <section className="section">
        <h2 className="section-title">Preset Packages</h2>
        <div className="preset-packages">
          {presetPackages.map((pkg) => (
            <div className="package-card" key={pkg.id} onClick={() => loadPresetPackage(pkg)} data-testid={`preset-package-${pkg.id}`}>
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-price">₹{pkg.estimated_cost.toLocaleString()}</div>
              <p className="card-description">{pkg.description}</p>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="card-button" data-testid={`load-package-btn-${pkg.id}`}>Load Package</button>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '4rem' }}>Build Custom Trip</h2>
        <div className="trip-builder">
          <div className="builder-panel" data-testid="trip-configuration-panel">
            <h3 className="builder-title">Trip Configuration</h3>
            
            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                data-testid="budget-input"
              />
            </div>

            <div className="form-group">
              <label>Days</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                data-testid="days-input"
              />
            </div>

            <div className="form-group">
              <label>Select Guide (Optional)</label>
              <select value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} data-testid="guide-select">
                <option value="">No Guide</option>
                {guides.map((guide) => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name} - ₹{guide.fee_per_day}/day
                  </option>
                ))}
              </select>
            </div>

            <h3 className="builder-title" style={{ marginTop: '2rem' }}>Select Sites</h3>
            {sites.map((site) => (
              <div className="site-checkbox" key={site.id} data-testid={`site-checkbox-${site.slug}`}>
                <input
                  type="checkbox"
                  checked={selectedSites.includes(site.id)}
                  onChange={() => handleSiteToggle(site.id)}
                  data-testid={`site-checkbox-input-${site.slug}`}
                />
                <div>
                  <strong>{site.name}</strong>
                  <div style={{ fontSize: '0.9rem', color: 'var(--stone-grey)' }}>
                    {site.type} • ₹{site.entry_fee} • {site.avg_visit_time_mins} mins
                  </div>
                </div>
              </div>
            ))}

            <button className="submit-button" onClick={handleEstimate} data-testid="calculate-estimate-btn">
              Calculate Estimate
            </button>
          </div>

          <div className="builder-panel" data-testid="trip-summary-panel">
            <h3 className="builder-title">Trip Summary</h3>
            
            {estimate ? (
              <>
                <div className="cost-breakdown">
                  <h4>Cost Breakdown</h4>
                  {estimate.cost_breakdown.map((item, idx) => (
                    <div key={idx} data-testid={`cost-breakdown-item-${idx}`}>
                      <h5 style={{ marginTop: '1rem', color: 'var(--deep-brown)' }}>{item.site_name}</h5>
                      <div className="cost-item">
                        <span>Entry Fee</span>
                        <span>₹{item.entry_fee}</span>
                      </div>
                      <div className="cost-item">
                        <span>Food</span>
                        <span>₹{item.food_cost}</span>
                      </div>
                      <div className="cost-item">
                        <span>Transport</span>
                        <span>₹{item.transport_cost}</span>
                      </div>
                      <div className="cost-item">
                        <span>Activities</span>
                        <span>₹{item.activity_cost}</span>
                      </div>
                    </div>
                  ))}
                  
                  {estimate.guide_cost > 0 && (
                    <div className="cost-item" data-testid="guide-cost-item">
                      <span><strong>Guide Fee</strong></span>
                      <span><strong>₹{estimate.guide_cost}</strong></span>
                    </div>
                  )}
                  
                  <div className="cost-total" data-testid="total-cost-display">
                    <span>Total Cost</span>
                    <span>₹{estimate.total_cost.toLocaleString()}</span>
                  </div>
                  
                  <div className="cost-item" data-testid="total-time-display">
                    <span>Total Time</span>
                    <span>{Math.floor(estimate.total_time_mins / 60)}h {estimate.total_time_mins % 60}m</span>
                  </div>
                </div>

                {estimate.suggestions.length > 0 && (
                  <div style={{ marginTop: '2rem' }} data-testid="suggestions-section">
                    <h4>Suggestions</h4>
                    {estimate.suggestions.map((suggestion, idx) => (
                      <p key={idx} style={{ padding: '0.5rem', background: '#fff3e0', borderRadius: '8px', marginTop: '0.5rem' }}>
                        {suggestion}
                      </p>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: '2rem' }}>
                  <div className="form-group">
                    <label>Trip Name</label>
                    <input
                      type="text"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      placeholder="My Chambal Adventure"
                      data-testid="trip-name-input"
                    />
                  </div>
                  <button className="submit-button" onClick={handleSaveTrip} data-testid="save-trip-btn">
                    Save Trip
                  </button>
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--stone-grey)', textAlign: 'center', padding: '3rem 0' }} data-testid="no-estimate-message">
                Select sites and click "Calculate Estimate" to see your trip summary
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TripBuilder;
