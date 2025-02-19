from flask import Blueprint, request, jsonify, abort
from app.models import Todo
from app import db
import logging
from typing import Dict, Any, List
from sqlalchemy.exc import SQLAlchemyError

bp = Blueprint('main', __name__)
logger = logging.getLogger(__name__)

@bp.route('/todos', methods=['POST'])
def create_todo() -> tuple[Dict[str, Any], int]:
    data = request.get_json()
    
    if not data or 'title' not in data:
        abort(400, description="Title is required")

    todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        completed=data.get('completed', False)
    )

    try:
        db.session.add(todo)
        db.session.commit()
        logger.info('Created todo: %d', todo.id)
        return jsonify(todo.to_dict()), 201
    except SQLAlchemyError as e:
        logger.error('Error creating todo: %s', str(e))
        db.session.rollback()
        abort(500)

@bp.route('/todos', methods=['GET'])
def get_todos() -> tuple[Dict[str, Any], int]:
    try:
        todos = Todo.query.order_by(Todo.created_at.desc()).all()
        return jsonify([todo.to_dict() for todo in todos]), 200
    except SQLAlchemyError as e:
        logger.error('Error fetching todos: %s', str(e))
        abort(500)

@bp.route('/todos/<int:id>', methods=['GET'])
def get_todo(id: int) -> tuple[Dict[str, Any], int]:
    todo = Todo.query.get_or_404(id)
    return jsonify(todo.to_dict()), 200

@bp.route('/todos/<int:id>', methods=['PUT'])
def update_todo(id: int) -> tuple[Dict[str, Any], int]:
    todo = Todo.query.get_or_404(id)
    data = request.get_json()
    
    try:
        if 'title' in data:
            todo.title = data['title']
        if 'description' in data:
            todo.description = data['description']
        if 'completed' in data:
            todo.completed = data['completed']

        db.session.commit()
        logger.info('Updated todo: %d', id)
        return jsonify(todo.to_dict()), 200
    except SQLAlchemyError as e:
        logger.error('Error updating todo %d: %s', id, str(e))
        db.session.rollback()
        abort(500)

@bp.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id: int) -> tuple[Dict[str, str], int]:
    todo = Todo.query.get_or_404(id)
    
    try:
        db.session.delete(todo)
        db.session.commit()
        logger.info('Deleted todo: %d', id)
        return jsonify({'message': 'Todo deleted successfully'}), 200
    except SQLAlchemyError as e:
        logger.error('Error deleting todo %d: %s', id, str(e))
        db.session.rollback()
        abort(500)

@bp.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Resource not found'}), 404


@bp.errorhandler(400)
def bad_request_error(error):
    return jsonify({'error': error.description}), 400

@bp.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500