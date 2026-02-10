class OrderTracking {
    constructor() {
        this.employeeName = localStorage.getItem('employeeName');
        this.orders = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        if (!this.employeeName) {
            window.location.href = '/';
            return;
        }

        document.getElementById('current-employee').textContent = this.employeeName;
        this.setupEventListeners();
        this.loadOrders();

        // Auto-refresh every 10 seconds
        setInterval(() => {
            this.loadOrders();
        }, 10000);
    }

    setupEventListeners() {
        document.getElementById('back-home').addEventListener('click', () => {
            window.location.href = '/';
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.displayOrders();
            });
        });
    }

    async loadOrders() {
        try {
            const response = await fetch('/api/orders');
            const allOrders = await response.json();
            
            // Filter orders for current employee
            this.orders = allOrders.filter(order => 
                order.location.employeeName === this.employeeName
            );
            
            this.displayOrders();
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    displayOrders() {
        const container = document.getElementById('my-orders-container');
        
        let filteredOrders = this.currentFilter === 'all' 
            ? this.orders 
            : this.orders.filter(order => order.status === this.currentFilter);

        // Sort by timestamp (newest first)
        filteredOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (filteredOrders.length === 0) {
            container.innerHTML = '<div class="no-orders"><p>No orders found.</p></div>';
            return;
        }

        container.innerHTML = filteredOrders.map(order => this.createOrderCard(order)).join('');
    }

    createOrderCard(order) {
        const statusInfo = {
            pending: { color: '#f56565', icon: '⏳', text: 'Order Received - Waiting to be prepared' },
            preparing: { color: '#ed8936', icon: '👨‍🍳', text: 'Your food is being prepared' },
            ready: { color: '#48bb78', icon: '✅', text: 'Order is ready for delivery' },
            delivered: { color: '#4299e1', icon: '🚚', text: 'Delivered to your seat' }
        };

        const status = statusInfo[order.status];
        const orderDate = new Date(order.timestamp);
        const paymentMethods = {
            'upi': 'UPI Payment',
            'card': 'Credit/Debit Card',
            'cash': 'Cash Payment'
        };

        return `
            <div class="my-order-card">
                <div class="order-status-header" style="background-color: ${status.color}">
                    <div class="status-info">
                        <span class="status-icon">${status.icon}</span>
                        <div>
                            <h3>Order #${order.id}</h3>
                            <p class="status-text">${status.text}</p>
                        </div>
                    </div>
                    <span class="status-badge">${order.status.toUpperCase()}</span>
                </div>
                
                <div class="order-progress">
                    <div class="progress-step ${order.status === 'pending' || order.status === 'preparing' || order.status === 'ready' || order.status === 'delivered' ? 'completed' : ''}">
                        <div class="progress-dot"></div>
                        <span>Pending</span>
                    </div>
                    <div class="progress-line ${order.status === 'preparing' || order.status === 'ready' || order.status === 'delivered' ? 'completed' : ''}"></div>
                    <div class="progress-step ${order.status === 'preparing' || order.status === 'ready' || order.status === 'delivered' ? 'completed' : ''}">
                        <div class="progress-dot"></div>
                        <span>Preparing</span>
                    </div>
                    <div class="progress-line ${order.status === 'ready' || order.status === 'delivered' ? 'completed' : ''}"></div>
                    <div class="progress-step ${order.status === 'ready' || order.status === 'delivered' ? 'completed' : ''}">
                        <div class="progress-dot"></div>
                        <span>Ready</span>
                    </div>
                    <div class="progress-line ${order.status === 'delivered' ? 'completed' : ''}"></div>
                    <div class="progress-step ${order.status === 'delivered' ? 'completed' : ''}">
                        <div class="progress-dot"></div>
                        <span>Delivered</span>
                    </div>
                </div>

                <div class="order-body">
                    <div class="order-info-grid">
                        <div class="info-item">
                            <strong>📍 Delivery Location:</strong>
                            <p>${order.location.building}, ${order.location.floor}, ${order.location.department}, Seat ${order.location.seat}</p>
                        </div>
                        <div class="info-item">
                            <strong>💳 Payment Method:</strong>
                            <p>${paymentMethods[order.paymentMethod] || 'N/A'}</p>
                        </div>
                        <div class="info-item">
                            <strong>🕐 Order Time:</strong>
                            <p>${orderDate.toLocaleString()}</p>
                        </div>
                    </div>

                    <div class="order-items-section">
                        <h4>Items Ordered:</h4>
                        <ul class="items-list">
                            ${order.items.map(item => `
                                <li>
                                    <span>${item.name} x${item.quantity}</span>
                                    <span class="item-price">₹${item.price * item.quantity}</span>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="order-total-box">
                            <strong>Total Amount:</strong>
                            <strong class="total-amount">₹${order.total}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize tracking
const orderTracking = new OrderTracking();