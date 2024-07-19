## Prerequisites

- Node.js (v12 or later)
- MongoDB

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <reponame>
```

### 2. Install Dependencies

Navigate to the `backend` directory and install the necessary dependencies:

```bash
cd backend
npm install
```
### 3. Run the Server

Start the server:

```bash
npm start
```

The server should now be running on `http://localhost:5000`.

## API Endpoints

### Create ZeroCard

**Endpoint:** `POST /api/journeys/zerocard`

**Request Body:**

```json
{
  "cardNumber": "34567",
  "balance": 1000
}
```

**Response:**

```json
{
  "message": "ZeroCard created",
  "zeroCard": {
    "_id": "60c72b9f4f1a2b3a3c123456",
    "cardNumber": "34567",
    "balance": 1000,
    "__v": 0
  }
}
```

### Record Journey

**Endpoint:** `POST /api/journeys/travel`

**Request Body:**

```json
{
  "cardNumber": "34567",
  "passengerType": "ADULT",
  "journeyType": "single"
}
```

**Response:**

```json
{
  "message": "Journey recorded",
  "balance": 900
}
```

### Fetch Summary

**Endpoint:** `GET /api/journeys/summary`

**Response:**

```json
{
  "collectionSummary": {
    "totalAmount": 100,
    "totalDiscount": 0
  },
  "passengerSummary": {
    "ADULT": 1,
    "KID": 0,
    "SENIOR_CITIZEN": 0
  }
}
```

## Testing with Postman

To test the APIs, you can use Postman. Follow these steps:

1. **Create ZeroCard**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/journeys/zerocard`
   - Body (raw JSON):
     ```json
     {
       "cardNumber": "34567",
       "balance": 1000
     }
     ```

2. **Record Journey**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/journeys/travel`
   - Body (raw JSON):
     ```json
     {
       "cardNumber": "34567",
       "passengerType": "ADULT",
       "journeyType": "single"
     }
     ```

3. **Fetch Summary**:
   - Method: `GET`
   - URL: `http://localhost:5000/api/journeys/summary`

## Project Structure

```
backend
├── models
│   ├── Journey.js
│   ├── ZeroCard.js
├── routes
│   ├── Journeys.js
├── app.js
├── package.json
```