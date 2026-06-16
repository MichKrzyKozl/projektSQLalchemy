from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate

router = APIRouter()


@router.get("/users")
def get_users(db: Session = Depends(get_db)):
	users = db.query(User).all()
	return users

@router.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
	user = db.query(User).filter(User.id == user_id).first()
	return user


@router.post("/users")
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
	user = User(name=user_data.name)
	db.add(user)
	db.commit()
	db.refresh(user)
	return user


