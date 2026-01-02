from fastapi import FastAPI
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from database import users_collection
from fastapi import HTTPException
from security import hash_password,get_current_user,verify_password
from jwt_utils import create_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

security = HTTPBearer()


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

class LoginRequest(BaseModel):
    email: str
    password: str

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
        ):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, "123456", algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/register")
def register_user(data: RegisterRequest):
    existing_user = users_collection.find_one({"email": data.email})
    print("Register hit api")

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(data.password)
    print("Hash:", hashed_password) 
     # 🔐 Debug: print hashed password
    users_collection.insert_one({
        "name": data.name,
        "email": data.email,
        "password": hashed_password,  # 🔐 hashed now
        "role": data.role
    })

    return {"message": "User registered successfully"}

@app.post("/login")
def login_user(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({
        "sub": user["email"],
        "role": user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@app.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {
        "message": "You accessed a protected route",
        "user": user
    }

@app.post("/events")
def create_event(event: dict, user=Depends(get_current_user)):
    if user["role"] != "startup":
        raise HTTPException(status_code=403, detail="Only startups can create events")

    events_collection.insert_one({
        **event,
        "created_by": user["email"]
    })

    return {"message": "Event created successfully"}
