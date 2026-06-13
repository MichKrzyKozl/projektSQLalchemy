from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.deps import get_db
from app.models.movie import Movie
from app.models.movieRating import MovieRating
from app.models.MovieRole import MovieRole
from app.models.MovieRoleRating import MovieRoleRating
from app.models.actor import Actor
from app.schemas.review import ReviewCreate

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

	return [
		{
			"id": movie.id,
			"title": movie.title,
			"category": movie.category,
			"release_date": movie.release_date,
			"avg_rating": float(avg) if avg is not None else None,
		}
		for movie, avg in rows
	]


@router.get("/movies/asc")
def get_movies_asc(category=None, db: Session = Depends(get_db)):
	return get_movies(category=category, sort="asc", db=db)


@router.get("/movies/desc")
def get_movies_desc(category=None, db: Session = Depends(get_db)):
	return get_movies(category=category, sort="desc", db=db)


@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
	rows = db.query(Movie.category).distinct().all()

	categories = []
	for category, in rows:
		if category is not None:
			categories.append(category)

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
	ratings = db.query(MovieRating).filter(MovieRating.movie_id == movie_id).all()
	return ratings


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


@router.get("/roleratings/{role_id}")
def get_role_ratings(role_id: int, db: Session = Depends(get_db)):
	ratings = db.query(MovieRoleRating).filter(MovieRoleRating.role_id == role_id).all()
	return ratings

