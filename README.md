# Church Gathering Money Distribution Tracking System

A system to prevent double-dipping in money distribution at church gatherings using QR code verification.

## Features
- **Admin Dashboard**: Manage gatherings and view stats.
- **Registration**: Register people and generate unique QR codes.
- **QR Scanning**: Scan QR codes to mark people as "Received".
- **Duplicate Prevention**: Shows a large RED warning if a person tries to receive money twice for the same gathering.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Html5QrcodeScanner
- **Backend**: Node.js, Express, Sequelize, SQLite
- **Database**: SQLite (Zero configuration required)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
node src/server.js
```
The server will start on `http://localhost:3000`.
**Default Admin Credentials**:
- Username: `admin`
- Password: `password`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## How to Use

1. **Login**: Go to the frontend URL and login with `admin` / `password`.
2. **Create Gathering**: Create a new gathering (e.g., "Sunday Service Jan 14").
3. **Register People**: Go to "Register Person", enter details.
   - A QR code will be generated.
   - **Download** or take a picture of this QR code.
4. **Start Distribution**:
   - Go to Dashboard -> Click "Start Scanning" on the relevant gathering.
   - Allow camera access.
5. **Scan**:
   - Scan the person's QR code.
   - **Green Check**: Success (Money Given).
   - **Red X**: Warning (Already Received).

## Troubleshooting
- If the camera doesn't open, ensure you are using `localhost` or `https`. Browsers block camera access on insecure `http` (except localhost).
- If scanning is slow, try moving the QR code closer or ensuring good lighting.
