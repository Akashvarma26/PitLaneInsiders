import sqlite3 as sql

conn = sql.connect("login.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS USER (
    USERNAME TEXT UNIQUE,
    EMAIL TEXT UNIQUE,
    PASSWORD TEXT
)
""")

print("Executed!!!")
conn.commit()
conn.close()