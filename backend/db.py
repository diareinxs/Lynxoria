import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pyodbc

# Database Configuration (moved here)
SERVER = os.environ.get("DB_SERVER") or 'your_server_name'
DATABASE = os.environ.get("DB_NAME") or 'your_database_name'
USERNAME = os.environ.get("DB_USER") or 'your_username'
PASSWORD = os.environ.get("DB_PASSWORD") or 'your_password'
DRIVER = '{ODBC Driver 17 for SQL Server}'

DATABASE_URL = f"mssql+pyodbc://{USERNAME}:{PASSWORD}@{SERVER}/{DATABASE}?driver={DRIVER}"

engine = create_engine(DATABASE_URL)

Base = declarative_base()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()