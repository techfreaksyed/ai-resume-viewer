from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

import os
import uuid

app = FastAPI()

# Define the origins that are allowed to make requests
# In a development environment, you might allow localhost:4200 for Angular
# In production, this should be your actual frontend domain(s)
origins = [
    "http://localhost:4200",  # Your Angular app's address
    "http://localhost:8000",  # Your FastAPI app's address (sometimes needed if frontend serves static files from root)
    "http://127.0.0.1:4200",  # Common alternative for localhost
    # Add your production frontend URL(s) here when deploying
    # "https://your-production-angular-app.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of origins that are allowed to make requests
    allow_credentials=True, # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],    # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Allow all headers (Content-Type, Authorization, X-Requested-With, etc.)
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_ext = os.path.splitext(file.filename)[1]
    saved_filename = f"{file_id}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, saved_filename)

    with open(file_path, "wb") as f:
        contents = await file.read()
        f.write(contents)

    file_url = f"http://localhost:8000/uploads/{saved_filename}"

    return JSONResponse({
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents),
        "url": file_url
    })
