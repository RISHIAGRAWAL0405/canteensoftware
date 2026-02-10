class AdminDashboard {
    constructor() {
        this.orders = [];
        this.menu = [];
        this.currentFilter = 'all';
        this.currentTab = 'orders';
        this.socket = null;
        this.init();
    }

    async init() {
        if (!this.checkAuth()) return;
        
        this.setupWebSocket();
        this.setupEventListeners();
        await this.loadOrders();
        await this.loadMenu();
        this.updateStats();
        this.displayOrders();
        this.displayMenu();
    }

    setupWebSocket() {
        this.socket = io();
        
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        
        this.socket.on('newOrder', (order) => {
            console.log('New order received:', order);
            this.orders.push(order);
            this.updateStats();
            this.displayOrders();
            this.showNotification('New order received!', 'success');
        });
        
        this.socket.on('orderStatusUpdate', (data) => {
            console.log('Order status updated:', data);
            const orderIndex = this.orders.findIndex(o => o._id === data.orderId);
            if (orderIndex !== -1) {
                this.orders[orderIndex] = data.order;
                this.updateStats();
                this.displayOrders();
            }
        });
        
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    checkAuth() {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin-login.html';
            return false;
        }
        return true;
    }

    setupEventListeners() {
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login.html';
        });

        document.querySelectorAll('.main-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.main-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                const tab = e.target.dataset.tab;
                document.getElementById(`${tab}-tab`).classList.add('active');
            });
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.status;
                this.displayOrders();
            });
        });

        document.getElementById('add-item-btn').addEventListener('click', () => {
            this.showItemModal();
        });
    }

    async loadOrders() {
        try {
            const response = await fetch('/api/orders');
            this.orders = await response.json();
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    async loadMenu() {
        try {
            const response = await fetch('/api/menu');
            this.menu = await response.json();
        } catch (error) {
            console.error('Error loading menu:', error);
        }
    }

    updateStats() {
        const stats = {
            pending: this.orders.filter(o => o.status === 'pending').length,
            preparing: this.orders.filter(o => o.status === 'preparing').length,
            ready: this.orders.filter(o => o.status === 'ready').length,
            delivered: this.orders.filter(o => o.status === 'delivered').length
        };

        document.getElementById('pending-count').textContent = stats.pending;
        document.getElementById('preparing-count').textContent = stats.preparing;
        document.getElementById('ready-count').textContent = stats.ready;
        document.getElementById('delivered-count').textContent = stats.delivered;
    }

    displayOrders() {
        const container = document.getElementById('orders-container');
        let filteredOrders = this.currentFilter === 'all' 
            ? this.orders 
            : this.orders.filter(order => order.status === this.currentFilter);

        // Sort by timestamp (newest first)
        filteredOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (filteredOrders.length === 0) {
            container.innerHTML = '<p class="no-orders">No orders found.</p>';
            return;
        }

        container.innerHTML = filteredOrders.map(order => this.createOrderCard(order)).join('');
    }

    createOrderCard(order) {
        const statusColors = {
            pending: '#f56565',
            preparing: '#ed8936',
            ready: '#48bb78',
            delivered: '#4299e1'
        };

        const nextStatus = {
            pending: 'preparing',
            preparing: 'ready',
            ready: 'delivered'
        };

        const nextStatusText = {
            pending: 'Start Preparing',
            preparing: 'Mark Ready',
            ready: 'Mark Delivered'
        };

        return `
            <div class="order-card">
                <div class="order-header">
                    <h3>Order #${order._id}</h3>
                    <span class="order-status" style="background-color: ${statusColors[order.status]}">
                        ${order.status.toUpperCase()}
                    </span>
                </div>
                <div class="order-details">
                    <p><strong>Employee:</strong> ${order.location.employeeName}</p>
                    <p><strong>Location:</strong> ${order.location.building}, ${order.location.floor}, ${order.location.department}, Seat ${order.location.seat}</p>
                    <p><strong>Payment:</strong> ${order.paymentMethod ? this.getPaymentMethodText(order.paymentMethod) : 'N/A'}</p>
                    <p><strong>Time:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
                </div>
                <div class="order-items">
                    <h4>Items:</h4>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₹${item.price * item.quantity}</li>`).join('')}
                    </ul>
                    <p class="order-total"><strong>Total: ₹${order.total}</strong></p>
                </div>
                ${order.status !== 'delivered' ? `
                    <div class="order-actions">
                        <button class="btn btn-primary" onclick="adminDashboard.updateOrderStatus('${order._id}', '${nextStatus[order.status]}')">
                            ${nextStatusText[order.status]}
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    getPaymentMethodText(method) {
        const methods = {
            'upi': 'UPI Payment',
            'card': 'Credit/Debit Card',
            'cash': 'Cash Payment'
        };
        return methods[method] || method;
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const response = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // No need to manually refresh - WebSocket will handle the update
                this.showNotification(`Order #${orderId} status updated to ${newStatus}`, 'success');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            this.showNotification('Error updating order status', 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            background-color: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    displayMenu() {
        const container = document.getElementById('menu-management-container');
        container.innerHTML = this.menu.map(category => `
            <div class="menu-management-category">
                <h3>${category.category}</h3>
                ${category.items.map(item => {
                    const descId = `admin-desc-${category.id}-${item.id}`;
                    return `
                    <div class="menu-management-item ${item.available === false ? 'disabled' : ''}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p id="${descId}">${item.description}</p>
                            ${item.description.length > 80 ? `<button class="read-more-btn" onclick="adminDashboard.toggleDesc('${descId}')">Read more</button>` : ''}
                        </div>
                        <div class="item-price">
                            <strong>₹${item.price}</strong>
                        </div>
                        <div class="item-status">
                            <span class="status-badge ${item.available !== false ? 'available' : 'unavailable'}">
                                ${item.available !== false ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                        <div class="item-actions-menu">
                            <button class="icon-btn edit" onclick="adminDashboard.editItem(${category.id}, ${item.id})" title="Edit">✏️</button>
                            <button class="icon-btn toggle" onclick="adminDashboard.toggleItem(${category.id}, ${item.id})" title="Toggle Availability">${item.available !== false ? '🚫' : '✅'}</button>
                            <button class="icon-btn delete" onclick="adminDashboard.deleteItem(${category.id}, ${item.id})" title="Delete">🗑️</button>
                        </div>
                    </div>
                `}).join('')}
            </div>
        `).join('');
    }

    toggleDesc(descId) {
        const descElement = document.getElementById(descId);
        const btn = descElement.nextElementSibling;
        if (descElement.classList.contains('expanded')) {
            descElement.classList.remove('expanded');
            btn.textContent = 'Read more';
        } else {
            descElement.classList.add('expanded');
            btn.textContent = 'Read less';
        }
    }

    showItemModal(categoryId = null, itemId = null) {
        const isEdit = itemId !== null;
        let item = null;
        
        if (isEdit) {
            const category = this.menu.find(c => c.id === categoryId);
            item = category?.items.find(i => i.id === itemId);
        }

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${isEdit ? 'Edit Item' : 'Add New Item'}</h3>
                    <button class="close-modal" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <form class="modal-form" onsubmit="adminDashboard.saveItem(event, ${categoryId}, ${itemId})">
                    <div class="form-group">
                        <label>Category:</label>
                        <select name="category" required ${isEdit ? 'disabled' : ''}>
                            ${this.menu.map(c => `<option value="${c.id}" ${c.id === categoryId ? 'selected' : ''}>${c.category}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Item Name:</label>
                        <input type="text" name="name" value="${item?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea name="description" required>${item?.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Price (₹):</label>
                        <input type="number" name="price" value="${item?.price || ''}" required min="0">
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn-success">💾 Save</button>
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    async saveItem(event, categoryId, itemId) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        const itemData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseInt(formData.get('price')),
            available: true
        };

        const targetCategoryId = categoryId || parseInt(formData.get('category'));

        try {
            const response = await fetch(`/api/menu/${targetCategoryId}/items${itemId ? `/${itemId}` : ''}`, {
                method: itemId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });

            if (response.ok) {
                await this.loadMenu();
                this.displayMenu();
                document.querySelector('.modal').remove();
                this.showNotification(itemId ? 'Item updated successfully' : 'Item added successfully', 'success');
            }
        } catch (error) {
            this.showNotification('Error saving item', 'error');
        }
    }

    editItem(categoryId, itemId) {
        this.showItemModal(categoryId, itemId);
    }

    async toggleItem(categoryId, itemId) {
        try {
            const response = await fetch(`/api/menu/${categoryId}/items/${itemId}/toggle`, {
                method: 'PUT'
            });

            if (response.ok) {
                await this.loadMenu();
                this.displayMenu();
                this.showNotification('Item availability updated', 'success');
            }
        } catch (error) {
            this.showNotification('Error updating item', 'error');
        }
    }

    async deleteItem(categoryId, itemId) {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await fetch(`/api/menu/${categoryId}/items/${itemId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await this.loadMenu();
                this.displayMenu();
                this.showNotification('Item deleted successfully', 'success');
            }
        } catch (error) {
            this.showNotification('Error deleting item', 'error');
        }
    }
}

// Initialize dashboard
const adminDashboard = new AdminDashboard();