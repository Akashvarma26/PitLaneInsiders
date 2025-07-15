# Importing required libraries
from fastapi import FastAPI,HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import  CORSMiddleware
from pydantic import BaseModel
import sqlite3 as sql
import os
import contextlib
from Backend.utils.agent_workflow import run_agent_workflow  # Multi - Agentic AI system (PitLane Insider Chatbot)
from Backend.utils.news import get_all_f1_articles
from Backend.utils.chat_history import get_chat_history_df,chat_df_to_string
from Backend.mcp_server.mcp_f1 import server as mcp_server

# Backend port
PORT=os.environ.get("PORT",8000)

# Lifespan for connecting mcp server to FastAPI
@contextlib.asynccontextmanager
async def lifespan_mcp(app:FastAPI):
    async with contextlib.AsyncExitStack() as stack:
        await stack.enter_async_context(mcp_server.session_manager.run())
        yield

# Pydantic classes for better data validation and ease to requests and responses
class LLM_Input(BaseModel):
    query:str
    session_id:str

class CHAT_HISTORY(BaseModel):
    session_id:str

class USER_DB(BaseModel):
    username:str
    email:str
    password:str

# Database utility function
def get_db_connection():
    return sql.connect("Backend/utils/user_db/login.db")

origins = [
    # frontends urls here
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://www.pitlaneinsiders.site",
    "https://pitlaneinsiders.site"
]

# FastAPI app initialization
app = FastAPI(
    title="Pitlane Insiders Backend",
    description="Website for Formula One community!!!",
    version="0.7.0",
    lifespan=lifespan_mcp
)

app.mount("/agentmcp",mcp_server.streamable_http_app())

# Middleware of the backend to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root path
@app.get("/")
def root():
    print("Pinged!")
    return {"message": "Service alive"}


# To display real time news data in the frontend
@app.get("/news")
def get_news():
    return get_all_f1_articles()

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

# To display the chat history based on session id
@app.post("/chathistory")
def chat_history(session: CHAT_HISTORY):
    session_id=session.session_id
    df=get_chat_history_df(session_id=session_id)
    history=chat_df_to_string(df)
    chat_html = history.replace("\n", "<br>")
    return chat_html

# To chat and conversate with Formula One Agentic AI system
@app.post("/chat")
async def chat_llm(llm_input: LLM_Input):
    async def stream_response():
        yielded = False
        try:
            async for chunk in run_agent_workflow(
                message=llm_input.query,
                session_id=llm_input.session_id
            ):
                if chunk:
                    yield chunk
                    yielded = True
        except Exception as e:
            print("❌ Error during chat stream:", str(e))
            yield "⚠️ Error while generating response from AI agent."
            return

        if not yielded:
            yield "⚠️ No response from PitLane Insiders bot."

    return StreamingResponse(stream_response(), media_type="text/plain")

# To run the app
if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=PORT)