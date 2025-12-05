# Hidden Heritage - Setup Instructions

## 📦 What's Included in This ZIP

```
hidden-heritage-source-code.zip
├── backend/
│   ├── server.py              # FastAPI server with all APIs (340 lines)
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js      # Navigation component
│   │   │   ├── Footer.js      # Footer component
│   │   │   └── MapView.js     # Leaflet interactive map
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js        # Landing page with hero
│   │   │   ├── Explore.js     # Explore regions
│   │   │   ├── RegionDetail.js # Region detail page
│   │   │   ├── SiteDetail.js  # Site detail page
│   │   │   ├── TripBuilder.js # Trip builder
│   │   │   ├── About.js       # About page
│   │   │   └── FeedbackPage.js # Feedback form
│   │   │
│   │   ├── lib/
│   │   │   └── utils.js       # Utility functions
│   │   │
│   │   ├── hooks/
│   │   │   └── use-toast.js   # Toast notifications
│   │   │
│   │   ├── App.js             # Main app with routing
│   │   ├── App.css            # Complete styling (500+ lines)
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Global styles
│   │
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS config
│   ├── craco.config.js        # CRA config
│   └── .env                   # Frontend environment variables
│
├── PROJECT_STRUCTURE.md        # Complete project documentation
├── SETUP_INSTRUCTIONS.md       # This file
└── README.md                   # Project overview
```

## 🚀 Local Development Setup

### Prerequisites
- Python 3.9+
- Node.js 18+ & Yarn
- MongoDB (local or cloud)

### Step 1: Extract the ZIP
```bash
unzip hidden-heritage-source-code.zip -d hidden-heritage
cd hidden-heritage
```

### Step 2: Backend Setup
```bash
# Go to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Update .env if needed
# MONGO_URL=mongodb://localhost:27017
# DB_NAME=test_database

# Run backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```
Backend will run at: http://localhost:8001

### Step 3: Frontend Setup
```bash
# Open new terminal, go to frontend folder
cd frontend

# Install dependencies
yarn install

# Update .env if needed
# REACT_APP_BACKEND_URL=http://localhost:8001

# Run frontend
yarn start
```
Frontend will run at: http://localhost:3000

### Step 4: Database Seeding
The database auto-seeds on first backend startup with:
- 1 region (Chambal)
- 6 heritage sites
- 3 local guides
- 3 preset packages

## 🔧 VS Code Setup

### Recommended Extensions
- ESLint
- Prettier
- Python
- Tailwind CSS IntelliSense

### Open in VS Code
```bash
code .
```

### Workspace Settings (Optional)
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  }
}
```

## 📝 Key Files to Edit

### To Modify Backend:
- `backend/server.py` - All API endpoints and logic
- `backend/.env` - Environment variables

### To Modify Frontend:
- `frontend/src/App.css` - All styling
- `frontend/src/pages/*.js` - Individual pages
- `frontend/src/components/*.js` - Reusable components

### To Change Design:
- CSS variables in `App.css` (:root section)
- Tailwind config in `tailwind.config.js`

### To Add New Site:
Edit database seeding in `backend/server.py` (line ~280+)

## 🌐 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=hidden_heritage_db
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🗄️ MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### MongoDB Atlas (Cloud)
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGO_URL in backend/.env

## 📱 API Testing

### Test Backend APIs
```bash
# Check backend is running
curl http://localhost:8001/api/

# Get all regions
curl http://localhost:8001/api/regions

# Get all sites
curl http://localhost:8001/api/sites

# Get guides
curl http://localhost:8001/api/guides
```

## 🎨 Customization Guide

### Change Colors
Edit in `frontend/src/App.css`:
```css
:root {
  --deep-brown: #4a2f23;      /* Change primary color */
  --sandstone: #d9b89a;       /* Change secondary */
  --terracotta: #c86b3a;      /* Change accent */
}
```

### Change Fonts
Update in `frontend/src/App.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');

h1, h2, h3 {
  font-family: 'YourFont', serif;
}
```

### Add New Page
1. Create component in `frontend/src/pages/NewPage.js`
2. Add route in `frontend/src/App.js`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```
3. Add link in Navbar.js

### Modify Trip Cost Calculation
Edit in `backend/server.py`:
```python
@api_router.post("/trip/estimate")
async def estimate_trip(request: TripEstimateRequest):
    # Modify cost logic here
    food_cost = 300  # Change costs
    transport_cost = 200
    activity_cost = 150
```

## 🐛 Common Issues

### Port Already in Use
```bash
# Backend (8001)
lsof -ti:8001 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
- Check MongoDB is running
- Verify MONGO_URL in .env
- Check firewall settings

### Module Not Found
```bash
# Backend
pip install -r requirements.txt

# Frontend
yarn install
```

### Leaflet Map Not Showing
- Check internet connection (needs tiles from OSM)
- Check browser console for errors
- Verify leaflet CSS is imported

## 📚 Additional Resources

- FastAPI Docs: https://fastapi.tiangolo.com
- React Router: https://reactrouter.com
- Leaflet: https://leafletjs.com
- MongoDB: https://www.mongodb.com/docs
- Tailwind CSS: https://tailwindcss.com

## 🆘 Need Help?

Check:
1. Browser console (F12) for frontend errors
2. Backend terminal for API errors
3. MongoDB logs for database issues

## 🎯 Next Steps

After setup:
1. Explore the live site at http://localhost:3000
2. Test all features (map, trip builder, feedback)
3. Check API endpoints at http://localhost:8001/docs
4. Modify code and see hot-reload in action
5. Add your own heritage sites and regions!

Happy coding! 🚀
