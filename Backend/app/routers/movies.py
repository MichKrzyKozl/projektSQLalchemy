from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.movie import Movie
from app.models.movieRating import MovieRating
from app.models.MovieRole import MovieRole
from app.models.MovieRoleRating import MovieRoleRating
from app.models.actor import Actor
from app.schemas.review import ReviewCreate
from app.schemas.movie_create import MovieCreate
from app.schemas.movie_role_create import MovieRoleCreate
from app.models.user import User


router = APIRouter()


@router.get("/movies")
def get_movies(category=None, sort=None, db: Session = Depends(get_db)):
	query = (
		db.query(
			Movie,
			func.avg(MovieRating.value).label("avg_rating")
		)
		.outerjoin(MovieRating, MovieRating.movie_id == Movie.id)
		.group_by(Movie.id)
	)

	if category:
		query = query.filter(Movie.category == category)

	if sort == "asc":
		query = query.order_by(func.avg(MovieRating.value).asc())

	elif sort == "desc":
		query = query.order_by(func.avg(MovieRating.value).desc())

	rows = query.all()

	formatted_movies = []

	for movie, avg in rows:			
		movies = {
			"id": movie.id,
			"title": movie.title,
			"category": movie.category,
			"release_date": movie.release_date,
			"runtime_minutes": movie.runtime_minutes,
			"avg_rating": float(avg) if avg is not None else None,		
			}
		
		formatted_movies.append(movies)

	return formatted_movies


@router.get("/movies/asc")
def get_movies_asc(category=None, db: Session = Depends(get_db)):
	return get_movies(category=category, sort="asc", db=db)


@router.get("/movies/desc")
def get_movies_desc(category=None, db: Session = Depends(get_db)):
	return get_movies(category=category, sort="desc", db=db)


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
	bad_categories = db.query(Movie.category).distinct().all()
	categories = [] 
	for category in bad_categories:
		categories.append(category[0])	
	return categories

@router.get("/movies/{movie_id}")
def get_movie(movie_id: int, db: Session = Depends(get_db)):
	movie = db.query(Movie).filter(Movie.id == movie_id).first()
	return movie


@router.get("/movieroles/{movie_id}")
def get_moviesroles(movie_id: int, db: Session = Depends(get_db)):
	roles = db.query(MovieRole).filter(MovieRole.movie_id == movie_id).all()
	return roles


@router.get("/movieactors/{movie_id}")
def get_movie_role_actors(movie_id: int, db: Session = Depends(get_db)):
	return (
        db.query(Actor)
        .join(MovieRole)
        .filter(
            MovieRole.movie_id == movie_id
        )
        .all()
    )


@router.get("/movieratings/{movie_id}")
def get_movie_ratings(movie_id: int, db: Session = Depends(get_db)):
    rows = (
        db.query(MovieRating, User)
        .join(User, MovieRating.user_id == User.id)
        .filter(MovieRating.movie_id == movie_id)
        .all()
    )

    results = []

    for movie_rating, user in rows:
        results.append(
            {
                "id": movie_rating.id,
                "value": movie_rating.value,
                "user_id": movie_rating.user_id,
                "user_name": user.name,
            }
        )

    return results


@router.post("/movieReview")
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


@router.post("/movieRoleReview")
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


@router.post("/movies")
def create_movie(movie_data: MovieCreate, db: Session = Depends(get_db)):
	movie = Movie(
		title=movie_data.title,
		category=movie_data.category,
		release_date=movie_data.release_date,
		runtime_minutes=movie_data.runtime_minutes,
	)
	db.add(movie)
	db.commit()
	db.refresh(movie)
	return movie


@router.get("/roleratings/{role_id}")
def get_role_ratings(role_id: int, db: Session = Depends(get_db)):
	ratings = db.query(MovieRoleRating).filter(MovieRoleRating.role_id == role_id).all()
	return ratings


@router.post("/movieroles")
def create_movie_role(role_data: MovieRoleCreate, db: Session = Depends(get_db)):
	role = MovieRole(
		character_name=role_data.character_name,
		actor_id=role_data.actor_id,
		movie_id=role_data.movie_id,
	)
	db.add(role)
	db.commit()
	db.refresh(role)
	return role

