# Todo API Backend

A RESTful API backend for the Todo application built with Flask and SQLAlchemy.

## Features

- RESTful API endpoints for CRUD operations
- SQLite database with SQLAlchemy ORM
- Type hints for better code quality
- Error handling and logging
- CORS support for frontend integration
- Database migrations with Flask-Migrate

## Prerequisites

- Python 3.8+
- pip

## Installation

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```bash
flask db upgrade
```

## Configuration

The application can be configured through environment variables:
- `SECRET_KEY`: Application secret key (defaults to 'dev-secret-key')
- `DATABASE_URL`: Database connection URL (defaults to SQLite)
- `FLASK_ENV`: Environment (development/production)

See configuration details in:
```python:todo-api/app/config.py
startLine: 1
endLine: 7
```

## Database Model

The Todo model includes:
- Title (required)
- Description (optional)
- Completion status
- Creation timestamp
- Update timestamp

See model implementation in:
```python:todo-api/app/models.py
startLine: 5
endLine: 23
```

## API Endpoints

### GET /api/v1/todos
- Retrieves all todos
- Returns: Array of todo objects
- Status codes: 200 (Success), 500 (Server Error)

### POST /api/v1/todos
- Creates a new todo
- Required fields: title
- Optional fields: description, completed
- Status codes: 201 (Created), 400 (Bad Request), 500 (Server Error)

### PUT /api/v1/todos/<id>
- Updates a specific todo
- Parameters: id (todo ID)
- Fields: title, description, completed
- Status codes: 200 (Success), 404 (Not Found), 500 (Server Error)

### DELETE /api/v1/todos/<id>
- Deletes a specific todo
- Parameters: id (todo ID)
- Status codes: 200 (Success), 404 (Not Found), 500 (Server Error)

## Running the Application

Development mode:
```bash
python run.py
```

The API will be available at `http://localhost:5000`

## Logging

The application logs to:
- Console (INFO level)
- app.log file (INFO level)

Log format includes:
- Timestamp
- Logger name
- Log level
- Message

## Error Handling

Global error handlers for:
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

All errors return JSON responses with error messages.

## Development

1. Make code changes
2. Create database migrations:
```bash
flask db migrate -m "Description of changes"
flask db upgrade
```

## Testing

Run tests with pytest:
```bash
pytest
```

## Production Deployment

For production:
1. Set proper environment variables
2. Use a production-grade WSGI server (e.g., Gunicorn)
3. Configure proper database URL
4. Set up proper logging
5. Disable debug mode

## License

MIT License
```
