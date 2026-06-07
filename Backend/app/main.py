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
from app.models.actor import Actor
from app.models.user import User
from app.models.MovieRoleRating import MovieRoleRating
from app.schemas.user import UserCreate
from app.schemas.review import ReviewCreate
from fastapi import Depends
app = FastAPI()
Base.metadata.create_all(bind=engine)

#operation = Operation()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@app.get("/")
def root():
    return {"message": "backend działa"}

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.get("/movies")
def get_moives(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    return movies
@app.get("/actors")
def get_actors(db: Session = Depends(get_db)):
    movies = db.query(Actor).all()
    return movies

@app.post("/users")
def create_user(user_data: UserCreate,db: Session = Depends(get_db)):
    user = User(name=user_data.name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
@app.post("/movieReview")
def create_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    user_id = int(review_data.user_id)
    movie_review = MovieRating(
        value=review_data.value,
        user_id=user_id,
        movie_id=review_data.reviewed_id,
    )
    db.add(movie_review)
    db.commit()
    db.refresh(movie_review)
    return movie_review
@app.post("/movieRoleReview")
def create_movie_role_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    user_id = int(review_data.user_id)
    role_review = MovieRoleRating(
        value=review_data.value,
        user_id=user_id,
        role_id=review_data.reviewed_id,
    )
    db.add(role_review)
    db.commit()
    db.refresh(role_review)
    return role_review

@app.get("/movies/{movie_id}")
def get_movie(movie_id: int,db: Session = Depends(get_db)):   
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    return movie
    
@app.get("/movieroles/{movie_id}")
def get_moviesroles(movie_id: int,db: Session = Depends(get_db)):
    db: Session = SessionLocal()
    roles = db.query(MovieRole).filter(MovieRole.movie_id == movie_id).all()
    return roles   

@app.get("/movieactors/{movie_id}")
def get_movie_role_actors(movie_id: int,db: Session = Depends(get_db)):
    actors = (
        db.query(Actor)
        .join(MovieRole, MovieRole.actor_id == Actor.id)
        .filter(MovieRole.movie_id == movie_id)
        .all()
    )
    return actors

@app.get("/movieratings/{movie_id}")
def get_movie_ratings(movie_id: int,db: Session = Depends(get_db)):
    ratings = db.query(MovieRating).filter(MovieRating.movie_id == movie_id).all()
    return ratings
@app.get("/roleratings/{role_id}")
def get_role_ratings(role_id: int,db: Session = Depends(get_db)):
    ratings = db.query(MovieRoleRating).filter(MovieRoleRating.role_id == role_id).all()
    return ratings
        
    