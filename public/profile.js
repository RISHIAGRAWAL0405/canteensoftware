class ProfilePage {
    constructor() {
        this.employeeProfile = null;
        this.init();
    }

    async init() {
        const employeeId = localStorage.getItem('employeeId');
        const employeeName = localStorage.getItem('employeeName');
        
        if (!employeeId || !employeeName) {
            window.location.href = '/employee-login.html';
            return;
        }

        await this.loadProfile(employeeId);
        this.displayProfile();
        this.setupEventListeners();
    }

    async loadProfile(employeeId) {
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

    displayProfile() {
        if (!this.employeeProfile) return;

        document.getElementById('profile-name').textContent = this.employeeProfile.employeeName;
        document.getElementById('profile-id').textContent = `ID: ${this.employeeProfile.employeeId}`;
        document.getElementById('emp-id').textContent = this.employeeProfile.employeeId;
        document.getElementById('emp-name').textContent = this.employeeProfile.employeeName;

        const addressContent = document.getElementById('address-content');
        const lastAddress = this.employeeProfile.lastUsedAddress;

        if (lastAddress && lastAddress.building) {
            addressContent.innerHTML = `
                <div class="address-details">
                    <div class="address-item">
                        <i class="fas fa-building"></i>
                        <span><strong>Building:</strong> ${lastAddress.building}</span>
                    </div>
                    <div class="address-item">
                        <i class="fas fa-layer-group"></i>
                        <span><strong>Floor:</strong> ${lastAddress.floor}</span>
                    </div>
                    <div class="address-item">
                        <i class="fas fa-users"></i>
                        <span><strong>Department:</strong> ${lastAddress.department}</span>
                    </div>
                    <div class="address-item">
                        <i class="fas fa-chair"></i>
                        <span><strong>Seat:</strong> ${lastAddress.seat}</span>
                    </div>
                </div>
            `;
        } else {
            addressContent.innerHTML = `
                <p style="text-align: center; color: #718096; font-style: italic; padding: 1rem;">
                    No address saved yet. Place your first order to save an address.
                </p>
            `;
        }
    }

    setupEventListeners() {
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/employee-login.html';
        });
    }
}

new ProfilePage();
