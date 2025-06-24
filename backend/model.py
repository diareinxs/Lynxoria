from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DataItem(Base):
    __tablename__ = "your_table_name"  # Replace with your actual table name

    id = Column(Integer, primary_key=True, index=True)
    column1 = Column(String)
    column2 = Column(String)