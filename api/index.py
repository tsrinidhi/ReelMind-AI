import sys
import os

# Add the backend folder to the python path so absolute imports work
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.main import app
