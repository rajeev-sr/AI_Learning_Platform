# API Stubs for CodeAI Backend

This document outlines the Express.js API endpoints that the frontend expects. Implement these routes in your backend server.

## Base URL
```
http://localhost:3001/api
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "score": 0,
    "level": "Beginner"
  },
  "token": "jwt_token_here"
}
```

### POST /auth/login
Authenticate user login.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "score": 1847,
    "level": "Advanced",
    "streak": 12
  },
  "token": "jwt_token_here"
}
```

### POST /auth/logout
Logout user and invalidate token.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Problem Endpoints

### GET /problems
Get list of problems with optional filtering.

**Query Parameters:**
- `category` (optional): "ML", "DL", "GenAI", "AIEng"
- `difficulty` (optional): "Easy", "Medium", "Hard"
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "problems": [
    {
      "id": 1,
      "title": "Neural Network Backpropagation",
      "description": "Implement backpropagation algorithm for a multi-layer neural network.",
      "difficulty": "Medium",
      "category": "Deep Learning",
      "likes": 234,
      "solved": true,
      "starterCode": "import numpy as np\n\nclass NeuralNetwork:\n    def __init__(self):\n        pass"
    }
  ],
  "pagination": {
    "page": 1,
    "totalPages": 18,
    "totalProblems": 355
  }
}
```

### GET /problems/:id
Get detailed problem information.

**Response (200):**
```json
{
  "success": true,
  "problem": {
    "id": 1,
    "title": "Neural Network Backpropagation",
    "description": "Implement backpropagation algorithm for a multi-layer neural network.",
    "difficulty": "Medium",
    "category": "Deep Learning",
    "likes": 234,
    "solved": true,
    "starterCode": "# Your starter code here",
    "testCases": [
      {
        "input": "[[1, 2], [3, 4]]",
        "expectedOutput": "[[0.5, 0.8], [0.2, 0.9]]",
        "hidden": false
      }
    ],
    "hints": [
      "Start by initializing weights using Xavier/He initialization",
      "Remember to apply activation functions in forward pass"
    ]
  }
}
```

### GET /problems/:id/hints
Get hints for a specific problem (premium feature).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "hints": [
    {
      "id": 1,
      "content": "Start by initializing weights using Xavier/He initialization",
      "level": 1
    },
    {
      "id": 2,
      "content": "Remember to apply activation functions in forward pass",
      "level": 2
    }
  ]
}
```

## Submission Endpoints

### POST /submissions
Submit code solution for evaluation.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request:**
```json
{
  "problemId": 1,
  "code": "import numpy as np\n\n# User's solution code here",
  "language": "python"
}
```

**Response (200):**
```json
{
  "success": true,
  "submission": {
    "id": "sub_123",
    "status": "completed",
    "result": {
      "passed": 2,
      "total": 3,
      "testResults": [
        {
          "name": "Test Basic Functionality",
          "passed": true,
          "time": "0.12s",
          "memory": "45MB"
        },
        {
          "name": "Test Edge Cases",
          "passed": true,
          "time": "0.08s",
          "memory": "42MB"
        },
        {
          "name": "Test Performance",
          "passed": false,
          "time": "2.34s",
          "memory": "156MB",
          "error": "Time limit exceeded"
        }
      ],
      "score": 67,
      "feedback": "Good approach! Consider optimizing the algorithm for better performance."
    }
  }
}
```

### GET /submissions/:id
Get submission details and results.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "submission": {
    "id": "sub_123",
    "problemId": 1,
    "code": "# User's submitted code",
    "language": "python",
    "status": "completed",
    "submittedAt": "2025-08-31T10:30:00Z",
    "result": {
      "passed": 2,
      "total": 3,
      "score": 67,
      "executionTime": "0.89s",
      "feedback": "Good approach! Consider optimizing the algorithm for better performance."
    }
  }
}
```

## User Progress Endpoints

### GET /user/profile
Get user profile and statistics.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "Alex Chen",
    "email": "alex@example.com",
    "score": 1847,
    "level": "Advanced",
    "streak": 12,
    "joinedAt": "2024-01-15T08:00:00Z",
    "stats": {
      "problemsSolved": 47,
      "totalSubmissions": 89,
      "accuracy": 89,
      "rank": 156
    },
    "achievements": [
      {
        "id": "first_solve",
        "name": "First Steps",
        "description": "Solved your first problem",
        "earnedAt": "2024-01-16T14:30:00Z"
      }
    ]
  }
}
```

### GET /user/progress
Get detailed user progress analytics.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "progress": {
    "daily": [
      {
        "date": "2025-08-31",
        "problemsSolved": 3,
        "timeSpent": 120,
        "score": 85
      }
    ],
    "categories": [
      {
        "name": "Machine Learning",
        "solved": 15,
        "total": 156,
        "accuracy": 87
      },
      {
        "name": "Deep Learning",
        "solved": 12,
        "total": 89,
        "accuracy": 91
      }
    ],
    "recentActivity": [
      {
        "type": "solved",
        "problemTitle": "Neural Network Backpropagation",
        "timestamp": "2025-08-31T09:15:00Z",
        "score": 95
      }
    ]
  }
}
```

## Leaderboard Endpoints

### GET /leaderboard
Get global leaderboard rankings.

**Query Parameters:**
- `timeframe` (optional): "daily", "weekly", "monthly", "all-time" (default: "all-time")
- `category` (optional): Filter by specific category
- `limit` (optional): Number of results (default: 100)

**Response (200):**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "user": {
        "id": "user_456",
        "name": "Sarah Chen",
        "score": 2456,
        "level": "Expert",
        "country": "US"
      },
      "problemsSolved": 89,
      "accuracy": 96
    }
  ],
  "userRank": {
    "rank": 156,
    "score": 1847
  }
}
```

## Categories Endpoints

### GET /categories
Get all problem categories with statistics.

**Response (200):**
```json
{
  "success": true,
  "categories": [
    {
      "id": "ml",
      "name": "Machine Learning",
      "description": "Classical ML algorithms, supervised/unsupervised learning",
      "problemCount": 156,
      "icon": "brain",
      "color": "blue"
    },
    {
      "id": "dl",
      "name": "Deep Learning", 
      "description": "Neural networks, CNNs, RNNs, transformers",
      "problemCount": 89,
      "icon": "network",
      "color": "purple"
    }
  ]
}
```

## Error Responses

All endpoints may return error responses in this format:

**Response (400/401/404/500):**
```json
{
  "success": false,
  "error": {
    "message": "Descriptive error message",
    "code": "ERROR_CODE",
    "details": "Additional error details if available"
  }
}
```

## Rate Limiting

- Authentication endpoints: 5 requests per minute per IP
- Problem endpoints: 100 requests per minute per user
- Submission endpoints: 10 requests per minute per user
- Other endpoints: 60 requests per minute per user

## WebSocket Events (Optional)

For real-time features, consider implementing WebSocket connections:

```javascript
// Connect to websocket
const ws = new WebSocket('ws://localhost:3001/ws');

// Events to handle:
// - submission_update: Real-time submission status
// - leaderboard_update: Live leaderboard changes
// - hint_unlock: When user unlocks a new hint
```
