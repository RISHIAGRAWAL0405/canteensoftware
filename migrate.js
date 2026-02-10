const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/database');
const Employee = require('./models/Employee');
const Order = require('./models/Order');
const Menu = require('./models/Menu');
const Building = require('./models/Building');

const migrateData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Employee.deleteMany({});
    await Order.deleteMany({});
    await Menu.deleteMany({});
    await Building.deleteMany({});
    
    console.log('📦 Migrating data from JSON files to MongoDB...\n');
    
    // Migrate Buildings
    const buildingsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'buildings.json'), 'utf8'));
    if (buildingsData.length > 0) {
      await Building.insertMany(buildingsData);
      console.log(`✅ Migrated ${buildingsData.length} buildings`);
    }
    
    // Migrate Menu
    const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'menu.json'), 'utf8'));
    if (menuData.length > 0) {
      await Menu.insertMany(menuData);
      console.log(`✅ Migrated ${menuData.length} menu categories`);
    }
    
    // Migrate Employees
    const employeesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'employees.json'), 'utf8'));
    if (employeesData.length > 0) {
      await Employee.insertMany(employeesData);
      console.log(`✅ Migrated ${employeesData.length} employees`);
    }
    
    // Migrate Orders
    const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'orders.json'), 'utf8'));
    if (ordersData.length > 0) {
      await Order.insertMany(ordersData);
      console.log(`✅ Migrated ${ordersData.length} orders`);
    }
    
    console.log('\n🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
};

migrateData();
