class CartApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
        this.location = JSON.parse(localStorage.getItem('selectedLocation') || '{}');
        this.init();
    }

    init() {
        const employeeName = localStorage.getItem('employeeName');
        const employeeId = localStorage.getItem('employeeId');
        
        if (!employeeName || !employeeId) {
            window.location.href = '/employee-login.html';
            return;
        }

        document.getElementById('header-employee-info').textContent = `${employeeName} (${employeeId})`;
        
        this.displayCart();
        this.displayLocation();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('back-to-menu').addEventListener('click', () => {
            window.location.href = '/order.html';
        });

        document.getElementById('checkout-btn').addEventListener('click', () => {
            this.showPaymentModal();
        });

        document.getElementById('cancel-payment-btn').addEventListener('click', () => {
            this.hidePaymentModal();
        });

        document.getElementById('confirm-payment-btn').addEventListener('click', () => {
            this.submitOrder();
        });
    }

    displayCart() {
        const cartList = document.getElementById('cart-items-list');
        
        if (this.cart.length === 0) {
            cartList.innerHTML = '<div class="empty-cart"><p>🛒 Your cart is empty</p><button onclick="window.location.href=\'/order.html\'" class="btn btn-primary">Browse Menu</button></div>';
            document.getElementById('checkout-btn').disabled = true;
            return;
        }

        cartList.innerHTML = this.cart.map(item => `
            <div class="cart-item-card">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${item.price} each</p>
                </div>
                <div class="item-quantity">
                    <button class="qty-btn" onclick="cartApp.updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="cartApp.updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="item-total">
                    <strong>₹${item.price * item.quantity}</strong>
                </div>
                <button class="remove-btn" onclick="cartApp.removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        this.updateTotals();
        document.getElementById('checkout-btn').disabled = false;
    }

    displayLocation() {
        const locationDiv = document.getElementById('delivery-location');
        if (this.location.building) {
            locationDiv.innerHTML = `
                <strong>${this.location.employeeName}</strong><br>
                ${this.location.building}, ${this.location.floor}<br>
                ${this.location.department}, Seat ${this.location.seat}
            `;
        } else {
            locationDiv.innerHTML = '<p style="color: #e53e3e;">No delivery location set</p>';
        }
    }

    updateQuantity(itemId, change) {
        const item = this.cart.find(i => i.id === itemId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeItem(itemId);
            return;
        }

        this.saveCart();
        this.displayCart();
    }

    removeItem(itemId) {
        this.cart = this.cart.filter(i => i.id !== itemId);
        this.saveCart();
        this.displayCart();
    }

    updateTotals() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('subtotal').textContent = total;
        document.getElementById('total').textContent = total;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    showPaymentModal() {
        const modal = document.getElementById('payment-modal');
        const paymentItems = document.getElementById('payment-items');
        
        paymentItems.innerHTML = this.cart.map(item => `
            <div class="payment-item">
                <span>${item.name} x${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('payment-total').textContent = total;
        
        modal.style.display = 'flex';
    }

    hidePaymentModal() {
        document.getElementById('payment-modal').style.display = 'none';
    }

    openPaymentApp(app) {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const upiId = '7597649518@ptyes';
        const payeeName = 'GenusCanteen';
        
        let paymentUrl = '';
        switch(app) {
            case 'phonepe':
                paymentUrl = `phonepe://pay?pa=${upiId}&pn=${payeeName}&am=${total}&cu=INR`;
                break;
            case 'gpay':
                paymentUrl = `tez://upi/pay?pa=${upiId}&pn=${payeeName}&am=${total}&cu=INR`;
                break;
            case 'paytm':
                paymentUrl = `paytmmp://pay?pa=${upiId}&pn=${payeeName}&am=${total}&cu=INR`;
                break;
        }
        
        window.location.href = paymentUrl;
    }

    async submitOrder() {
        const orderData = {
            location: this.location,
            items: this.cart,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentMethod: 'upi'
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();
            if (result.success) {
                localStorage.removeItem('cart');
                alert(`✅ Order #${result.orderId} placed successfully!\n\nYour food will be delivered in 15-20 minutes.`);
                window.location.href = '/track-orders.html';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error placing order. Please try again.');
        }
    }
}

const cartApp = new CartApp();
