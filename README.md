# 🏎️ PitLane Insiders

Box! Box! Get Your F1 Insider Info!

Welcome to **PitLane Insiders**, a comprehensive Formula 1 (F1) website designed to engage and inform F1 enthusiasts. This project provides detailed information about F1 teams, drivers, current standings, and interactive features like a quiz, a Multi Agentic AI chatbot and a discord bot.

## 📖 Table of Contents

- [Introduction](#-introduction)
- [Objectives](#-objectives)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)

## 👋 Introduction

**PitLane Insiders** is a web application that serves as a one-stop platform for all things related to Formula 1. It provides users with up-to-date information on teams, drivers, and standings, along with interactive features such as a quiz, a real time internet access chatbot and a discord bot which you can invite in your discord server.

## 🎯 Objectives

- Provide an engaging and informative platform for F1 fans.
- Offer up-to-date information on F1 teams, drivers, and current standings.
- Create an interactive quiz to test users' knowledge of F1.
- Develop a chatbot for users to get information that is available in real time internet.
- Develop a Discord bot for discord users to interact with. 
- Ensure a seamless and user-friendly experience across all devices.

## 📙 Features

- **Home Page:** A brief introduction to Formula 1, its history, and significance.
- **Teams Page:** Detailed information about different F1 teams, their history and achievements. 
- **Drivers Page:** Profiles of current drivers, including their statistics and current points.
- **Quiz Page:** An interactive quiz to test users' knowledge about F1.
- **Chatbot Page:** A chatbot which has access to internet using google, duck duck go and wikipedia search. The chatbot also uses custom built MCP tools to get detailed data which is not easily available in internet.
- **Discord bot link:** A discord bot which manages your server, assigns roles and does other cool things.
- **Login page:** A login page which verifies the user through sql database and provides access to chatbot page.
- **Signup page:** Signing up page for accessing chatbot page.


## 🌐 Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - Bootstrap
  - JavaScript
- **Backend:**
  - FastAPI (Python)
  - Model Context Protocol server
- **Database:**
  - SQL
- **Discord bot**
  - Discord-py

## 📁 Project Structure
```
PitLaneInsiders/
├── .env
├── .gitignore
├── .python-version
├── pyproject.toml
├── requirements.txt
├── uv.lock
├── README.md
│
├──docs/
│   ├── chatbot.html
│   ├── drivers.html
│   ├── index.html
│   ├── login.html
│   ├── quiz.html
│   ├── signup.html
│   ├── teams.html
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   └── pitlane_logo.png
│   │   └── videos/
│   │       └── vid_f1_2.mp4
│   │
│   ├── css/
│   │   ├── bootstrap/
│   │   ├── fonts/
│   │   ├── scss/
│   │   │   ├── bootstrap/
│   │   │   └── style.scss
│   │   ├── style.css
│   │   ├── gen_style.css
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap.min.css.map
│   │   ├── style_drivers/
│   │   └── style_quiz/
│   │
│   └── js/
│       ├── bootstrap.min.js
│       ├── jquery-3.3.1.min.js
│       └── popper.min.js
│   
├── Backend/
│   ├── app.py
│   ├── client.py
│   │
│   ├── mcp_server/
│   │   ├── cache/
│   │   ├── __pycache__/
│   │   ├── mcp_config.json
│   │   └── mcp_f1.py
│   │
│   └── utils/
│       ├── __init__.py
│       ├── agent_workflow.py
│       │
│       ├── chat/
│       │   └── msg.db
│       │
│       └── user_db/
│           ├── dbmaker.py
│           ├── login.db
│           └── valueinsert.py
|   
└── Discord_bot/
    ├── __pycache__/
    ├── logs/
    ├── .env
    ├── banned_words.txt
    ├── keep_alive.py
    └── main.py

```

## 📋 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amanparasher/PitLaneInsiders.git
   cd PitLaneInsiders
   ```

2. **Set up a environments and Databases:**
   Using dbmaker.py and valueinsert.py, create the login.db file. In .env file store OpenAI api key from openai platform.

3. **Install the required packages in virtual Environment:**

   ```python
   pip install -r requirements.txt
   ```
   or
   ```uv
   uv add [python-packages]
   ```

4. **Run the backend application:**    
 For MCP Server:
   ```python
   python mcp_f1.py
   ```
   or 
   ```uv
   uv run mcp_f1.py
   ```

   For FastAPI"
      ```python
      uvicorn app:app --reload
      ```
   
   For frontend, Do not use live server. Instead use this command
   ```python
   python -m http.server 5500
   ```

5. **Access the application in your browser:**

   ```
   http://localhost:5500/docs/index.html
   ```

## 👍 Usage

- Navigate to different pages to explore information about F1 teams, drivers, and current standings, etc.
- Participate in the quiz to test your F1 knowledge.
- Use the chatbot to access telemetry data, weather updates, and pit stop information. You can also use it to search for the latest Formula 1 news or explore legendary drivers from F1 history.
- Invite discord bot to your discord server.

Enjoy exploring the world of Formula 1 with **PitLane Insiders**!