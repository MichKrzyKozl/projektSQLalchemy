from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
# from operation import Operation
from app.database import SessionLocal
from app.database import engine
from app.database import Base
import app.models
from app.models.movie import Movie
from app.models.movieRating import MovieRating
from app.models.MovieRole import MovieRole
from app.models.user import User
from app.schemas.user import UserCreate
app = FastAPI()
Base.metadata.create_all(bind=engine)

#operation = Operation()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "backend działa"}

@app.get("/users")
def get_users():
    db: Session = SessionLocal()
    users = db.query(User).all()
    return users

@app.get("/movies")
def get_moives():
    db: Session = SessionLocal()
    movies = db.query(Movie).all()
    return movies

@app.post("/users")
def create_user(user_data: UserCreate):
    db: Session = SessionLocal()
    user = User(name=user_data.name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.get("/movies/{movie_id}")
def get_movie(movie_id: int):   
        db: Session = SessionLocal()
        movie = db.query(Movie).filter(Movie.id == movie_id).first()
        return movie
    
@app.get("/movieroles/{movie_id}")
def get_moviesroles(movie_id: int):
    db: Session = SessionLocal()
    roles = db.query(MovieRole).filter(MovieRole.movie_id == movie_id).all()
    return roles   

    
    
    