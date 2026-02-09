from pydantic_settings import BaseSettings

class Settings(BaseSettings): 
    app_name: str = "DoSync"
    mongo_uri :str 
    mongo_db:str 
    
    class Config:
        env_file = ".env"


# This automatically reads:
# MONGO_URI
# MONGO_DB
settings = Settings()