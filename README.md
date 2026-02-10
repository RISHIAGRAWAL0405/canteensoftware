# Genus Company Canteen Food Ordering System

A web-based food ordering system that allows employees to order food from the canteen directly to their seats across multiple buildings, floors, and departments.

## Features

- **Multi-level Location Selection**: Building → Floor → Department → Seat
- **Interactive Menu**: Browse food items by category with real-time cart updates
- **Seat-based Delivery**: Orders are delivered directly to the employee's seat
- **Order Management**: Track orders with unique order IDs
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
canteen-ordering-system/
├── server.js              # Express server
├── package.json           # Dependencies
├── data/
│   ├── buildings.json     # Building/floor/department/seat data
│   ├── menu.json         # Food menu items
│   └── orders.json       # Order history
└── public/
    ├── index.html        # Main webpage
    ├── style.css         # Styling
    └── script.js         # Frontend JavaScript
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd canteen-ordering-system
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm start
   ```

3. **Access the Application**:
   Open your browser and go to `http://localhost:3000`

## How to Use

1. **Select Location**: Choose your building, floor, department, and seat
2. **Browse Menu**: View available food items organized by category
3. **Add to Cart**: Use +/- buttons to add items to your order
4. **Place Order**: Review your cart and place the order
5. **Confirmation**: Receive order confirmation with delivery details

## API Endpoints

- `GET /api/buildings` - Get all buildings with floors, departments, and seats
- `GET /api/menu` - Get food menu items
- `POST /api/orders` - Place a new order
- `GET /api/orders` - Get all orders

## Customization

- **Add Buildings/Floors**: Edit `data/buildings.json`
- **Update Menu**: Edit `data/menu.json`
- **Modify Styling**: Edit `public/style.css`
- **Add Features**: Extend `server.js` and `public/script.js`

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: JSON files
- **Styling**: CSS Grid, Flexbox, Responsive Design