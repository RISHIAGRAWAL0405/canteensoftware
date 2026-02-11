class CanteenApp {
    constructor() {
        this.buildings = [];
        this.menu = [];
        this.cart = [];
        this.selectedLocation = {};
        this.employeeProfile = null;
        this.foodImages = this.getFoodImages();
        this.init();
    }

    getFoodImages() {
        return {
            101: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            102: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            103: 'https://images.unsplash.com/photo-1571197119282-7c4e2b2d2c4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            104: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            105: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            201: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            202: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            203: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            204: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            205: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            206: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            301: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            302: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            303: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            304: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            305: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            401: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            402: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            403: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            404: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            405: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            406: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            501: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            502: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            503: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            504: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            505: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            506: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            507: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            601: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            602: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            603: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            604: 'https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            605: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            606: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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
        // Check if employee is logged in
        const employeeId = localStorage.getItem('employeeId');
        const employeeName = localStorage.getItem('employeeName');
        
        if (!employeeId || !employeeName) {
            window.location.href = '/employee-login.html';
            return;
        }

        // Load employee profile
        await this.loadEmployeeProfile(employeeId);
        
        // Setup header
        document.getElementById('header-employee-info').textContent = `${employeeName} (${employeeId})`;
        document.getElementById('employee-name').value = employeeName;
        document.getElementById('employee-id-display').value = employeeId;
        
        await this.loadBuildings();
        await this.loadMenu();
        this.setupEventListeners();
        this.populateBuildings();
        
        // Load saved address if exists
        if (this.employeeProfile && this.employeeProfile.savedAddress) {
            this.loadSavedAddress();
        }
    }

    async loadEmployeeProfile(employeeId) {
        try {
            const response = await fetch(`/api/employee/${employeeId}`);
            const result = await response.json();
            if (result.success) {
                this.employeeProfile = result.profile;
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    loadSavedAddress() {
        const saved = this.employeeProfile.lastUsedAddress;
        if (!saved || !saved.buildingId) return;
        
        document.getElementById('building').value = saved.buildingId;
        this.onBuildingChange();
        
        setTimeout(() => {
            document.getElementById('floor').value = saved.floorId;
            this.onFloorChange();
            
            setTimeout(() => {
                document.getElementById('department').value = saved.deptId;
                this.onDepartmentChange();
                
                setTimeout(() => {
                    document.getElementById('seat').value = saved.seatId;
                    this.onSeatChange();
                }, 100);
            }, 100);
        }, 100);
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
        document.getElementById('building').addEventListener('change', () => this.onBuildingChange());
        document.getElementById('floor').addEventListener('change', () => this.onFloorChange());
        document.getElementById('department').addEventListener('change', () => this.onDepartmentChange());
        document.getElementById('seat').addEventListener('change', () => this.onSeatChange());
        document.getElementById('next-to-menu').addEventListener('click', () => this.showMenuSection());
        document.getElementById('back-to-location').addEventListener('click', () => this.showLocationSection());
        document.getElementById('view-cart').addEventListener('click', () => this.goToCart());
        document.getElementById('back-to-menu').addEventListener('click', () => this.showMenuSection());
        document.getElementById('confirm-payment').addEventListener('click', () => this.processPayment());
        document.getElementById('new-order').addEventListener('click', () => this.resetApp());
        
        document.getElementById('logout-employee').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/employee-login.html';
        });
        
        document.getElementById('track-orders-btn').addEventListener('click', () => {
            window.location.href = '/track-orders.html';
        });
        
        document.getElementById('view-profile').addEventListener('click', () => {
            window.location.href = '/profile.html';
        });
        
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', () => this.updatePaymentButton());
        });
    }

    showProfile() {
        const saved = this.employeeProfile.lastUsedAddress;
        let addressText = 'No saved address';
        
        if (saved && saved.building) {
            addressText = `${saved.building}, ${saved.floor}, ${saved.department}, Seat ${saved.seat}`;
        }
        
        alert(`Employee Profile\n\nID: ${this.employeeProfile.employeeId}\nName: ${this.employeeProfile.employeeName}\nLast Used Address: ${addressText}`);
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
        const seatSelected = document.getElementById('seat').value;
        nextBtn.disabled = !seatSelected;
    }

    goToCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('selectedLocation', JSON.stringify(this.selectedLocation));
        window.location.href = '/cart.html';
    }

    async showMenuSection() {
        await this.saveSelectedLocation();
        this.displayMenu();
        this.showSection('menu-section');
        setTimeout(() => {
            document.getElementById('menu-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }

    showLocationSection() {
        this.showSection('location-section');
    }

    async saveSelectedLocation() {
        const employeeId = localStorage.getItem('employeeId');
        const employeeName = localStorage.getItem('employeeName');
        const buildingId = parseInt(document.getElementById('building').value);
        const floorId = parseInt(document.getElementById('floor').value);
        const deptId = parseInt(document.getElementById('department').value);
        const seatId = document.getElementById('seat').value;

        const building = this.buildings.find(b => b.id === buildingId);
        const floor = building.floors.find(f => f.id === floorId);
        const department = floor.departments.find(d => d.id === deptId);
        const seat = department.seats.find(s => s.id === seatId);

        this.selectedLocation = {
            employeeId,
            employeeName,
            building: building.name,
            floor: floor.name,
            department: department.name,
            seat: seat.number,
            seatId: seatId,
            buildingId,
            floorId,
            deptId
        };

        document.getElementById('employee-info').textContent = `${employeeName} (${employeeId})`;
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
                const descId = `desc-${item.id}`;
                itemDiv.innerHTML = `
                    <img src="${imageUrl}" alt="${item.name}" class="item-image" loading="lazy">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p id="${descId}">${item.description}</p>
                        ${item.description.length > 80 ? `<button class="read-more-btn" onclick="app.toggleDescription('${descId}')">Read more</button>` : ''}
                    </div>
                    <div class="item-price">₹${item.price}</div>
                    <div class="item-actions">
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity" id="qty-${item.id}">0</span>
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
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

        if (item.available === false && change > 0) {
            alert(`${item.name} is currently unavailable!`);
            return;
        }

        const cartItem = this.cart.find(ci => ci.id === itemId);
        
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                this.cart = this.cart.filter(ci => ci.id !== itemId);
            }
        } else if (change > 0) {
            this.cart.push({
                id: itemId,
                name: item.name,
                price: item.price,
                quantity: 1
            });
        }

        this.updateCartDisplay();
    }

    findMenuItem(itemId) {
        for (const category of this.menu) {
            const item = category.items.find(i => i.id === itemId);
            if (item) return item;
        }
        return null;
    }

    updateCartDisplay() {
        this.menu.forEach(category => {
            category.items.forEach(item => {
                const qtyElement = document.getElementById(`qty-${item.id}`);
                if (qtyElement) {
                    const cartItem = this.cart.find(ci => ci.id === item.id);
                    qtyElement.textContent = cartItem ? cartItem.quantity : 0;
                }
            });
        });

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

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('total').textContent = total;
        document.getElementById('view-cart').disabled = this.cart.length === 0;
        
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('selectedLocation', JSON.stringify(this.selectedLocation));
    }

    showPaymentSection() {
        this.displayPaymentSummary();
        document.querySelector('input[name="payment"]').checked = true;
        document.getElementById('confirm-payment').disabled = false;
        this.showSection('payment-section');
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
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const upiId = '7597649518@ptyes';
        const payeeName = 'GenusCanteen';
        
        this.showUpiPaymentOptions(total, upiId, payeeName);
    }
    
    showUpiPaymentOptions(amount, upiId, payeeName) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999';
        modal.innerHTML = `
            <div style="background:white;padding:2rem;border-radius:15px;max-width:400px;width:90%;text-align:center">
                <h3 style="margin-bottom:1.5rem;color:#2d3748">💳 Pay ₹${amount}</h3>
                <p style="margin-bottom:0.5rem;color:#4a5568;font-size:0.9rem">Pay to UPI ID:</p>
                <p style="margin-bottom:1.5rem;color:#2d3748;font-weight:700;font-size:1.1rem;background:#f7fafc;padding:0.8rem;border-radius:8px">${upiId}</p>
                <p style="margin-bottom:1rem;color:#718096;font-size:0.85rem">Select your payment app:</p>
                <div style="display:flex;flex-direction:column;gap:1rem">
                    <button onclick="app.openPaymentApp('phonepe', '${upiId}', '${payeeName}', ${amount})" 
                       style="background:#5f259f;color:white;padding:1rem;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:1rem">
                       📱 Pay with PhonePe
                    </button>
                    <button onclick="app.openPaymentApp('gpay', '${upiId}', '${payeeName}', ${amount})" 
                       style="background:#2d7ff9;color:white;padding:1rem;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:1rem">
                       💳 Pay with Google Pay
                    </button>
                    <button onclick="app.openPaymentApp('paytm', '${upiId}', '${payeeName}', ${amount})" 
                       style="background:#00b9f5;color:white;padding:1rem;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:1rem">
                       💰 Pay with Paytm
                    </button>
                    <button onclick="app.openPaymentApp('amazon', '${upiId}', '${payeeName}', ${amount})" 
                       style="background:#ff9900;color:white;padding:1rem;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:1rem">
                       🛒 Pay with Amazon Pay
                    </button>
                </div>
                <div style="margin-top:1.5rem;padding:1rem;background:#fff3cd;border-radius:8px;border:1px solid #ffc107">
                    <p style="margin:0;color:#856404;font-size:0.85rem">⚠️ If app doesn't open, copy UPI ID and pay manually</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-top:1rem;padding:0.75rem 1.5rem;background:#e53e3e;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600">
                    ❌ Cancel
                </button>
                <p style="margin-top:1rem;font-size:0.875rem;color:#718096">After completing payment, click below:</p>
                <button id="confirm-after-payment" 
                        style="margin-top:0.5rem;padding:0.75rem 1.5rem;background:#48bb78;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600">
                    ✅ I've Completed Payment
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        document.getElementById('confirm-after-payment').addEventListener('click', async () => {
            modal.remove();
            await this.submitOrder();
        });
    }
    
    openPaymentApp(app, upiId, payeeName, amount) {
        let paymentUrl = '';
        
        switch(app) {
            case 'phonepe':
                paymentUrl = `phonepe://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;
                break;
            case 'gpay':
                paymentUrl = `tez://upi/pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;
                break;
            case 'paytm':
                paymentUrl = `paytmmp://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;
                break;
            case 'amazon':
                paymentUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&mode=04`;
                break;
        }
        
        // Try to open the app
        const link = document.createElement('a');
        link.href = paymentUrl;
        link.click();
        
        // Fallback: Show manual UPI ID if app doesn't open
        setTimeout(() => {
            const fallbackMsg = `If ${app} didn't open, please pay manually to UPI ID: ${upiId}`;
            console.log(fallbackMsg);
        }, 2000);
    }
    
    async submitOrder() {
        const orderData = {
            location: this.selectedLocation,
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
                this.showOrderConfirmation(result.orderId, orderData);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment. Please try again.');
        }
    }

    showOrderConfirmation(orderId, orderData) {
        const detailsDiv = document.getElementById('order-details');
        detailsDiv.innerHTML = `
            <div class="success-message">
                <h3>✅ Order #${orderId} Accepted!</h3>
                <p class="success-text">Your payment has been processed successfully.</p>
            </div>
            <div class="order-info">
                <p><strong>Employee:</strong> ${orderData.location.employeeName} (${orderData.location.employeeId})</p>
                <p><strong>Delivery Location:</strong> ${orderData.location.building}, ${orderData.location.floor}, ${orderData.location.department}, Seat ${orderData.location.seat}</p>
                <p><strong>Payment Method:</strong> UPI Payment (7597649518@ptyes)</p>
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
        
        document.getElementById('track-order').addEventListener('click', () => {
            window.location.href = '/track-orders.html';
        });
        
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
        document.querySelector('input[name="payment"]').checked = true;
        this.showSection('location-section');
    }

    toggleDescription(descId) {
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

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }
}

const app = new CanteenApp();