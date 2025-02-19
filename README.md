# Todo Frontend Application

A modern React-based todo application with a clean and responsive user interface.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Real-time error handling and feedback
- Loading states and empty states
- Responsive design
- Form validation
- Timestamp display
- Confirmation dialogs for destructive actions

## Tech Stack

- React 18
- Modern JavaScript (ES6+)
- CSS3 with Flexbox
- Fetch API for HTTP requests

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Application Structure

The main application component (App.js) contains:
```javascript:todo-frontend/src/App.js
startLine: 4
endLine: 175
```

## State Management

The application manages the following states:
- Todos list
- Form inputs (title, description)
- Loading state
- Error messages

## API Integration

The frontend communicates with the backend through RESTful API endpoints:

- GET /api/v1/todos - Fetch all todos
- POST /api/v1/todos - Create new todo
- PUT /api/v1/todos/:id - Update todo status
- DELETE /api/v1/todos/:id - Delete todo

## Styling

The application uses a custom CSS file for styling:
```css:todo-frontend/src/App.css
startLine: 1
endLine: 20
```

Key styling features:
- Responsive layout
- Clean and modern design
- Consistent spacing and typography
- Visual feedback for user actions
- Smooth transitions

## Error Handling

The application implements comprehensive error handling:
- Network errors
- API errors
- Form validation
- User feedback through error messages
- Automatic error message dismissal

## Development

1. Make code changes
2. Test locally with:
```bash
npm test
```

3. Build for production:
```bash
npm run build
```

## Available Scripts

- `npm start` - Runs development server
- `npm test` - Runs test suite
- `npm run build` - Creates production build
- `npm run eject` - Ejects from Create React App

## Production Deployment

1. Create production build:
```bash
npm run build
```

2. Deploy the contents of the `build` directory to your hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
```
