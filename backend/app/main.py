from fastapi import FastAPI

app = FastAPI(title="DoSync")

@app.get("/health")
def check(): 
    return {"Status" : "Ok"}

