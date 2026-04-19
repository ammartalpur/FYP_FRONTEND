# API Responses Data Storage

This directory contains automatically saved API responses from the chat analysis.

## File Structure

- **api-responses.json** - Contains all API responses in JSON format with timestamps

## Data Format

Each entry in the JSON file contains:
```json
{
  "timestamp": "2026-04-19T10:30:45.123Z",
  "request": {
    "student_answer": "...",
    "custom_question": "...",
    "custom_reference_answer": "..."
  },
  "response": {
    "analysis": "...",
    "score": "..."
  },
  "status": "success" | "error"
}
```

## How to Access

1. **View in Browser**: `http://localhost:3000/data/api-responses.json`
2. **Download**: Click the download button in the chat interface (when implemented)
3. **Auto-saved**: All API calls are automatically saved with timestamps

## Features

- ✅ Automatic saving on successful API responses
- ✅ Automatic error logging
- ✅ Timestamp for every entry
- ✅ Full request and response data preserved
- ✅ JSON format for easy parsing and analysis
