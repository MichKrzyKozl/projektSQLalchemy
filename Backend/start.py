from datetime import date

from app.database import Base, SessionLocal, engine

from app.models.actor import Actor
from app.models.movie import Movie
from app.models.series import Series
from app.models.user import User

from app.models.movieRating import MovieRating
from app.models.seriesRating import SeriesRating
from app.models.actorRating import ActorRating
from app.models.MovieRoleRating import MovieRoleRating
from app.models.SeriesRoleRating import SeriesRoleRating

from app.models.MovieRole import MovieRole
from app.models.SeriesRole import SeriesRole
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# =========================
# USERS (10 zamiast 30)
# =========================

users = [
    User(name="John"),
    User(name="Alice"),
    User(name="Mike"),
    User(name="Emma"),
    User(name="David"),
    User(name="Sophia"),
    User(name="Chris"),
    User(name="Olivia"),
    User(name="Daniel"),
    User(name="Natalie"),
]

# =========================
# ACTORS (zostają, ale OK do testów)
# =========================

actors = [
    Actor(name="Leonardo", surname="DiCaprio", date_of_birth=date(1974, 11, 11)),
    Actor(name="Keanu", surname="Reeves", date_of_birth=date(1964, 9, 2)),
    Actor(name="Scarlett", surname="Johansson", date_of_birth=date(1984, 11, 22)),
    Actor(name="Robert", surname="Downey Jr.", date_of_birth=date(1965, 4, 4)),
    Actor(name="Tom", surname="Hanks", date_of_birth=date(1956, 7, 9)),
    Actor(name="Jennifer", surname="Lawrence", date_of_birth=date(1990, 8, 15)),
    Actor(name="Christian", surname="Bale", date_of_birth=date(1974, 1, 30)),
    Actor(name="Anne", surname="Hathaway", date_of_birth=date(1982, 11, 12)),
    Actor(name="Cillian", surname="Murphy", date_of_birth=date(1976, 5, 25)),
    Actor(name="Ryan", surname="Gosling", date_of_birth=date(1980, 11, 12)),
]

# =========================
# MOVIES (10)
# =========================

movies = [
    Movie(title="Inception", release_date=date(2010, 7, 16), runtime_minutes=148, category="Sci-Fi"),
    Movie(title="The Matrix", release_date=date(1999, 3, 31), runtime_minutes=136, category="Sci-Fi"),
    Movie(title="Interstellar", release_date=date(2014, 11, 7), runtime_minutes=169, category="Sci-Fi"),
    Movie(title="The Dark Knight", release_date=date(2008, 7, 18), runtime_minutes=152, category="Superhero"),
    Movie(title="Forrest Gump", release_date=date(1994, 7, 6), runtime_minutes=142, category="Drama"),
    Movie(title="Joker", release_date=date(2019, 10, 4), runtime_minutes=122, category="Drama"),
    Movie(title="La La Land", release_date=date(2016, 12, 9), runtime_minutes=128, category="Musical"),
    Movie(title="Dune", release_date=date(2021, 10, 22), runtime_minutes=155, category="Sci-Fi"),
    Movie(title="Fight Club", release_date=date(1999, 10, 15), runtime_minutes=139, category="Drama"),
    Movie(title="Oppenheimer", release_date=date(2023, 7, 21), runtime_minutes=180, category="Biography"),
]

# =========================
# SERIES (10)
# =========================

series = [
    Series(title="Stranger Things", release_date=date(2016, 7, 15), seasons=4, category="Sci-Fi"),
    Series(title="The Witcher", release_date=date(2019, 12, 20), seasons=3, category="Fantasy"),
    Series(title="Breaking Bad", release_date=date(2008, 1, 20), seasons=5, category="Crime"),
    Series(title="Sherlock", release_date=date(2010, 7, 25), seasons=4, category="Crime"),
    Series(title="The Boys", release_date=date(2019, 7, 26), seasons=4, category="Superhero"),
    Series(title="Dark", release_date=date(2017, 12, 1), seasons=3, category="Sci-Fi"),
    Series(title="Wednesday", release_date=date(2022, 11, 23), seasons=2, category="Fantasy"),
    Series(title="The Last of Us", release_date=date(2023, 1, 15), seasons=2, category="Drama"),
    Series(title="Peaky Blinders", release_date=date(2013, 9, 12), seasons=6, category="Crime"),
    Series(title="The Queen's Gambit", release_date=date(2020, 10, 23), seasons=1, category="Drama"),
]

# =========================
# INSERT BASE DATA
# =========================

