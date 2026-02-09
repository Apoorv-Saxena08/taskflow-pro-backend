from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings # Import the settings from the config file

client = None
db = None 

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(settings.mongo_uri) # Use the mongo_uri from settings
    db = client[settings.mongo_db] # Use the mongo_db from settings
    
async def close_mongo_connection():
    global client
    if client:
        client.close()