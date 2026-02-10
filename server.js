const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/database');
const Employee = require('./models/Employee');
const Order = require('./models/Order');
const Menu = require('./models/Menu');
const Building = require('./models/Building');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 3001;

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/genus-canteen';

// Connect to MongoDB
connectDB();

// Admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'canteen123'
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    console.log('Login successful'); // Debug log
    res.json({ success: true, token: 'admin-token-' + Date.now() });
  } else {
    console.log('Login failed - invalid credentials'); // Debug log
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// Employee login/register
app.post('/api/employee/login', async (req, res) => {
  try {
    const { employeeId, employeeName } = req.body;
    
    let employee = await Employee.findOne({ employeeId });
    
    if (!employee) {
      employee = await Employee.create({ employeeId, employeeName });
    } else {
      employee.employeeName = employeeName;
      await employee.save();
    }
    
    res.json({ success: true, profile: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get employee profile
app.get('/api/employee/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    
    if (employee) {
      res.json({ success: true, profile: employee });
    } else {
      res.status(404).json({ success: false, message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update employee profile
app.put('/api/employee/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body,
      { new: true }
    );
    
    if (employee) {
      res.json({ success: true, profile: employee });
    } else {
      res.status(404).json({ success: false, message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API Routes
app.get('/api/buildings', async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new menu item
app.post('/api/menu/:categoryId/items', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const category = await Menu.findOne({ id: categoryId });
    
    if (category) {
      const newItem = { id: Date.now(), ...req.body };
      category.items.push(newItem);
      await category.save();
      res.json({ success: true, item: newItem });
    } else {
      res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update menu item
app.put('/api/menu/:categoryId/items/:itemId', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const itemId = parseInt(req.params.itemId);
    const category = await Menu.findOne({ id: categoryId });
    
    if (category) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        Object.assign(item, req.body);
        await category.save();
        res.json({ success: true, item });
      } else {
        res.status(404).json({ success: false, message: 'Item not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Toggle item availability
app.put('/api/menu/:categoryId/items/:itemId/toggle', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const itemId = parseInt(req.params.itemId);
    const category = await Menu.findOne({ id: categoryId });
    
    if (category) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        item.available = !item.available;
        await category.save();
        res.json({ success: true, item });
      } else {
        res.status(404).json({ success: false, message: 'Item not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete menu item
app.delete('/api/menu/:categoryId/items/:itemId', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const itemId = parseInt(req.params.itemId);
    const category = await Menu.findOne({ id: categoryId });
    
    if (category) {
      const itemIndex = category.items.findIndex(i => i.id === itemId);
      if (itemIndex !== -1) {
        category.items.splice(itemIndex, 1);
        await category.save();
        res.json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'Item not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    
    // Save last used address to employee profile
    await Employee.findOneAndUpdate(
      { employeeId: req.body.location.employeeId },
      { lastUsedAddress: req.body.location }
    );
    
    // Emit new order to admin dashboard
    io.emit('newOrder', newOrder);
    
    res.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (order) {
      // Emit order status update to admin dashboard
      io.emit('orderStatusUpdate', { orderId: order._id, status, order });
      
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Serve demo page as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'employee-login.html'));
});

server.listen(PORT, () => {
  console.log(`🍽️ Genus Canteen Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin-login.html`);
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});