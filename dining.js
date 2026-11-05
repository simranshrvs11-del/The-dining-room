const menuItems = [
    { id: 1, name: "Crispy Bruschetta", category: "appetizers", price: 12.00, desc: "Fresh tomatoes, garlic & basil on toasted bread.", img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Truffle Mushroom Soup", category: "appetizers", price: 10.00, desc: "Rich wild mushrooms infused with truffle oil.", img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Grilled Ribeye Steak", category: "mains", price: 35.00, desc: "Prime beef with rosemary butter & roasted veggies.", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Lobster Thermidor", category: "mains", price: 42.00, desc: "Fresh Atlantic lobster baked in cheese sauce.", img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Molten Lava Cake", category: "desserts", price: 12.00, desc: "Warm gooey chocolate cake with vanilla gelato.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Virgin Mint Mojito", category: "beverages", price: 8.00, desc: "Refreshing mint leaves, fresh lime juice & soda.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80" }
];

let cart = [];

function switchSection(sectionId) {
    document.querySelectorAll('.section-page').forEach(sec => sec.classList.remove('active'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('active');
}

function renderMenu(category = 'all') {
    const grid = document.getElementById('foodGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? menuItems 
        : menuItems.filter(i => i.category === category);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-img">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="food-info">
                <div style="display:flex; justify-content:space-between; font-weight:700;">
                    <h4>${item.name}</h4>
                    <span style="color:var(--primary-pink);">$${item.price.toFixed(2)}</span>
                </div>
                <p style="color:var(--text-muted); font-size:12px; margin:6px 0 14px 0;">${item.desc}</p>
                <button class="btn-pink-sm" onclick="addToCart(${item.id})">Add to Cart 🛒</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterMenu(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderMenu(category);
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    if (item) {
        cart.push(item);
        updateCartUI();
        showToast(`Added ${item.name} to cart! 🍽️`);
    }
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const list = document.getElementById('cartItemsList');
    const totalContainer = document.getElementById('cartTotalContainer');
    const totalPriceElem = document.getElementById('cartTotalPrice');

    if (badge) badge.textContent = cart.length;
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `<p style="text-align: center; color: var(--text-muted);">Your cart is empty right now!</p>`;
        if (totalContainer) totalContainer.style.display = 'none';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">
                <span>${item.name}</span>
                <div>
                    <span style="margin-right:15px; color: var(--primary-pink); font-weight:bold;">$${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
    if (totalPriceElem) totalPriceElem.textContent = `$${total.toFixed(2)}`;
    if (totalContainer) totalContainer.style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showToast("Item removed from cart");
}

function checkoutCart() {
    if (cart.length === 0) return;
    showToast("Order placed successfully! Enjoy your meal 🚀🍽️");
    cart = [];
    updateCartUI();
    switchSection('home');
}

function handleReservation(e) {
    e.preventDefault();
    showToast('Table reservation confirmed! 🎉🍽️');
    document.getElementById('reservationForm').reset();
    switchSection('home');
}

function handleContact(e) {
    e.preventDefault();
    showToast('Message sent successfully! We will contact you soon 🚀');
    document.getElementById('contactForm').reset();
    switchSection('home');
}

// Directions Modal Actions
function openDirections() {
    const modal = document.getElementById('directionsModal');
    if (modal) modal.style.display = 'flex';
}

function closeDirections() {
    const modal = document.getElementById('directionsModal');
    if (modal) modal.style.display = 'none';
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

const mobileToggle = document.getElementById('mobileMenuToggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
    });
}

window.onload = () => {
    renderMenu('all');
    updateCartUI();

    // Button click animation handler
    const allButtons = document.querySelectorAll("button, .filter-btn, .reserve-btn, .cat-card");
    allButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.style.transform = "scale(0.95)";
            setTimeout(() => {
                button.style.transform = "scale(1)";
            }, 150);
        });
    });
};