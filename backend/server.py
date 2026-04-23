from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routes import forms, responses

app = FastAPI()

#middleware for CORS
origins = [
    "http://localhost",
    "*", # Allow all origins (not recommended for production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(forms.router)
app.include_router(responses.router)