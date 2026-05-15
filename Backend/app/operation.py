from sqlalchemy import create_engine
from sqlalchemy import Engine
from sqlalchemy.orm import Session
from base import Base

class Operation:
    def __init__(self):
        self.engine: Engine = create_engine("sqlite:///library.db", echo=True)
        self.session: Session = Session(self.engine)
        Base.metadata.create_all(self.engine)