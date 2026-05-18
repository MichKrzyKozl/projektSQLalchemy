from datetime import date
from app.database import Base
from app.database import engine
from app.database import SessionLocal
from app.models import (
    Actor,
    ActorRating,
    Movie,
    MovieRating,
    MovieRole,
    MovieRoleRating,
    Series,
    SeriesRating,
    SeriesRole,
    SeriesRoleRating,
    User,
)


Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

users = [
    User(name="John"),
    User(name="Alice"),
    User(name="Mike"),
    User(name="Emma"),
    User(name="David"),
]

db.add_all(users)



actors = [
    Actor(
        name="Leonardo",
        surname="DiCaprio",
        date_of_birth=date(1974, 11, 11),
    ),
    Actor(
        name="Keanu",
        surname="Reeves",
        date_of_birth=date(1964, 9, 2),
    ),
    Actor(
        name="Scarlett",
        surname="Johansson",
        date_of_birth=date(1984, 11, 22),
    ),
    Actor(
        name="Robert",
        surname="Downey Jr.",
        date_of_birth=date(1965, 4, 4),
    ),
]

db.add_all(actors)

movies = [
    Movie(
        title="Inception",
        release_date=date(2010, 7, 16),
        runtime_minutes=148,
    ),
    Movie(
        title="The Matrix",
        release_date=date(1999, 3, 31),
        runtime_minutes=136,
    ),
    Movie(
        title="Avengers: Endgame",
        release_date=date(2019, 4, 26),
        runtime_minutes=181,
    ),
    Movie(
        title="Lucy",
        release_date=date(2014, 7, 25),
        runtime_minutes=89,
    ),
]

db.add_all(movies)

series = [
    Series(
        title="Stranger Things",
        release_date=date(2016, 7, 15),
        seasons=4,
    ),
    Series(
        title="The Witcher",
        release_date=date(2019, 12, 20),
        seasons=3,
    ),
    Series(
        title="Loki",
        release_date=date(2021, 6, 9),
        seasons=2,
    ),
    Series(
        title="Black Mirror",
        release_date=date(2011, 12, 4),
        seasons=5,
    ),
]

db.add_all(series)

db.commit()


movie_roles = [
    MovieRole(
        character_name="Dominick Cobb",
        actor=actors[0],
        movie=movies[0],
    ),
    MovieRole(
        character_name="Neo",
        actor=actors[1],
        movie=movies[1],
    ),
    MovieRole(
        character_name="Natasha Romanoff",
        actor=actors[2],
        movie=movies[2],
    ),
    MovieRole(
        character_name="Tony Stark",
        actor=actors[3],
        movie=movies[2],
    ),
]

series_roles = [
    SeriesRole(
        character_name="El",
        actor=actors[0],
        series=series[0],
    ),
    SeriesRole(
        character_name="Geralt",
        actor=actors[1],
        series=series[1],
    ),
    SeriesRole(
        character_name="Loki",
        actor=actors[3],
        series=series[2],
    ),
    SeriesRole(
        character_name="Yorkie",
        actor=actors[2],
        series=series[3],
    ),
]

db.add_all(movie_roles)

db.add_all(series_roles)

db.commit()


ratings = [
    MovieRating(value=10, user=users[0], movie=movies[0]),
    MovieRating(value=9, user=users[1], movie=movies[0]),
    MovieRating(value=8, user=users[2], movie=movies[1]),
    MovieRating(value=10, user=users[3], movie=movies[1]),
    MovieRating(value=7, user=users[4], movie=movies[2]),
    MovieRating(value=9, user=users[0], movie=movies[2]),
    MovieRating(value=8, user=users[1], movie=movies[3]),
    SeriesRating(value=9, user=users[0], series=series[0]),
    SeriesRating(value=8, user=users[1], series=series[1]),
    SeriesRating(value=7, user=users[2], series=series[2]),
    SeriesRating(value=10, user=users[3], series=series[3]),
]

actor_ratings = [
    ActorRating(value=9, user=users[0], actor=actors[0]),
    ActorRating(value=8, user=users[1], actor=actors[1]),
    ActorRating(value=10, user=users[2], actor=actors[2]),
    ActorRating(value=7, user=users[3], actor=actors[3]),
]

role_ratings = [
    MovieRoleRating(value=10, user=users[0], role=movie_roles[0]),
    MovieRoleRating(value=9, user=users[1], role=movie_roles[1]),
    SeriesRoleRating(value=8, user=users[2], role=series_roles[0]),
    SeriesRoleRating(value=9, user=users[3], role=series_roles[1]),
]

db.add_all(ratings)
db.add_all(actor_ratings)
db.add_all(role_ratings)

db.commit()

db.close()

print("działa kurwa jest git.")