from datetime import date

from app.database import Base
from app.database import SessionLocal
from app.database import engine
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

# =========================
# USERS
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
    User(name="Victor"),
    User(name="Mia"),
    User(name="Ethan"),
    User(name="Charlotte"),
    User(name="Lucas"),
    User(name="Amelia"),
    User(name="Noah"),
    User(name="Lily"),
    User(name="James"),
    User(name="Grace"),
    User(name="Aiden"),
    User(name="Harper"),
    User(name="Benjamin"),
    User(name="Ella"),
    User(name="Jack"),
    User(name="Scarlett"),
    User(name="Logan"),
    User(name="Victoria"),
    User(name="Samuel"),
    User(name="Hannah"),
]

# =========================
# ACTORS
# =========================

actors = [
    Actor(name="Leonardo", surname="DiCaprio", date_of_birth=date(1974, 11, 11)),
    Actor(name="Keanu", surname="Reeves", date_of_birth=date(1964, 9, 2)),
    Actor(name="Scarlett", surname="Johansson", date_of_birth=date(1984, 11, 22)),
    Actor(name="Robert", surname="Downey Jr.", date_of_birth=date(1965, 4, 4)),
    Actor(name="Tom", surname="Hanks", date_of_birth=date(1956, 7, 9)),
    Actor(name="Jennifer", surname="Lawrence", date_of_birth=date(1990, 8, 15)),
    Actor(name="Henry", surname="Cavill", date_of_birth=date(1983, 5, 5)),
    Actor(name="Bryan", surname="Cranston", date_of_birth=date(1956, 3, 7)),
    Actor(name="Chris", surname="Evans", date_of_birth=date(1981, 6, 13)),
    Actor(name="Margot", surname="Robbie", date_of_birth=date(1990, 7, 2)),
    Actor(name="Christian", surname="Bale", date_of_birth=date(1974, 1, 30)),
    Actor(name="Anne", surname="Hathaway", date_of_birth=date(1982, 11, 12)),
    Actor(name="Cillian", surname="Murphy", date_of_birth=date(1976, 5, 25)),
    Actor(name="Zendaya", surname="Coleman", date_of_birth=date(1996, 9, 1)),
    Actor(name="Pedro", surname="Pascal", date_of_birth=date(1975, 4, 2)),
    Actor(name="Millie Bobby", surname="Brown", date_of_birth=date(2004, 2, 19)),
    Actor(name="Ryan", surname="Gosling", date_of_birth=date(1980, 11, 12)),
    Actor(name="Emma", surname="Stone", date_of_birth=date(1988, 11, 6)),
    Actor(name="Joaquin", surname="Phoenix", date_of_birth=date(1974, 10, 28)),
    Actor(name="Natalie", surname="Portman", date_of_birth=date(1981, 6, 9)),
    Actor(name="Benedict", surname="Cumberbatch", date_of_birth=date(1976, 7, 19)),
    Actor(name="Florence", surname="Pugh", date_of_birth=date(1996, 1, 3)),
    Actor(name="Tom", surname="Holland", date_of_birth=date(1996, 6, 1)),
    Actor(name="Anya Taylor", surname="Joy", date_of_birth=date(1996, 4, 16)),
]

# =========================
# MOVIES
# =========================

