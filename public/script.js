class CanteenApp {
    constructor() {
        this.buildings = [];
        this.menu = [];
        this.cart = [];
        this.selectedLocation = {};
        this.foodImages = this.getFoodImages();
        this.init();
    }

    getFoodImages() {
        return {
            // Breakfast
            101: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Pancakes
            102: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Scrambled Eggs
            103: 'https://images.unsplash.com/photo-1571197119282-7c4e2b2d2c4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Oatmeal
            104: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Veggie Sandwich
            105: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // French Toast
            
            // Lunch
            201: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Biryani
            202: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Paneer Salad
            203: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Mixed Veg Curry
            204: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Club Sandwich
            205: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Aloo Tikki Burger
            206: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Pasta Alfredo
            
            // Dinner
            301: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Paneer Tikka
            302: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Dal Makhani
            303: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Palak Paneer
            304: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Pizza
            305: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Rajma Curry
            
            // Snacks
            401: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Samosas
            402: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Paneer Pakoras
            403: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Nachos
            404: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Spring Rolls
            405: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Garlic Bread
            406: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Onion Rings
            
            // Beverages
            501: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Orange Juice
            502: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Coffee
            503: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Masala Tea
            504: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Soft Drinks
            505: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Iced Tea
            506: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Smoothie
            507: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Lassi
            
            // Desserts
            601: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Chocolate Cake
            602: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Ice Cream Sundae
            603: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Gulab Jamun
            604: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Fruit Salad
            605: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', // Cheesecake
            606: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'  // Kulfi
        };
    }

    getCategoryEmoji(category) {
        const emojis = {
            'Breakfast': '🌅',
            'Lunch': '🍽️',
            'Dinner': '🌙',
            'Snacks': '🍿',
            'Beverages': '🥤',
            'Desserts': '🍰'
        };
        return emojis[category] || '🍴';
    }

    async init() {
        await this.loadBuildings();
        await this.loadMenu();
        this.setupEventListeners();
        this.populateBuildings();
        this.restoreSession();
    }

    async loadBuildings() {
        try {
            const response = await fetch('/api/buildings');
            this.buildings = await response.json();
        } catch (error) {
            console.error('Error loading buildings:', error);
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

    setupEventListeners() {
        document.getElementById('employee-name').addEventListener('input', () => this.updateNextButton());
        document.getElementById('building').addEventListener('change', () => this.onBuildingChange());
        document.getElementById('floor').addEventListener('change', () => this.onFloorChange());
        document.getElementById('department').addEventListener('change', () => this.onDepartmentChange());
        document.getElementById('seat').addEventListener('change', () => this.onSeatChange());
        document.getElementById('next-to-menu').addEventListener('click', () => this.showMenuSection());
        document.getElementById('back-to-location').addEventListener('click', () => this.showLocationSection());
        document.getElementById('place-order').addEventListener('click', () => this.showPaymentSection());
        document.getElementById('back-to-menu').addEventListener('click', () => this.showMenuSection());
        document.getElementById('confirm-payment').addEventListener('click', () => this.processPayment());
        document.getElementById('new-order').addEventListener('click', () => this.resetApp());
        
        // Payment method selection
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', () => this.updatePaymentButton());
        });
    }

    populateBuildings() {
        const buildingSelect = document.getElementById('building');
        buildingSelect.innerHTML = '<option value="">Select Building</option>';
        this.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = building.name;
            buildingSelect.appendChild(option);
        });
    }

    onBuildingChange() {
        const buildingId = parseInt(document.getElementById('building').value);
        const building = this.buildings.find(b => b.id === buildingId);
        
        const floorSelect = document.getElementById('floor');
        floorSelect.innerHTML = '<option value="">Select Floor</option>';
        floorSelect.disabled = !building;
        
        if (building) {
            building.floors.forEach(floor => {
                const option = document.createElement('option');
                option.value = floor.id;
                option.textContent = floor.name;
                floorSelect.appendChild(option);
            });
        }
        
        this.resetDepartmentAndSeat();
    }

    onFloorChange() {
        const buildingId = parseInt(document.getElementById('building').value);
        const floorId = parseInt(document.getElementById('floor').value);
        const building = this.buildings.find(b => b.id === buildingId);
        const floor = building?.floors.find(f => f.id === floorId);
        
        const departmentSelect = document.getElementById('department');
        departmentSelect.innerHTML = '<option value="">Select Department</option>';
        departmentSelect.disabled = !floor;
        
        if (floor) {
            floor.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.id;
                option.textContent = dept.name;
                departmentSelect.appendChild(option);
            });
        }
        
        this.resetSeat();
    }

    onDepartmentChange() {
        const buildingId = parseInt(document.getElementById('building').value);
        const floorId = parseInt(document.getElementById('floor').value);
        const deptId = parseInt(document.getElementById('department').value);
        
        const building = this.buildings.find(b => b.id === buildingId);
        const floor = building?.floors.find(f => f.id === floorId);
        const department = floor?.departments.find(d => d.id === deptId);
        
        const seatSelect = document.getElementById('seat');
        seatSelect.innerHTML = '<option value="">Select Seat</option>';
        seatSelect.disabled = !department;
        
        if (department) {
            department.seats.filter(seat => !seat.occupied).forEach(seat => {
                const option = document.createElement('option');
                option.value = seat.id;
                option.textContent = `Seat ${seat.number}`;
                seatSelect.appendChild(option);
            });
        }
        
        this.updateNextButton();
    }

    onSeatChange() {
        this.updateNextButton();
    }

    resetDepartmentAndSeat() {
        document.getElementById('department').innerHTML = '<option value="">Select Department</option>';
        document.getElementById('department').disabled = true;
        this.resetSeat();
    }

    resetSeat() {
        document.getElementById('seat').innerHTML = '<option value="">Select Seat</option>';
        document.getElementById('seat').disabled = true;
        this.updateNextButton();
    }

    updateNextButton() {
        const nextBtn = document.getElementById('next-to-menu');
        const employeeName = document.getElementById('employee-name').value.trim();
        const seatSelected = document.getElementById('seat').value;
        nextBtn.disabled = !employeeName || !seatSelected;
    }

    showMenuSection() {
        this.saveSelectedLocation();
        this.displayMenu();
        this.showSection('menu-section');
        this.saveSession();
        // Auto-scroll to menu section
        setTimeout(() => {
            document.getElementById('menu-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }

    showLocationSection() {
        this.showSection('location-section');
        this.saveSession();
    }

    saveSelectedLocation() {
        const employeeName = document.getElementById('employee-name').value.trim();
        const buildingId = parseInt(document.getElementById('building').value);
        const floorId = parseInt(document.getElementById('floor').value);
        const deptId = parseInt(document.getElementById('department').value);
        const seatId = document.getElementById('seat').value;

        const building = this.buildings.find(b => b.id === buildingId);
        const floor = building.floors.find(f => f.id === floorId);
        const department = floor.departments.find(d => d.id === deptId);
        const seat = department.seats.find(s => s.id === seatId);

        this.selectedLocation = {
            employeeName: employeeName,
            building: building.name,
            floor: floor.name,
            department: department.name,
            seat: seat.number,
            seatId: seatId
        };

        document.getElementById('employee-info').textContent = this.selectedLocation.employeeName;
        document.getElementById('delivery-location').textContent = 
            `${this.selectedLocation.building}, ${this.selectedLocation.floor}, ${this.selectedLocation.department}, Seat ${this.selectedLocation.seat}`;
    }

    displayMenu() {
        const menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML = '';

        this.menu.forEach(category => {
            const availableItems = category.items.filter(item => item.available !== false);
            if (availableItems.length === 0) return;

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'menu-category';
            categoryDiv.innerHTML = `<h3>${this.getCategoryEmoji(category.category)} ${category.category}</h3>`;

            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'menu-items';

            availableItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item';
                const imageUrl = this.foodImages[item.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
                
                itemDiv.innerHTML = `
                    <img src="${imageUrl}" alt="${item.name}" class="item-image" loading="lazy">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                    <div class="item-price">₹${item.price}</div>
                    <div class="item-actions">
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, -1)" title="Remove item">-</button>
                        <span class="quantity" id="qty-${item.id}">0</span>
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, 1)" title="Add item">+</button>
                    </div>
                `;
                itemsDiv.appendChild(itemDiv);
            });

            categoryDiv.appendChild(itemsDiv);
            menuContainer.appendChild(categoryDiv);
        });
    }

    async updateQuantity(itemId, change) {
        const item = this.findMenuItem(itemId);
        if (!item) return;

        // Check if item is available
        if (item.available === false && change > 0) {
            this.showNotification(`${item.name} is currently unavailable! ❌`);
            return;
        }

        const cartItem = this.cart.find(ci => ci.id === itemId);
        
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                this.cart = this.cart.filter(ci => ci.id !== itemId);
                this.showNotification(`${item.name} removed from cart! 🗑️`);
            } else {
                this.showNotification(`${item.name} quantity updated! 📝`);
            }
        } else if (change > 0) {
            this.cart.push({
                id: itemId,
                name: item.name,
                price: item.price,
                quantity: 1
            });
            this.showNotification(`${item.name} added to cart! 🛒`);
        }

        this.updateCartDisplay();
        this.saveSession();
    }

    findMenuItem(itemId) {
        for (const category of this.menu) {
            const item = category.items.find(i => i.id === itemId);
            if (item) return item;
        }
        return null;
    }

    updateCartDisplay() {
        // Update quantity displays
        this.menu.forEach(category => {
            category.items.forEach(item => {
                const qtyElement = document.getElementById(`qty-${item.id}`);
                const cartItem = this.cart.find(ci => ci.id === item.id);
                qtyElement.textContent = cartItem ? cartItem.quantity : 0;
            });
        });

        // Update cart items
        const cartItemsDiv = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        cartItemsDiv.innerHTML = '';
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (this.cart.length === 0) {
            cartItemsDiv.innerHTML = '<p style="text-align: center; color: #718096; font-style: italic;">🛒 Your cart is empty</p>';
        } else {
            this.cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>₹${(item.price * item.quantity)}</span>
                `;
                cartItemsDiv.appendChild(itemDiv);
            });
        }

        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('total').textContent = total;
        document.getElementById('place-order').disabled = this.cart.length === 0;
    }

    showPaymentSection() {
        this.displayPaymentSummary();
        this.showSection('payment-section');
        this.saveSession();
        // Auto-scroll to payment section
        setTimeout(() => {
            document.getElementById('payment-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }

    displayPaymentSummary() {
        const itemsDiv = document.getElementById('payment-order-items');
        itemsDiv.innerHTML = '';
        
        this.cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>₹${(item.price * item.quantity)}</span>
            `;
            itemsDiv.appendChild(itemDiv);
        });
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('payment-total').textContent = total;
    }

    updatePaymentButton() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        document.getElementById('confirm-payment').disabled = !selectedPayment;
    }

    async processPayment() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        
        const orderData = {
            location: this.selectedLocation,
            items: this.cart,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentMethod: selectedPayment
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();
            if (result.success) {
                this.showOrderConfirmation(result.orderId, orderData);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment. Please try again.');
        }
    }

    showOrderConfirmation(orderId, orderData) {
        const paymentMethodText = {
            'upi': 'UPI Payment',
            'card': 'Credit/Debit Card',
            'cash': 'Cash Payment'
        };
        
        // Store employee name for order tracking
        localStorage.setItem('employeeName', orderData.location.employeeName);
        
        const detailsDiv = document.getElementById('order-details');
        detailsDiv.innerHTML = `
            <div class="success-message">
                <h3>✅ Order #${orderId} Accepted!</h3>
                <p class="success-text">Your payment has been processed successfully.</p>
            </div>
            <div class="order-info">
                <p><strong>Employee:</strong> ${orderData.location.employeeName}</p>
                <p><strong>Delivery Location:</strong> ${orderData.location.building}, ${orderData.location.floor}, ${orderData.location.department}, Seat ${orderData.location.seat}</p>
                <p><strong>Payment Method:</strong> ${paymentMethodText[orderData.paymentMethod]}</p>
                <h4>Items Ordered:</h4>
                <ul>
                    ${orderData.items.map(item => `<li>${item.name} x${item.quantity} - ₹${(item.price * item.quantity)}</li>`).join('')}
                </ul>
                <p class="total-amount"><strong>Total Paid: ₹${orderData.total}</strong></p>
                <p class="delivery-info">🍽️ Your food will be delivered to your seat within 15-20 minutes!</p>
                <button id="track-order" class="btn btn-primary" style="margin-top: 1rem;">Track My Orders</button>
            </div>
        `;
        this.showSection('confirmation-section');
        
        // Add track order button listener
        document.getElementById('track-order').addEventListener('click', () => {
            window.location.href = '/track-orders.html';
        });
        
        // Auto-scroll to confirmation section
        setTimeout(() => {
            document.getElementById('confirmation-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }

    resetApp() {
        this.cart = [];
        this.selectedLocation = {};
        document.getElementById('employee-name').value = '';
        document.getElementById('building').value = '';
        document.querySelectorAll('input[name="payment"]').forEach(radio => radio.checked = false);
        document.getElementById('confirm-payment').disabled = true;
        this.onBuildingChange();
        this.showSection('location-section');
        localStorage.removeItem('canteenSession');
    }

    showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    saveSession() {
        const session = {
            cart: this.cart,
            selectedLocation: this.selectedLocation,
            currentSection: document.querySelector('.section.active').id,
            formData: {
                employeeName: document.getElementById('employee-name').value,
                building: document.getElementById('building').value,
                floor: document.getElementById('floor').value,
                department: document.getElementById('department').value,
                seat: document.getElementById('seat').value
            },
            paymentMethod: document.querySelector('input[name="payment"]:checked')?.value
        };
        localStorage.setItem('canteenSession', JSON.stringify(session));
    }

    restoreSession() {
        const saved = localStorage.getItem('canteenSession');
        if (!saved) return;

        const session = JSON.parse(saved);
        this.cart = session.cart || [];
        this.selectedLocation = session.selectedLocation || {};

        // Restore form data
        if (session.formData.employeeName) {
            document.getElementById('employee-name').value = session.formData.employeeName;
        }
        if (session.formData.building) {
            document.getElementById('building').value = session.formData.building;
            this.onBuildingChange();
            setTimeout(() => {
                if (session.formData.floor) {
                    document.getElementById('floor').value = session.formData.floor;
                    this.onFloorChange();
                    setTimeout(() => {
                        if (session.formData.department) {
                            document.getElementById('department').value = session.formData.department;
                            this.onDepartmentChange();
                            setTimeout(() => {
                                if (session.formData.seat) {
                                    document.getElementById('seat').value = session.formData.seat;
                                    this.updateNextButton();
                                }
                            }, 50);
                        }
                    }, 50);
                }
            }, 50);
        }

        // Restore section and display
        if (session.currentSection === 'menu-section') {
            this.displayMenu();
            this.updateCartDisplay();
            if (this.selectedLocation.employeeName) {
                document.getElementById('employee-info').textContent = this.selectedLocation.employeeName;
                document.getElementById('delivery-location').textContent = 
                    `${this.selectedLocation.building}, ${this.selectedLocation.floor}, ${this.selectedLocation.department}, Seat ${this.selectedLocation.seat}`;
            }
            this.showSection('menu-section');
        } else if (session.currentSection === 'payment-section') {
            this.displayMenu();
            this.updateCartDisplay();
            this.displayPaymentSummary();
            if (session.paymentMethod) {
                document.querySelector(`input[name="payment"][value="${session.paymentMethod}"]`).checked = true;
                this.updatePaymentButton();
            }
            this.showSection('payment-section');
        }
    }
}

// Initialize the app
const app = new CanteenApp();