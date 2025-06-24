import os
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import pyodbc
from sqlalchemy.exc import SQLAlchemyError
from .database import get_db, Base
from .models import DataItem  # Import the DataItem model

# Database Configuration (Use environment variables)
SERVER = os.environ.get("DB_SERVER") or 'your_server_name'
DATABASE = os.environ.get("DB_NAME") or 'your_database_name'
USERNAME = os.environ.get("DB_USER") or 'your_username'
PASSWORD = os.environ.get("DB_PASSWORD") or 'your_password'
DRIVER = '{ODBC Driver 17 for SQL Server}'

DATABASE_URL = f"mssql+pyodbc://{USERNAME}:{PASSWORD}@{SERVER}/{DATABASE}?driver={DRIVER}"

engine = create_engine(DATABASE_URL)

Base.metadata.create_all(bind=engine)  # Create tables if they don't exist

app = FastAPI()


# Request Model
class DataCreate(BaseModel):
    column1: str
    column2: str


# Endpoints
@app.get("/api/data")
def read_data(db: Session = Depends(get_db)):
    try:
        items = db.query(DataItem).all()
        return items
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.post("/api/data")
def create_data(data: DataCreate, db: Session = Depends(get_db)):
    try:
        db_item = DataItem(**data.dict())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    except SQLAlchemyError as e:
        db.rollback()  # Rollback the transaction on error
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")