db.add_all(users)
db.add_all(actors)
db.add_all(movies)
db.add_all(series)
db.commit()

# =========================
# MOVIE ROLES (bez spamowania)
# =========================

movie_roles = [
    # Inception
    MovieRole(character_name="Cobb", actor=actors[0], movie=movies[0]),
    MovieRole(character_name="Arthur", actor=actors[1], movie=movies[0]),
    MovieRole(character_name="Ariadne", actor=actors[2], movie=movies[0]),
    MovieRole(character_name="Eames", actor=actors[3], movie=movies[0]),

    # The Matrix
    MovieRole(character_name="Neo", actor=actors[1], movie=movies[1]),
    MovieRole(character_name="Morpheus", actor=actors[3], movie=movies[1]),
    MovieRole(character_name="Trinity", actor=actors[2], movie=movies[1]),
    MovieRole(character_name="Agent Smith", actor=actors[6], movie=movies[1]),

    # Interstellar
    MovieRole(character_name="Cooper", actor=actors[0], movie=movies[2]),
    MovieRole(character_name="Murph", actor=actors[4], movie=movies[2]),
    MovieRole(character_name="Brand", actor=actors[7], movie=movies[2]),
    MovieRole(character_name="Doyle", actor=actors[5], movie=movies[2]),

    # The Dark Knight
    MovieRole(character_name="Batman", actor=actors[6], movie=movies[3]),
    MovieRole(character_name="Joker", actor=actors[8], movie=movies[3]),
    MovieRole(character_name="Alfred", actor=actors[4], movie=movies[3]),
    MovieRole(character_name="Harvey Dent", actor=actors[3], movie=movies[3]),

    # Forrest Gump
    MovieRole(character_name="Forrest", actor=actors[4], movie=movies[4]),
    MovieRole(character_name="Jenny", actor=actors[2], movie=movies[4]),
    MovieRole(character_name="Lieutenant Dan", actor=actors[6], movie=movies[4]),
    MovieRole(character_name="Bubba", actor=actors[5], movie=movies[4]),

    # Joker
    MovieRole(character_name="Arthur Fleck", actor=actors[8], movie=movies[5]),
    MovieRole(character_name="Sophie", actor=actors[7], movie=movies[5]),
    MovieRole(character_name="Penny Fleck", actor=actors[4], movie=movies[5]),
    MovieRole(character_name="Murray Franklin", actor=actors[3], movie=movies[5]),

    # La La Land
    MovieRole(character_name="Mia", actor=actors[9], movie=movies[6]),
    MovieRole(character_name="Sebastian", actor=actors[7], movie=movies[6]),
    MovieRole(character_name="Keith", actor=actors[1], movie=movies[6]),

    # Dune
    MovieRole(character_name="Paul Atreides", actor=actors[2], movie=movies[7]),
    MovieRole(character_name="Chani", actor=actors[9], movie=movies[7]),
    MovieRole(character_name="Duke Leto", actor=actors[0], movie=movies[7]),
    MovieRole(character_name="Baron Harkonnen", actor=actors[8], movie=movies[7]),

    # Fight Club
    MovieRole(character_name="Narrator", actor=actors[0], movie=movies[8]),
    MovieRole(character_name="Tyler Durden", actor=actors[1], movie=movies[8]),
    MovieRole(character_name="Marla", actor=actors[7], movie=movies[8]),

    # Oppenheimer
    MovieRole(character_name="Oppenheimer", actor=actors[8], movie=movies[9]),
    MovieRole(character_name="Kitty Oppenheimer", actor=actors[7], movie=movies[9]),
    MovieRole(character_name="Strauss", actor=actors[3], movie=movies[9]),
    MovieRole(character_name="Groves", actor=actors[4], movie=movies[9]),
]

# =========================
# SERIES ROLES
# =========================

