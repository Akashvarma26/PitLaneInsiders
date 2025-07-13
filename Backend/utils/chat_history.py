import sqlite3
import json
import pandas as pd

DB_PATH = "Backend/utils/chat/msg.db"
TABLE   = "agent_sessions"

def fetch_rows_from_db(session_id: str | None = None):
    query = f"SELECT * FROM {TABLE}"
    params = ()

    if session_id:
        query += " WHERE session_id = ?"
        params = (session_id,)

    with sqlite3.connect(DB_PATH) as conn:
        return conn.execute(query, params).fetchall()

def explode_runs(rows):
    messages = []

    for row in rows:
        session_id = row[0]
        raw_json   = row[2]  # third column contains JSON string

        try:
            runs = json.loads(raw_json).get("runs", [])
        except (TypeError, json.JSONDecodeError):
            continue

        for run in runs:
            for msg in run.get("messages", []):
                role    = msg.get("role")
                content = msg.get("content")

                # Skip 'system' role
                if role != "system":
                    messages.append({
                        "session_id": session_id,
                        "role": role,
                        "text": content
                    })

    df = pd.DataFrame(messages)
    df = df.drop_duplicates(subset=["session_id", "role", "text"]).reset_index(drop=True)
    return df

def get_chat_history_df(session_id: str | None = None) -> pd.DataFrame:
    rows = fetch_rows_from_db(session_id)
    df   = explode_runs(rows)
    if session_id:
        df = df[df["session_id"] == session_id].reset_index(drop=True)
    return df


def chat_df_to_string(df: pd.DataFrame) -> str:
    lines = []
    for _, row in df.iterrows():
        role = row["role"].capitalize()
        text = row["text"] or ""        # handle None
        lines.append(f"Role: {role} \n {text} \n")
    return "\n\n".join(lines)