movies = [
    Movie(title="Inception", release_date=date(2010, 7, 16), runtime_minutes=148, category="Sci-Fi"),
Movie(title="The Matrix", release_date=date(1999, 3, 31), runtime_minutes=136, category="Sci-Fi"),
Movie(title="Avengers: Endgame", release_date=date(2019, 4, 26), runtime_minutes=181, category="Superhero"),
Movie(title="Lucy", release_date=date(2014, 7, 25), runtime_minutes=89, category="Sci-Fi"),
Movie(title="Forrest Gump", release_date=date(1994, 7, 6), runtime_minutes=142, category="Drama"),
Movie(title="The Hunger Games", release_date=date(2012, 3, 23), runtime_minutes=142, category="Adventure"),
Movie(title="Man of Steel", release_date=date(2013, 6, 14), runtime_minutes=143, category="Superhero"),
Movie(title="Interstellar", release_date=date(2014, 11, 7), runtime_minutes=169, category="Sci-Fi"),
Movie(title="Oppenheimer", release_date=date(2023, 7, 21), runtime_minutes=180, category="Biography"),
Movie(title="Barbie", release_date=date(2023, 7, 21), runtime_minutes=114, category="Comedy"),
Movie(title="The Dark Knight", release_date=date(2008, 7, 18), runtime_minutes=152, category="Superhero"),
Movie(title="Interstellar 2", release_date=date(2026, 1, 1), runtime_minutes=175, category="Sci-Fi"),
Movie(title="Dune", release_date=date(2021, 10, 22), runtime_minutes=155, category="Sci-Fi"),
Movie(title="Dune: Part Two", release_date=date(2024, 3, 1), runtime_minutes=166, category="Sci-Fi"),
Movie(title="Fight Club", release_date=date(1999, 10, 15), runtime_minutes=139, category="Drama"),
Movie(title="The Prestige", release_date=date(2006, 10, 20), runtime_minutes=130, category="Thriller"),
Movie(title="La La Land", release_date=date(2016, 12, 9), runtime_minutes=128, category="Musical"),
Movie(title="Joker", release_date=date(2019, 10, 4), runtime_minutes=122, category="Drama"),
Movie(title="Black Swan", release_date=date(2010, 12, 17), runtime_minutes=108, category="Psychological Thriller"),
Movie(title="Doctor Strange", release_date=date(2016, 11, 4), runtime_minutes=115, category="Superhero"),
Movie(title="Spider-Man: No Way Home", release_date=date(2021, 12, 17), runtime_minutes=148, category="Superhero"),
Movie(title="Midsommar", release_date=date(2019, 7, 3), runtime_minutes=147, category="Horror"),
Movie(title="Drive", release_date=date(2011, 9, 16), runtime_minutes=100, category="Crime"),
Movie(title="The Queen's Gambit Movie", release_date=date(2025, 5, 1), runtime_minutes=140, category="Drama"),
]

# =========================
# SERIES
# =========================

