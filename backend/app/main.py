from fastapi import FastAPI
from app.database import mongodb

app = FastAPI(title="DoSync")
#Lifecycle hooks = professional backend practice.
@app.on_event("startup")
async def startup_event():
    await mongodb.connect_to_mongo()
    
@app.on_event("shutdown")
async def shutdown_event():
    await mongodb.close_mongo_connection()

@app.get("/health")
async def check_health(): 
    collections = await mongodb.db.list_collection_names() # Check if we can access the database
    return {"status": "ok", "collections": collections}

