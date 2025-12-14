# Charging Station Project

This is a fullstack Charging Station project with:

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL

## create db 
go to the pgAdmin 
create db 
right click on db name and go to query tools and paste data like below 
CREATE TABLE charging_stations (
    id SERIAL PRIMARY KEY,
    station_name VARCHAR(100) NOT NULL,
    location_address TEXT NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    connector_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    image_url TEXT,
    location_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
and execute the script

## Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL
- Git

## Setup Instructions

### 1. Clone the repository


git clone https://github.com/kalpeshmankar73/charging-station.git
cd charging-station


## Setup Instructions for backend
cd charging-station-backend
npm instal

## create .env file in root directory
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=5000

## run backend 
npx nodemon index.js

## setup frontend 
cd ../charging-station-dashboard
npm install 
npm run dev    


