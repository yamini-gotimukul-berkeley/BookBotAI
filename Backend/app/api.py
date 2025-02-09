from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


books = [
    {
        "id": "1",
        "title": "Seven Effective habbits",
        "author": "Bill Will"
    },
    {
        "id": "2",
        "title": "Win Friends and Influence",
        "author": "Dale Carnie"
    }
]

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your Books list."}


@app.get("/books", tags=["books"])
async def get_books() -> dict:
    return { "data": books }

@app.post("/books", tags=["books"])
async def add_book(book: dict) -> dict:
    books.append(book)
    return { 
        "books": { "Book added." } 
    }

@app.post("/search-books", tags=["searchBooks"])
async def search_books(text: str) -> dict:
    return {
        "books": books
    }