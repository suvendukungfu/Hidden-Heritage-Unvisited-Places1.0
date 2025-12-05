from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class Region(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    description: str
    banner_image: str
    short_description: str

class Site(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    region_id: str
    name: str
    slug: str
    type: str
    short_description: str
    full_description: str
    latitude: float
    longitude: float
    entry_fee: int
    avg_visit_time_mins: int
    image: str

class Guide(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    certification: str
    fee_per_day: int
    languages: List[str]
    bio: str
    image: str

class Feedback(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    rating: Optional[int] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FeedbackCreate(BaseModel):
    name: str
    email: str
    rating: Optional[int] = None
    message: str

class PresetPackage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    site_ids: List[str]
    days: int
    estimated_cost: int
    features: List[str]

class TripEstimateRequest(BaseModel):
    site_ids: List[str]
    budget: int
    days: int
    guide_id: Optional[str] = None

class CostBreakdown(BaseModel):
    site_name: str
    entry_fee: int
    food_cost: int
    transport_cost: int
    activity_cost: int
    total: int

class TripEstimateResponse(BaseModel):
    total_cost: int
    total_time_mins: int
    cost_breakdown: List[CostBreakdown]
    route_coordinates: List[List[float]]
    guide_cost: int
    suggestions: List[str]

class Trip(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    site_ids: List[str]
    total_cost: int
    total_time_mins: int
    guide_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TripCreate(BaseModel):
    name: str
    site_ids: List[str]
    total_cost: int
    total_time_mins: int
    guide_id: Optional[str] = None

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Hidden Heritage API"}

# Regions
@api_router.get("/regions", response_model=List[Region])
async def get_regions():
    regions = await db.regions.find({}, {"_id": 0}).to_list(100)
    return regions

@api_router.get("/regions/{slug}", response_model=Region)
async def get_region(slug: str):
    region = await db.regions.find_one({"slug": slug}, {"_id": 0})
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    return region

# Sites
@api_router.get("/sites", response_model=List[Site])
async def get_sites(region_id: Optional[str] = None):
    query = {"region_id": region_id} if region_id else {}
    sites = await db.sites.find(query, {"_id": 0}).to_list(100)
    return sites

@api_router.get("/sites/{slug}", response_model=Site)
async def get_site(slug: str):
    site = await db.sites.find_one({"slug": slug}, {"_id": 0})
    if not site:
        raise HTTPException(status_code=404, detail="Site not found")
    return site

# Guides
@api_router.get("/guides", response_model=List[Guide])
async def get_guides():
    guides = await db.guides.find({}, {"_id": 0}).to_list(100)
    return guides

# Feedback
@api_router.post("/feedback", response_model=Feedback)
async def create_feedback(input: FeedbackCreate):
    feedback_dict = input.model_dump()
    feedback_obj = Feedback(**feedback_dict)
    
    doc = feedback_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.feedbacks.insert_one(doc)
    return feedback_obj

@api_router.get("/feedbacks", response_model=List[Feedback])
async def get_feedbacks():
    feedbacks = await db.feedbacks.find({}, {"_id": 0}).to_list(1000)
    for feedback in feedbacks:
        if isinstance(feedback['created_at'], str):
            feedback['created_at'] = datetime.fromisoformat(feedback['created_at'])
    return feedbacks

# Trip estimation
@api_router.post("/trip/estimate", response_model=TripEstimateResponse)
async def estimate_trip(request: TripEstimateRequest):
    # Fetch selected sites
    sites = await db.sites.find({"id": {"$in": request.site_ids}}, {"_id": 0}).to_list(100)
    
    if not sites:
        raise HTTPException(status_code=404, detail="Sites not found")
    
    # Calculate costs
    total_cost = 0
    total_time_mins = 0
    cost_breakdown = []
    route_coordinates = []
    
    for site in sites:
        entry_fee = site.get('entry_fee', 0)
        food_cost = 300  # ₹300 per meal
        transport_cost = 200  # ₹200 per site
        activity_cost = 150  # ₹150 for activities
        
        site_total = entry_fee + food_cost + transport_cost + activity_cost
        total_cost += site_total
        total_time_mins += site.get('avg_visit_time_mins', 120)
        
        cost_breakdown.append(CostBreakdown(
            site_name=site['name'],
            entry_fee=entry_fee,
            food_cost=food_cost,
            transport_cost=transport_cost,
            activity_cost=activity_cost,
            total=site_total
        ))
        
        route_coordinates.append([site['latitude'], site['longitude']])
    
    # Add guide cost if selected
    guide_cost = 0
    if request.guide_id:
        guide = await db.guides.find_one({"id": request.guide_id}, {"_id": 0})
        if guide:
            guide_cost = guide['fee_per_day'] * request.days
            total_cost += guide_cost
    
    # Generate suggestions
    suggestions = []
    if len(request.site_ids) == 1:
        suggestions.append("Consider adding Bateshwar Temples nearby for a complete heritage experience!")
    if request.budget < total_cost:
        suggestions.append(f"Your budget is ₹{request.budget}, but estimated cost is ₹{total_cost}. Consider reducing days or sites.")
    if request.days < (total_time_mins / 480):  # 8 hours per day
        suggestions.append("Consider adding more days for a relaxed itinerary.")
    
    return TripEstimateResponse(
        total_cost=total_cost,
        total_time_mins=total_time_mins,
        cost_breakdown=cost_breakdown,
        route_coordinates=route_coordinates,
        guide_cost=guide_cost,
        suggestions=suggestions
    )

# Save trip
@api_router.post("/trips", response_model=Trip)
async def create_trip(input: TripCreate):
    trip_dict = input.model_dump()
    trip_obj = Trip(**trip_dict)
    
    doc = trip_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.trips.insert_one(doc)
    return trip_obj

# Preset packages
@api_router.get("/preset-packages", response_model=List[PresetPackage])
async def get_preset_packages():
    packages = await db.preset_packages.find({}, {"_id": 0}).to_list(100)
    return packages

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Seed data on startup
@app.on_event("startup")
async def seed_database():
    # Check if data already exists
    existing_regions = await db.regions.count_documents({})
    if existing_regions > 0:
        logger.info("Database already seeded")
        return
    
    logger.info("Seeding database...")
    
    # Seed Regions
    region_id = str(uuid.uuid4())
    regions = [
        {
            "id": region_id,
            "name": "Chambal Region",
            "slug": "chambal",
            "short_description": "Ancient ravines, forgotten temples, and timeless heritage",
            "description": "The Chambal region is a land of mystery and forgotten heritage. Known for its dramatic ravines, ancient temples, and rich history, this region offers a unique journey through time. From the sacred Bateshwar temples to prehistoric rock art, Chambal holds secrets waiting to be discovered. Experience the raw beauty of nature intertwined with centuries-old cultural treasures.",
            "banner_image": "https://images.unsplash.com/photo-1583043550616-ac6e0a1b9574?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxDaGFtYmFsJTIwcmF2aW5lcyUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NjM1ODgwODh8MA&ixlib=rb-4.1.0&q=85"
        }
    ]
    await db.regions.insert_many(regions)
    
    # Seed Sites
    sites = [
        {
            "id": str(uuid.uuid4()),
            "region_id": region_id,
            "name": "Bateshwar Temples",
            "slug": "bateshwar-temples",
            "type": "Temple",
            "short_description": "A stunning complex of 200+ ancient temples dating back to 8th-10th century CE",
            "full_description": "The Bateshwar Temples are a magnificent archaeological complex consisting of over 200 sandstone temples dedicated to Lord Shiva. Built between the 8th and 10th centuries, these temples showcase exquisite Gurjara-Pratihara architecture. The site was lost to the ravages of time and was rediscovered and restored in recent years. Walking through this ancient complex feels like stepping back in time, with intricate carvings and spiritual energy permeating the atmosphere.",
            "latitude": 26.3833,
            "longitude": 78.4167,
            "entry_fee": 50,
            "avg_visit_time_mins": 180,
            "image": "https://images.unsplash.com/photo-1681054559674-7e80aad3d2ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwSW5kaWFuJTIwdGVtcGxlfGVufDB8fHx8MTc2MzU4ODA4OHww&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "region_id": region_id,
            "name": "Chambal Ravines",
            "slug": "chambal-ravines",
            "type": "Natural Wonder",
            "short_description": "Dramatic geological formations carved by erosion over millennia",
            "full_description": "The Chambal Ravines are a spectacular natural wonder formed by severe soil erosion over thousands of years. These badlands create a surreal landscape of deep gorges, steep cliffs, and maze-like formations. Historically, these ravines were home to dacoits (bandits) and remain largely unexplored. Today, they offer adventure seekers and nature lovers a chance to witness raw, untouched beauty. The ravines are also home to diverse wildlife including gharials, dolphins, and numerous bird species.",
            "latitude": 26.5000,
            "longitude": 78.5000,
            "entry_fee": 0,
            "avg_visit_time_mins": 240,
            "image": "https://images.unsplash.com/photo-1583043550616-ac6e0a1b9574?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxDaGFtYmFsJTIwcmF2aW5lcyUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NjM1ODgwODh8MA&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "region_id": region_id,
            "name": "Bhimbetka Rock Shelters",
            "slug": "bhimbetka-rock-art",
            "type": "Rock Art",
            "short_description": "UNESCO World Heritage Site featuring prehistoric cave paintings dating back 30,000 years",
            "full_description": "Bhimbetka Rock Shelters are a UNESCO World Heritage Site containing some of the oldest cave paintings in India, dating back to the Paleolithic era. These natural rock formations house over 500 caves with paintings depicting scenes of hunting, dancing, religious rituals, and daily life of ancient humans. The art spans multiple periods showing the evolution of human civilization in the region. The site offers a rare glimpse into prehistoric life and artistic expression.",
            "latitude": 22.9392,
            "longitude": 77.6102,
            "entry_fee": 100,
            "avg_visit_time_mins": 150,
            "image": "https://images.unsplash.com/photo-1715790357004-81af9a3b1967?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjByb2NrJTIwYXJ0JTIwcGV0cm9nbHlwaHN8ZW58MHx8fHwxNzYzNTg4MDg5fDA&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "region_id": region_id,
            "name": "Garhi Padavali Fort",
            "slug": "garhi-padavali",
            "type": "Fort",
            "short_description": "Ancient hilltop fort offering panoramic views and historical significance",
            "full_description": "Garhi Padavali is a historic fort perched atop a hill, offering breathtaking views of the surrounding landscape. The fort complex includes ancient temples and structures dating back to the 10th century. The architecture reflects the military and religious importance of the site. Visitors can explore the ruins while enjoying spectacular sunsets over the ravines. The site is less crowded, offering a peaceful exploration experience.",
            "latitude": 25.9833,
            "longitude": 78.3167,
            "entry_fee": 30,
            "avg_visit_time_mins": 120,
            "image": "https://images.unsplash.com/photo-1663997943673-9c679560f5a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwSW5kaWFuJTIwdGVtcGxlfGVufDB8fHx8MTc2MzU4ODA4OHww&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "region_id": region_id,
            "name": "Mitawali Temple",
            "slug": "mitawali-temple",
            "type": "Temple",
            "short_description": "Unique circular temple complex with 64 shrines dedicated to yoginis",
            "full_description": "Mitawali Temple, also known as Chausath Yogini Temple, is a stunning circular temple complex featuring 64 shrines dedicated to the yoginis (female mystic deities). Built in the 11th century, the temple's circular architecture is believed to have inspired the design of the Indian Parliament. The temple sits atop a hill, providing panoramic views. It's an important site for understanding tantric practices and ancient architectural innovation.",
            "latitude": 25.8500,
            "longitude": 78.4000,
            "entry_fee": 40,
            "avg_visit_time_mins": 90,
            "image": "https://images.unsplash.com/photo-1606498438291-8d420fdae11c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxhbmNpZW50JTIwSW5kaWFuJTIwdGVtcGxlfGVufDB8fHx8MTc2MzU4ODA4OHww&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "region_id": region_id,
            "name": "Dholpur Palace",
            "slug": "dholpur-palace",
            "type": "Palace",
            "short_description": "Majestic red sandstone palace showcasing Rajput architecture",
            "full_description": "Dholpur Palace is a magnificent structure built with red sandstone, showcasing the grandeur of Rajput architecture. The palace complex includes beautiful courtyards, intricate jharokhas (overhanging balconies), and stunning frescoes. Built in the 19th century, it served as a royal residence and hunting lodge. The palace is surrounded by lush gardens and offers insights into the lifestyle of Indian royalty. It's a photographer's paradise with its stunning architecture and scenic location.",
            "latitude": 26.7030,
            "longitude": 77.8921,
            "entry_fee": 80,
            "avg_visit_time_mins": 120,
            "image": "https://images.unsplash.com/photo-1663997943673-9c679560f5a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwSW5kaWFuJTIwdGVtcGxlfGVufDB8fHx8MTc2MzU4ODA4OHww&ixlib=rb-4.1.0&q=85"
        }
    ]
    await db.sites.insert_many(sites)
    
    # Seed Guides
    guides = [
        {
            "id": str(uuid.uuid4()),
            "name": "Rajesh Kumar",
            "certification": "Archaeological Survey of India Certified",
            "fee_per_day": 2000,
            "languages": ["Hindi", "English", "Bundelkhandi"],
            "bio": "Rajesh has been guiding heritage tours in Chambal for over 15 years. With deep knowledge of local history, archaeology, and folklore, he brings ancient sites to life through captivating storytelling.",
            "image": "https://images.unsplash.com/photo-1675388545634-83d816322c83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxjdWx0dXJhbCUyMGd1aWRlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzYzNTg4MDkwfDA&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Priya Sharma",
            "certification": "Tourism & Hospitality Management Degree",
            "fee_per_day": 1800,
            "languages": ["Hindi", "English", "German"],
            "bio": "Priya specializes in eco-tourism and wildlife experiences in Chambal. She combines cultural heritage with nature walks, offering a holistic experience of the region's biodiversity and history.",
            "image": "https://images.unsplash.com/photo-1697510364485-e900c2fe7524?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxjdWx0dXJhbCUyMGd1aWRlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzYzNTg4MDkwfDA&ixlib=rb-4.1.0&q=85"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Vikram Singh",
            "certification": "Heritage Conservation Expert",
            "fee_per_day": 2500,
            "languages": ["Hindi", "English", "French"],
            "bio": "Vikram is a heritage conservation expert who has worked on restoration projects across Chambal. His tours focus on architectural details and conservation efforts, perfect for architecture enthusiasts.",
            "image": "https://images.unsplash.com/photo-1675388545634-83d816322c83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxjdWx0dXJhbCUyMGd1aWRlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzYzNTg4MDkwfDA&ixlib=rb-4.1.0&q=85"
        }
    ]
    await db.guides.insert_many(guides)
    
    # Seed Preset Packages
    packages = [
        {
            "id": str(uuid.uuid4()),
            "name": "Budget Explorer",
            "description": "Perfect for budget travelers wanting to experience Chambal's highlights",
            "site_ids": [sites[0]['id'], sites[1]['id'], sites[3]['id']],
            "days": 2,
            "estimated_cost": 4000,
            "features": ["Basic accommodation", "Local transport", "Entry fees included", "Local food experiences"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Comfort Heritage Trail",
            "description": "Balanced experience with comfort and comprehensive site coverage",
            "site_ids": [sites[0]['id'], sites[1]['id'], sites[2]['id'], sites[4]['id']],
            "days": 3,
            "estimated_cost": 8500,
            "features": ["Comfortable hotels", "AC transport", "Professional guide", "All meals", "Photography spots"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Cultural Immersion",
            "description": "Luxury experience covering all major sites with expert guidance",
            "site_ids": [sites[0]['id'], sites[1]['id'], sites[2]['id'], sites[3]['id'], sites[4]['id'], sites[5]['id']],
            "days": 5,
            "estimated_cost": 18000,
            "features": ["Luxury accommodation", "Private vehicle", "Expert guide", "All meals & snacks", "Cultural performances", "Sunrise/sunset tours", "Wildlife safari"]
        }
    ]
    await db.preset_packages.insert_many(packages)
    
    logger.info("Database seeded successfully!")
