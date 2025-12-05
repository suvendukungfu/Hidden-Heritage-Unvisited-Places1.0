# Hidden Heritage - Project Documentation

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Setup
```bash
cd frontend
yarn install
yarn start
```

## 📦 Key Dependencies

### Backend (requirements.txt)
- fastapi==0.110.1
- motor==3.3.1 (MongoDB async driver)
- pydantic>=2.6.4
- uvicorn==0.25.0

### Frontend (package.json)
- react: ^19.0.0
- react-router-dom: ^7.5.1
- leaflet: ^1.9.4
- react-leaflet: ^5.0.0
- axios: ^1.8.4
- sonner: ^2.0.3 (toasts)
- Shadcn UI components

## 🗄️ Database Structure (MongoDB)

### Collections:
1. **regions** - Heritage regions
2. **sites** - Heritage sites with coordinates
3. **guides** - Local guides
4. **feedbacks** - User feedback
5. **trips** - Saved trip itineraries
6. **preset_packages** - Preset trip packages

### Auto-seeding:
Database automatically seeds on first startup with:
- 1 region (Chambal)
- 6 heritage sites
- 3 local guides
- 3 preset packages

## 🎨 Design System

### Colors (in App.css):
- --deep-brown: #4a2f23
- --sandstone: #d9b89a
- --terracotta: #c86b3a
- --dusty-orange: #e89b6f
- --stone-grey: #8a8a7e
- --gold-accent: #d4a574

### Fonts:
- Headings: Playfair Display
- Body: Inter

## 🔌 API Endpoints

### Regions
- GET /api/regions - List all regions
- GET /api/regions/:slug - Get region by slug

### Sites
- GET /api/sites - List all sites
- GET /api/sites/:slug - Get site by slug

### Guides
- GET /api/guides - List all guides

### Feedback
- POST /api/feedback - Submit feedback
- GET /api/feedbacks - Get all feedback (admin)

### Trip Builder
- POST /api/trip/estimate - Calculate trip estimate
- POST /api/trips - Save trip
- GET /api/preset-packages - Get preset packages

## 📝 Environment Variables

### backend/.env
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

### frontend/.env
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🗂️ File Descriptions

### Backend
**server.py** (340 lines)
- FastAPI application
- MongoDB connection
- All API routes
- Pydantic models
- Database seeding logic
- Cost calculation algorithms

### Frontend Components
**App.js** - Main router with all routes
**App.css** - Complete styling (500+ lines)
**Navbar.js** - Fixed navigation bar
**Footer.js** - Footer with links
**MapView.js** - Interactive Leaflet map with route drawing

### Frontend Pages
**Home.js** - Hero section + photo treadmill
**Explore.js** - Regions listing
**RegionDetail.js** - Region page with sites grid + map
**SiteDetail.js** - Individual site details
**TripBuilder.js** - Dynamic trip builder with cost breakdown
**About.js** - About/mission page
**FeedbackPage.js** - Feedback form

## 🎯 Key Features Implemented

✅ Full-screen hero with animated photo treadmill
✅ Asymmetric site grid layout
✅ Interactive Leaflet map with pins & route drawing
✅ Dynamic trip cost calculator
✅ Site selection with checkboxes
✅ Budget and time-based suggestions
✅ Preset packages (Budget/Comfort/Premium)
✅ Guide selection with fees
✅ Feedback form with MongoDB storage
✅ Responsive design
✅ Smooth animations & transitions
✅ Auto-seeding database

## 📱 Pages & Routes

- / - Home (Hero + Explore section)
- /explore - Explore regions
- /region/chambal - Chambal region detail
- /site/:slug - Individual site pages
- /trip-builder - Trip builder & bookings
- /about - About page
- /feedback - Feedback form

## 🎨 Styling Notes

- No dark gradients (warm earth tones instead)
- Heritage-inspired color palette
- Playfair Display for elegance
- Smooth hover effects on all interactive elements
- Asymmetric grids for visual interest
- Parallax effects on hero section

## 🔧 Customization Tips

### Add New Site:
Add to database seeding in server.py sites array

### Change Colors:
Update CSS variables in App.css :root

### Add Region:
1. Add region to database
2. Add sites with region_id
3. Frontend automatically displays

### Modify Cost Calculation:
Edit trip estimation logic in server.py `/api/trip/estimate`