series_roles = [
    # Stranger Things
    SeriesRole(character_name="Eleven", actor=actors[2], series=series[0]),
    SeriesRole(character_name="Mike", actor=actors[1], series=series[0]),
    SeriesRole(character_name="Hopper", actor=actors[4], series=series[0]),

    # The Witcher
    SeriesRole(character_name="Geralt", actor=actors[6], series=series[1]),
    SeriesRole(character_name="Yennefer", actor=actors[7], series=series[1]),
    SeriesRole(character_name="Ciri", actor=actors[9], series=series[1]),

    # Breaking Bad
    SeriesRole(character_name="Walter White", actor=actors[0], series=series[2]),
    SeriesRole(character_name="Jesse Pinkman", actor=actors[1], series=series[2]),
    SeriesRole(character_name="Saul Goodman", actor=actors[3], series=series[2]),

    # Sherlock
    SeriesRole(character_name="Sherlock Holmes", actor=actors[1], series=series[3]),
    SeriesRole(character_name="John Watson", actor=actors[4], series=series[3]),
    SeriesRole(character_name="Moriarty", actor=actors[3], series=series[3]),

    # The Boys
    SeriesRole(character_name="Homelander", actor=actors[3], series=series[4]),
    SeriesRole(character_name="Butcher", actor=actors[6], series=series[4]),
    SeriesRole(character_name="Hughie", actor=actors[1], series=series[4]),

    # Dark
    SeriesRole(character_name="Jonas", actor=actors[7], series=series[5]),
    SeriesRole(character_name="Martha", actor=actors[2], series=series[5]),
    SeriesRole(character_name="Ulrich", actor=actors[4], series=series[5]),

    # Wednesday
    SeriesRole(character_name="Wednesday Addams", actor=actors[9], series=series[6]),
    SeriesRole(character_name="Enid", actor=actors[5], series=series[6]),
    SeriesRole(character_name="Tyler", actor=actors[3], series=series[6]),

    # The Last of Us
    SeriesRole(character_name="Joel", actor=actors[4], series=series[7]),
    SeriesRole(character_name="Ellie", actor=actors[2], series=series[7]),
    SeriesRole(character_name="Tess", actor=actors[7], series=series[7]),

    # Peaky Blinders
    SeriesRole(character_name="Thomas Shelby", actor=actors[6], series=series[8]),
    SeriesRole(character_name="Arthur Shelby", actor=actors[3], series=series[8]),
    SeriesRole(character_name="Polly Gray", actor=actors[7], series=series[8]),

    # Queen's Gambit
    SeriesRole(character_name="Beth Harmon", actor=actors[9], series=series[9]),
    SeriesRole(character_name="Benny Watts", actor=actors[1], series=series[9]),
    SeriesRole(character_name="Alma Wheatley", actor=actors[7], series=series[9]),
]
db.add_all(movie_roles)
db.add_all(series_roles)
db.commit()

# =========================
# RATINGS (bez mnożenia!)
# =========================

movie_ratings = [
    MovieRating(value=10, user=users[0], movie=movies[0]),
    MovieRating(value=9, user=users[1], movie=movies[1]),
    MovieRating(value=8, user=users[2], movie=movies[2]),
    MovieRating(value=10, user=users[3], movie=movies[3]),
    MovieRating(value=7, user=users[4], movie=movies[4]),
    MovieRating(value=9, user=users[5], movie=movies[5]),
    MovieRating(value=8, user=users[6], movie=movies[6]),
    MovieRating(value=10, user=users[7], movie=movies[7]),
    MovieRating(value=9, user=users[8], movie=movies[8]),
    MovieRating(value=10, user=users[9], movie=movies[9]),
]

series_ratings = [
    SeriesRating(value=9, user=users[0], series=series[0]),
    SeriesRating(value=8, user=users[1], series=series[1]),
    SeriesRating(value=10, user=users[2], series=series[2]),
    SeriesRating(value=9, user=users[3], series=series[3]),
    SeriesRating(value=10, user=users[4], series=series[4]),
    SeriesRating(value=8, user=users[5], series=series[5]),
    SeriesRating(value=9, user=users[6], series=series[6]),
    SeriesRating(value=10, user=users[7], series=series[7]),
    SeriesRating(value=9, user=users[8], series=series[8]),
    SeriesRating(value=8, user=users[9], series=series[9]),
]

db.add_all(movie_ratings)
db.add_all(series_ratings)

# =========================
# ACTOR RATINGS (lekki generator, ale bez spam ×5)
# =========================

actor_ratings = [
    ActorRating(value=(i % 5) + 6, user=users[i % len(users)], actor=actors[i % len(actors)])
    for i in range(20)
]
movie_role_ratings = []
series_role_ratings = []

# MOVIE ROLES
for i, role in enumerate(movie_roles):
    movie_role_ratings.append(
        MovieRoleRating(
            value=(i % 5) + 6,
            user=users[i % len(users)],
            role=role,
        )
    )

# SERIES ROLES
for i, role in enumerate(series_roles):
    series_role_ratings.append(
        SeriesRoleRating(
            value=(i % 5) + 6,
            user=users[(i + 3) % len(users)],
            role=role,
        )
    )

db.add_all(movie_role_ratings)
db.add_all(series_role_ratings)

db.add_all(actor_ratings)

db.commit()
db.close()

print("Pronto perfecto jest")