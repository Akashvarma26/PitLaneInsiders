# Importing required libraries
from fastapi import FastAPI,HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import  CORSMiddleware
from pydantic import BaseModel
import sqlite3 as sql
from utils.agent_workflow import run_agent_workflow  # Formula One Agentic AI system

#Login id with username:"test1", email:"test1@gmail.com", password:"test1123"
#Login id with username:"test0", email:"test0@gmail.com", password:"test0123"

# Pydantic classes for better data validation and ease to requests and responses
class LLM_Input(BaseModel):
    query:str
    session_id:str

class USER_DB(BaseModel):
    username:str
    email:str
    password:str

# Database utility function
def get_db_connection():
    return sql.connect("utils/user_db/login.db")

origins = [
    # frontends and other urls here (Working)
    "http://localhost:8001/mcp",
    "http://localhost:5500/",
    "http://localhost:5500",
    "http://127.0.0.1:5500/",
    "http://127.0.0.1:5500",
    "http://Akashvarma26.github.io/PitLaneInsiders",
]

# FastAPI app initialization
app = FastAPI(
    title="Pitlane Insiders",
    description="Website for Formula One fans!!!",
    version="0.2.0"
)

# Middleware of the backend to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# To add the new user to the db
@app.post("/signup")
def add_user(user_db: USER_DB):
    with get_db_connection() as conn:
        cursor = conn.cursor()

        try:
            cursor.execute("INSERT INTO USER (USERNAME, EMAIL, PASSWORD) VALUES (?, ?, ?)", (user_db.username,user_db.email,user_db.password))
            conn.commit()
            return "User has been added"

        except sql.IntegrityError:
            return "Username or Email already exists! Choose a another one!!!"

# To login the existing user and allow acess to the chatbot page
@app.post("/login")
def verify_login(user_db:USER_DB):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT PASSWORD FROM USER WHERE USERNAME = ? AND EMAIL = ?",(user_db.username, user_db.email))
        row = cursor.fetchone()

        if row is None:
            raise HTTPException(status_code=404, detail="User not found or email doesn't match")   
        db_password = row[0]
        if user_db.password != db_password:
            raise HTTPException(status_code=401, detail="Incorrect password")
        
        return {"message": f"Login successful. Welcome, {user_db.username}!"}

# To chat and conversate with Formula One Agentic AI system
@app.post("/chat")
async def chat_llm(llm_input: LLM_Input):
    async def stream_response():
        try:
            # Call your correct async generator
            async for chunk in run_agent_workflow(
                message=llm_input.query,
                session_id=llm_input.session_id
            ):
                yield chunk
        except Exception as e:
            print("Error in streaming:", e)
            yield "⚠️ Error while streaming response."

    return StreamingResponse(stream_response(), media_type="text/plain")