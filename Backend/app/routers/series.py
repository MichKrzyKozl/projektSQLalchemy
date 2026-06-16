from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.series import Series
from app.models.seriesRating import SeriesRating
from app.models.SeriesRole import SeriesRole
from app.models.SeriesRoleRating import SeriesRoleRating
from app.models.actor import Actor
from app.schemas.review import ReviewCreate
from app.schemas.series_create import SeriesCreate
from app.schemas.series_role_create import SeriesRoleCreate

router = APIRouter()


@router.get("/series")
def get_series(category=None, sort=None, db: Session = Depends(get_db)):
    query = (
        db.query(
            Series,
            func.avg(SeriesRating.value).label("avg_rating")
        )
        .outerjoin(SeriesRating, SeriesRating.series_id == Series.id)
        .group_by(Series.id)
    )
    if category:
        query = query.filter(Series.category == category)
    if sort == "asc":
        query = query.order_by(func.avg(SeriesRating.value).asc())
    elif sort == "desc":
        query = query.order_by(func.avg(SeriesRating.value).desc())
    rows = query.all()    
    formatted_series = []
    for series, avg in rows:        
        end = {
            "id": series.id,
            "title": series.title,
            "category": series.category,
            "release_date": series.release_date,
            "seasons": series.seasons,  
			"avg_rating": float(avg) if avg is not None else None,		
        }
        formatted_series.append(end)

    return formatted_series


@router.get("/series/asc")
def get_series_asc(category=None, db: Session = Depends(get_db)):
    return get_series(category=category, sort="asc", db=db)


@router.get("/series/desc")
def get_series_desc(category=None, db: Session = Depends(get_db)):
    return get_series(category=category, sort="desc", db=db)


@router.get("/series/{series_id}")
def get_series_item(series_id: int, db: Session = Depends(get_db)):
    series = db.query(Series).filter(Series.id == series_id).first()
    return series


@router.get("/seriesroles/{series_id}")
def get_series_roles(series_id: int, db: Session = Depends(get_db)):
    roles = db.query(SeriesRole).filter(SeriesRole.series_id == series_id).all()
    return roles


@router.get("/seriesactors/{series_id}")
def get_series_role_actors(series_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Actor)
        .join(SeriesRole)
        .filter(
            SeriesRole.series_id == series_id
        )
        .all()
    )


@router.get("/seriesratings/{series_id}")
def get_series_ratings(series_id: int, db: Session = Depends(get_db)):
    ratings = db.query(SeriesRating).filter(SeriesRating.series_id == series_id).all()
    return ratings


@router.post("/seriesReview")
def create_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    user_id = int(review_data.user_id)
    series_review = SeriesRating(
        value=review_data.value,
        user_id=user_id,
        series_id=review_data.reviewed_id,
    )
    db.add(series_review)
    db.commit()
    db.refresh(series_review)
    return series_review


@router.post("/seriesRoleReview")
def create_series_role_review(review_data: ReviewCreate, db: Session = Depends(get_db)):
    user_id = int(review_data.user_id)
    role_review = SeriesRoleRating(
        value=review_data.value,
        user_id=user_id,
        role_id=review_data.reviewed_id,
    )
    db.add(role_review)
    db.commit()
    db.refresh(role_review)
    return role_review


@router.post("/series")
def create_series(series_data: SeriesCreate, db: Session = Depends(get_db)):
    series = Series(
        title=series_data.title,
        category=series_data.category,
        release_date=series_data.release_date,
        seasons=series_data.seasons,
    )
    db.add(series)
    db.commit()
    db.refresh(series)
    return series


@router.get("/seriesroleratings/{role_id}")
def get_role_ratings(role_id: int, db: Session = Depends(get_db)):
    ratings = db.query(SeriesRoleRating).filter(SeriesRoleRating.role_id == role_id).all()
    return ratings


@router.post("/seriesroles")
def create_series_role(role_data: SeriesRoleCreate, db: Session = Depends(get_db)):
    role = SeriesRole(
        character_name=role_data.character_name,
        actor_id=role_data.actor_id,
        series_id=role_data.series_id,
    )
    db.add(role)
    db.commit()
    db.refresh(role)
    return role
