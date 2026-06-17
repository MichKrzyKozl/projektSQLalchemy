from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.actor import Actor
from app.models.actorRating import ActorRating
from app.models.MovieRole import MovieRole
from app.models.user import User
from app.models.series import Series
from app.models.SeriesRole import SeriesRole
from app.schemas.review import ReviewCreate
from app.schemas.actor_create import ActorCreate

router = APIRouter()


@router.get("/actors")
def get_actors(
    db: Session = Depends(get_db)
):
    rows = (
        db.query(
            Actor,
            func.avg(
                ActorRating.value
            ).label("avg_rating")
        )
        .outerjoin(
            ActorRating,
            ActorRating.actor_id == Actor.id
        )
        .group_by(
            Actor.id
        )
        .all()
    )

    return [
        {
            "id": actor.id,
            "name": actor.name,
			"surname": actor.surname,
			"date_of_birth": actor.date_of_birth,
            "avg_rating": (
                float(avg)
                if avg is not None
                else None
            ),
        }
        for actor, avg in rows
    ]


@router.get("/actors/{actor_id}")
def get_actor(actor_id: int, db: Session = Depends(get_db)):
	actor = db.query(Actor).filter(Actor.id == actor_id).first()
	return actor


@router.get("/actorMovies/{actor_id}")
def get_actor_movies(actor_id: int, db: Session = Depends(get_db)):

	roles = (
		db.query(MovieRole)
		.filter(MovieRole.actor_id == actor_id)
		.all()
	)

	results = []

	for role in roles:
		avg = None

		if role.ratings:
			avg = sum(r.value for r in role.ratings) / len(role.ratings)

		results.append({
			"movie_id": role.movie.id,
			"title": role.movie.title,
			"role_id": role.id,
			"character_name": role.character_name,
			"avg_rating": avg,
		})

	return results

@router.get("/actorSeries/{actor_id}")
def get_actor_series(actor_id: int, db: Session = Depends(get_db)):
    roles = (
        db.query(SeriesRole)
        .filter(SeriesRole.actor_id == actor_id)
        .all()
    )

    results = []

    for role in roles:
        avg = None

        if role.ratings:
            avg = sum(r.value for r in role.ratings) / len(role.ratings)

        results.append({
            "series_id": role.series.id,
            "title": role.series.title,
            "role_id": role.id,
            "character_name": role.character_name,
            "avg_rating": avg,
        })

    return results
@router.get("/actorratings/{actor_id}")
def get_actor_ratings(actor_id: int, db: Session = Depends(get_db)):
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

@router.post("/actorReview")
def create_actor_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    user_id = int(review_data.user_id)

    existing = db.query(ActorRating).filter(
        ActorRating.user_id == user_id,
        ActorRating.actor_id == review_data.reviewed_id
    ).first()

    if existing:
        existing.value = review_data.value
        db.commit()
        db.refresh(existing)
        return existing

    actor_review = ActorRating(
        value=review_data.value,
        user_id=user_id,
        actor_id=review_data.reviewed_id,
    )

    db.add(actor_review)
    db.commit()
    db.refresh(actor_review)
    return actor_review


@router.post("/actors")
def create_actor(actor_data: ActorCreate, db: Session = Depends(get_db)):
	actor = Actor(
		name=actor_data.name,
		surname=actor_data.surname,
		date_of_birth=actor_data.date_of_birth,
	)
	db.add(actor)
	db.commit()
	db.refresh(actor)
	return actor

@router.delete("/actorRating/{rating_id}")
def delete_series_rating(rating_id: int, db: Session = Depends(get_db)):
    rating = db.query(ActorRating).filter(ActorRating.id == rating_id).first()

    if not rating:
        return {"error": "not found"}

    db.delete(rating)
    db.commit()

    return {}

