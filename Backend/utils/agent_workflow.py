# Importing required libraries and setting up API keys
from dotenv import load_dotenv
load_dotenv()
import os
from agno.agent import Agent
from agno.team import Team
from agno.models.openai import OpenAIChat
from agno.tools.googlesearch import GoogleSearchTools
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.wikipedia import WikipediaTools
from agno.tools.mcp import MCPTools
from agno.storage.sqlite import SqliteStorage

# Custom f1 mcp server url
server_url = "http://localhost:8000/agentmcp/mcp"

# Chat history storage
chat_storage = SqliteStorage(
    table_name="agent_sessions",
    db_file="Backend/utils/chat/msg.db"
)

# Formula One Agentic AI system using streamable http protocol
async def run_agent_workflow(message: str,session_id=str):
    async with MCPTools(
        url=server_url,
        transport="streamable-http",
        timeout_seconds=60
    ) as mcp_tools:

        # MCP Agent using mcp server
        mcp_agent = Agent(
            name="Race Data Agent",
            instructions=["You are expert in analyzing Formula 1 telemetry, lap data, pit stops, weather, Position changes during race and sessions data using internal tools. "
                          "Prioritize returning structured numerical data (e.g., lap times, pit durations, position changes), followed by a clear analysis. "
                          "Explain all numbers in context, and only use internal tools — do not speculate or fabricate values."],
            model=OpenAIChat(id="gpt-4.1-mini-2025-04-14", api_key=os.getenv("OPENAI_EMD_KEY")),
            tools=[mcp_tools],
            show_tool_calls=True,
            markdown=True,
        )

        # Web search agent for searching internet for current real time data
        web_search_agent = Agent(
            name="F1 Search Agent",
            instructions=["Search expert for Formula 1-related information. Use the most relevant tool (Google, DuckDuckGo, or Wikipedia) depending on the query. "
                          "Include the source URL in your answer, summarize key points, and avoid hallucinating when unsure."],
            tools=[GoogleSearchTools(), DuckDuckGoTools(), WikipediaTools()],
            model=OpenAIChat(id="gpt-4.1-mini-2025-04-14", api_key=os.getenv("OPENAI_EMD_KEY")),
            show_tool_calls=True,
            markdown=True
        )

        # Agentic Team for routing query to Web search agent or MCP agent for better efficient responses
        agent_team = Team(
            session_id=session_id,
            name="Formula One Agent",
            mode="route",
            instructions=["You are the 'PitLane Insiders chatbot' a Formula 1 QA AI Assistant which answers to Formula one questions only. "
                          "Route the user's request to the best expert agent (Race Data Agent or F1 Search Agent). "
                          "Provide detailed, clear answers with explanations and numbers if applicable. "],
            model=OpenAIChat(id="o4-mini-2025-04-16", api_key=os.getenv("OPENAI_EMD_KEY")),
            members=[web_search_agent, mcp_agent],
            show_tool_calls=True,
            markdown=True,
            show_members_responses=True,
            add_history_to_messages=True,
            storage=chat_storage
        )

        # Getting the response from the agent team
        run_response = await agent_team.arun(message, stream=True)
 
        # Extracting the content and yielding it
        if hasattr(run_response, "__aiter__"):
            async for chunk in run_response:
                if chunk and getattr(chunk, "content", None):
                    yield chunk.content

        else:
            content = getattr(run_response, "content", None)
            if content:
                yield content