series = [
    Series(title="Stranger Things", release_date=date(2016, 7, 15), seasons=4, category="Sci-Fi"),
    Series(title="The Witcher", release_date=date(2019, 12, 20), seasons=3, category="Fantasy"),
    Series(title="Loki", release_date=date(2021, 6, 9), seasons=2, category="Superhero"),
    Series(title="Black Mirror", release_date=date(2011, 12, 4), seasons=5, category="Sci-Fi"),
    Series(title="Breaking Bad", release_date=date(2008, 1, 20), seasons=5, category="Crime"),
    Series(title="Sherlock", release_date=date(2010, 7, 25), seasons=4, category="Crime"),
    Series(title="House of the Dragon", release_date=date(2022, 8, 21), seasons=2, category="Fantasy"),
    Series(title="The Last of Us", release_date=date(2023, 1, 15), seasons=2, category="Drama"),
    Series(title="Peaky Blinders", release_date=date(2013, 9, 12), seasons=6, category="Crime"),
    Series(title="Dark", release_date=date(2017, 12, 1), seasons=3, category="Sci-Fi"),
    Series(title="Wednesday", release_date=date(2022, 11, 23), seasons=2, category="Fantasy"),
    Series(title="The Boys", release_date=date(2019, 7, 26), seasons=4, category="Superhero"),
    Series(title="True Detective", release_date=date(2014, 1, 12), seasons=4, category="Crime"),
    Series(title="Euphoria", release_date=date(2019, 6, 16), seasons=2, category="Drama"),
    Series(title="The Queen's Gambit", release_date=date(2020, 10, 23), seasons=1, category="Drama"),
    Series(title="Moon Knight", release_date=date(2022, 3, 30), seasons=1, category="Superhero"),
    Series(title="Andor", release_date=date(2022, 9, 21), seasons=2, category="Sci-Fi"),
    Series(title="Arcane", release_date=date(2021, 11, 6), seasons=2, category="Fantasy"),
    Series(title="Severance", release_date=date(2022, 2, 18), seasons=2, category="Sci-Fi"),
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
# MOVIE ROLES
# =========================

movie_roles = [
    MovieRole(character_name="Dominick Cobb", actor=actors[0], movie=movies[0]),
    MovieRole(character_name="Neo", actor=actors[1], movie=movies[1]),
    MovieRole(character_name="Natasha Romanoff", actor=actors[2], movie=movies[2]),
    MovieRole(character_name="Tony Stark", actor=actors[3], movie=movies[2]),
    MovieRole(character_name="Forrest Gump", actor=actors[4], movie=movies[4]),
    MovieRole(character_name="Katniss Everdeen", actor=actors[5], movie=movies[5]),
    MovieRole(character_name="Clark Kent", actor=actors[6], movie=movies[6]),
    MovieRole(character_name="Cooper", actor=actors[0], movie=movies[7]),
    MovieRole(character_name="J. Robert Oppenheimer", actor=actors[12], movie=movies[8]),
    MovieRole(character_name="Barbie", actor=actors[9], movie=movies[9]),
    MovieRole(character_name="Bruce Wayne", actor=actors[10], movie=movies[10]),
    MovieRole(character_name="Brand", actor=actors[11], movie=movies[11]),
    MovieRole(character_name="Chani", actor=actors[13], movie=movies[12]),
    MovieRole(character_name="Tyler Durden", actor=actors[0], movie=movies[14]),
    MovieRole(character_name="Alfred Borden", actor=actors[10], movie=movies[15]),
    MovieRole(character_name="Sebastian", actor=actors[16], movie=movies[16]),
    MovieRole(character_name="Arthur Fleck", actor=actors[18], movie=movies[17]),
    MovieRole(character_name="Nina", actor=actors[19], movie=movies[18]),
    MovieRole(character_name="Stephen Strange", actor=actors[20], movie=movies[19]),
    MovieRole(character_name="Peter Parker", actor=actors[22], movie=movies[20]),
    MovieRole(character_name="Dani", actor=actors[21], movie=movies[21]),
    MovieRole(character_name="Driver", actor=actors[16], movie=movies[22]),
    MovieRole(character_name="Beth Harmon", actor=actors[23], movie=movies[23]),
]

# =========================
# SERIES ROLES
# =========================

series_roles = [
    SeriesRole(character_name="El", actor=actors[0], series=series[0]),
    SeriesRole(character_name="Geralt", actor=actors[6], series=series[1]),
    SeriesRole(character_name="Loki", actor=actors[3], series=series[2]),
    SeriesRole(character_name="Yorkie", actor=actors[2], series=series[3]),
    SeriesRole(character_name="Walter White", actor=actors[7], series=series[4]),
    SeriesRole(character_name="Sherlock Holmes", actor=actors[1], series=series[5]),
    SeriesRole(character_name="Joel", actor=actors[14], series=series[7]),
    SeriesRole(character_name="Thomas Shelby", actor=actors[12], series=series[8]),
    SeriesRole(character_name="Jonas", actor=actors[8], series=series[9]),
    SeriesRole(character_name="Wednesday Addams", actor=actors[15], series=series[10]),
    SeriesRole(character_name="Rue Bennett", actor=actors[13], series=series[13]),
    SeriesRole(character_name="Beth Harmon", actor=actors[23], series=series[14]),
    SeriesRole(character_name="Moon Knight", actor=actors[18], series=series[15]),
    SeriesRole(character_name="Cassian Andor", actor=actors[14], series=series[16]),
    SeriesRole(character_name="Jinx", actor=actors[17], series=series[17]),
    SeriesRole(character_name="Mark Scout", actor=actors[20], series=series[18]),
]

db.add_all(movie_roles)
db.add_all(series_roles)

db.commit()

# =========================
# RATINGS
# =========================

ratings = [
    MovieRating(value=10, user=users[0], movie=movies[0]),
    MovieRating(value=9, user=users[1], movie=movies[1]),
    MovieRating(value=8, user=users[2], movie=movies[2]),
    MovieRating(value=10, user=users[3], movie=movies[3]),
    MovieRating(value=9, user=users[4], movie=movies[4]),
    MovieRating(value=8, user=users[5], movie=movies[5]),
    MovieRating(value=7, user=users[6], movie=movies[6]),
    MovieRating(value=10, user=users[7], movie=movies[7]),
    MovieRating(value=9, user=users[8], movie=movies[8]),
    MovieRating(value=10, user=users[9], movie=movies[9]),
    MovieRating(value=9, user=users[10], movie=movies[10]),
    MovieRating(value=8, user=users[11], movie=movies[11]),
    MovieRating(value=10, user=users[12], movie=movies[12]),
    MovieRating(value=9, user=users[13], movie=movies[13]),
    MovieRating(value=8, user=users[14], movie=movies[14]),
    MovieRating(value=10, user=users[15], movie=movies[15]),
    MovieRating(value=9, user=users[16], movie=movies[16]),
    MovieRating(value=10, user=users[17], movie=movies[17]),
    MovieRating(value=8, user=users[18], movie=movies[18]),
    MovieRating(value=9, user=users[19], movie=movies[19]),
    MovieRating(value=10, user=users[20], movie=movies[20]),
    MovieRating(value=9, user=users[21], movie=movies[21]),
    MovieRating(value=8, user=users[22], movie=movies[22]),
    MovieRating(value=10, user=users[23], movie=movies[23]),

    SeriesRating(value=9, user=users[0], series=series[0]),
    SeriesRating(value=8, user=users[1], series=series[1]),
    SeriesRating(value=10, user=users[2], series=series[2]),
    SeriesRating(value=9, user=users[3], series=series[3]),
    SeriesRating(value=10, user=users[4], series=series[4]),
    SeriesRating(value=9, user=users[5], series=series[5]),
    SeriesRating(value=8, user=users[6], series=series[6]),
    SeriesRating(value=10, user=users[7], series=series[7]),
    SeriesRating(value=9, user=users[8], series=series[8]),
    SeriesRating(value=8, user=users[9], series=series[9]),
    SeriesRating(value=10, user=users[10], series=series[10]),
    SeriesRating(value=9, user=users[11], series=series[11]),
    SeriesRating(value=8, user=users[12], series=series[12]),
    SeriesRating(value=10, user=users[13], series=series[13]),
    SeriesRating(value=9, user=users[14], series=series[14]),
    SeriesRating(value=8, user=users[15], series=series[15]),
    SeriesRating(value=10, user=users[16], series=series[16]),
    SeriesRating(value=9, user=users[17], series=series[17]),
    SeriesRating(value=8, user=users[18], series=series[18]),
]

actor_ratings = [
    ActorRating(value=(i % 3) + 8, user=users[i], actor=actors[i % len(actors)])
    for i in range(24)
]

movie_role_ratings = [
    MovieRoleRating(value=(i % 3) + 8, user=users[i], role=movie_roles[i % len(movie_roles)])
    for i in range(20)
]

series_role_ratings = [
    SeriesRoleRating(value=(i % 3) + 8, user=users[i], role=series_roles[i % len(series_roles)])
    for i in range(16)
]

ratings = ratings * 5
actor_ratings = actor_ratings * 5
movie_role_ratings = movie_role_ratings * 5
series_role_ratings = series_role_ratings * 5

db.add_all(ratings)
db.add_all(actor_ratings)
db.add_all(movie_role_ratings)
db.add_all(series_role_ratings)
# =========================
# EXTRA TEST ROLES (first 5 movies -> 8 actors each)
# =========================

extra_movie_roles = [
    # Inception
    MovieRole(character_name="Arthur", actor=actors[1], movie=movies[0]),              # Keanu Reeves
    MovieRole(character_name="Ariadne", actor=actors[2], movie=movies[0]),             # Scarlett Johansson
    MovieRole(character_name="Eames", actor=actors[3], movie=movies[0]),               # Robert Downey Jr.
    MovieRole(character_name="Saito", actor=actors[10], movie=movies[0]),              # Christian Bale
    MovieRole(character_name="Robert Fischer", actor=actors[12], movie=movies[0]),     # Cillian Murphy
    MovieRole(character_name="Mal", actor=actors[11], movie=movies[0]),                # Anne Hathaway
    MovieRole(character_name="Yusuf", actor=actors[17], movie=movies[0]),              # Emma Stone

    # The Matrix
    MovieRole(character_name="Morpheus", actor=actors[3], movie=movies[1]),
    MovieRole(character_name="Trinity", actor=actors[2], movie=movies[1]),
    MovieRole(character_name="Agent Smith", actor=actors[10], movie=movies[1]),
    MovieRole(character_name="Oracle", actor=actors[11], movie=movies[1]),
    MovieRole(character_name="Cypher", actor=actors[12], movie=movies[1]),
    MovieRole(character_name="Tank", actor=actors[8], movie=movies[1]),
    MovieRole(character_name="Dozer", actor=actors[16], movie=movies[1]),

    # Avengers: Endgame (already has 2)
    MovieRole(character_name="Steve Rogers", actor=actors[8], movie=movies[2]),
    MovieRole(character_name="Thor", actor=actors[6], movie=movies[2]),
    MovieRole(character_name="Doctor Strange", actor=actors[20], movie=movies[2]),
    MovieRole(character_name="Spider-Man", actor=actors[22], movie=movies[2]),
    MovieRole(character_name="Captain Marvel", actor=actors[5], movie=movies[2]),
    MovieRole(character_name="Hulk", actor=actors[7], movie=movies[2]),

    # Lucy
    MovieRole(character_name="Pierre Del Rio", actor=actors[14], movie=movies[3]),
    MovieRole(character_name="Professor Norman", actor=actors[4], movie=movies[3]),
    MovieRole(character_name="Richard", actor=actors[8], movie=movies[3]),
    MovieRole(character_name="Jang", actor=actors[10], movie=movies[3]),
    MovieRole(character_name="French Agent", actor=actors[1], movie=movies[3]),
    MovieRole(character_name="Scientist", actor=actors[20], movie=movies[3]),
    MovieRole(character_name="Doctor", actor=actors[11], movie=movies[3]),

    # Forrest Gump
    MovieRole(character_name="Jenny Curran", actor=actors[17], movie=movies[4]),
    MovieRole(character_name="Lieutenant Dan", actor=actors[10], movie=movies[4]),
    MovieRole(character_name="Bubba", actor=actors[7], movie=movies[4]),
    MovieRole(character_name="Mrs. Gump", actor=actors[11], movie=movies[4]),
    MovieRole(character_name="Young Forrest", actor=actors[23], movie=movies[4]),
    MovieRole(character_name="Football Coach", actor=actors[3], movie=movies[4]),
    MovieRole(character_name="President", actor=actors[12], movie=movies[4]),
]

db.add_all(extra_movie_roles)

# =========================
# EXTRA MOVIE ROLE RATINGS (reviews for extra_movie_roles)
# =========================

extra_movie_role_ratings = [
    MovieRoleRating(
        value=(i % 10), 
        user=users[i % len(users)],
        role=extra_movie_roles[i % len(extra_movie_roles)],
    )
    for i in range(35)
]

db.add_all(extra_movie_role_ratings)

db.commit()
db.close()

print("jest kurwa git ")
