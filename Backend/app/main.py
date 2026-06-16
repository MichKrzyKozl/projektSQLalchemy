from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.database import Base
import app.models
from app.routers import movies, actors, users, series

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "backend działa"}


app.include_router(users.router)
app.include_router(movies.router)
app.include_router(actors.router)
app.include_router(series.router)


