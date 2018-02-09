import sqlite3
import json

DB_NAME = "dev.db"

def save_conatct(contact):
    with sqlite3.connect(DB_NAME) as con:
        con.execute("INSERT INTO contacts (name, category, email, phone) VALUES(?,?,?,?)", \
            [contact.name, contact.group, contact.email, contact.phone])

def fetch_all():
    '''Fetching all the records from db table'''
    with sqlite3.connect(DB_NAME) as con:
        con.row_factory = sqlite3.Row
        query = con.execute("SELECT * FROM contacts")
        rows = query.fetchall()
        return [dict(row) for row in rows]

def setup_database():
    '''Create the 'contacts' table in the database on server startup'''
    with sqlite3.connect(DB_NAME) as con:
        con.execute("""CREATE TABLE IF NOT EXISTS contacts
        (id integer PRIMARY KEY,
        name text NOT NULL,
        category text,
        email text,
        phone text);""")

def cleanup_database():
    '''Drop the database on server stop'''
    with sqlite3.connect(DB_NAME) as con:
        con.execute("DROP TABLE contacts")