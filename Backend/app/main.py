from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
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
from app.models.actorRating import ActorRating
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
def get_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()

    rows = (
        db.query(Movie.id, func.avg(MovieRating.value))
        .outerjoin(MovieRating, MovieRating.movie_id == Movie.id)
        .group_by(Movie.id)
        .all()
    )
    avg_map = {m_id: (float(avg) if avg is not None else None) for m_id, avg in rows}


    for m in movies:
        try:
            setattr(m, "avg_rating", avg_map.get(m.id))
        except Exception:
            pass

    return movies
@app.get("/actors")
def get_actors(db: Session = Depends(get_db)):
    movies = db.query(Actor).all()
    return movies


@app.get("/actors/{actor_id}")
def get_actor(actor_id: int, db: Session = Depends(get_db)):
    actor = db.query(Actor).filter(Actor.id == actor_id).first()
    return actor

@app.post("/users")
def create_user(user_data: UserCreate,db: Session = Depends(get_db)):
    user = User(name=user_data.name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
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
@app.get("/actorMovies/{actor_id}")
def get_actor_movies(actor_id: int, db: Session = Depends(get_db)):
    roles = db.query(MovieRole).filter(MovieRole.actor_id == actor_id).all()
    results = []
    for role in roles:
        movie = role.movie
        if not movie:
            continue
        ratings = [r.value for r in getattr(role, "ratings") or []]
        avg = None
        if ratings:
            avg = sum(ratings) / len(ratings)

        results.append(
            {
                "movie_id": movie.id,
                "title": movie.title,
                "role_id": role.id,
                "character_name": role.character_name,
                "avg_rating": avg,
            }
        )

    return results
@app.get("/movieroles/{movie_id}")
def get_moviesroles(movie_id: int,db: Session = Depends(get_db)):
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
@app.get("/actorratings/{actor_id}")
def get_actor_ratings(actor_id: int,db: Session = Depends(get_db)):
    rows = (
        db.query(ActorRating, User)
        .join(User, ActorRating.user_id == User.id)
        .filter(ActorRating.actor_id == actor_id)
        .all()
    )

    results = []
    for actor_rating, user in rows:
        results.append(
            {
                "id": actor_rating.id,
                "value": actor_rating.value,
                "user_id": actor_rating.user_id,
                "user_name": user.name,
            }
        )

    return results
@app.post("/actorReview")
def create_actor_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    user_id = int(review_data.user_id)
    actor_review = ActorRating(
        value=review_data.value,
        user_id=user_id,
        actor_id=review_data.reviewed_id,
    )
    db.add(actor_review)
    db.commit()
    db.refresh(actor_review)
    return actor_review
@app.get("/roleratings/{role_id}")
def get_role_ratings(role_id: int,db: Session = Depends(get_db)):
    ratings = db.query(MovieRoleRating).filter(MovieRoleRating.role_id == role_id).all()
    return ratings
        
    