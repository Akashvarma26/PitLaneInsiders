import sqlite3 as sql

conn = sql.connect("login.db")
cursor = conn.cursor()

cursor.execute("""INSERT INTO USER VALUES ("test1","test1@gmail.com","test1123")""")

print("Executed!!!")
conn.commit()
conn.close()