from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from database import users_collection
from fastapi import HTTPException

app = FastAPI()

# 🔴 CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/register")
def register_user(data: RegisterRequest):
    existing_user = users_collection.find_one({"email": data.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = {
        "name": data.name,
        "email": data.email,
        "password": data.password,  # ⚠️ plain text for now
        "role": data.role
    }

    users_collection.insert_one(user)

    return {"message": "User registered successfully"}

