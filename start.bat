@echo off

start cmd /k "cd Backend && .\venv\Scripts\activate && uvicorn app.main:app --reload"

start cmd /k "cd frontend && npm run dev"