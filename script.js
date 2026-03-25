// Cafe Website JavaScript - Cart, Forms, Navigation

// Menu data (cafe items)
const menuItems = [
  { id: 1, name: 'Espresso', category: 'Coffee', price: 25000, img: 'https://images.unsplash.com/photo-1494314671902-399b18174975?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Strong black coffee' },
  { id: 2, name: 'Cappuccino', category: 'Coffee', price: 35000, img: 'https://images.unsplash.com/photo-1572444653929-255e524db6e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Coffee with milk foam' },
  { id: 3, name: 'Latte', category: 'Coffee', price: 38000, img: 'https://images.unsplash.com/photo-1572444652848-f6f2a1ab116e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Milky coffee' },
  { id: 4, name: 'Americano', category: 'Coffee', price: 30000, img: 'https://images.unsplash.com/photo-1488737972082-2e6e8551a287?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Diluted espresso' },
  { id: 5, name: 'Cheeseburger', category: 'Food', price: 45000, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Juicy beef patty' },
  { id: 6, name: 'Club Sandwich', category: 'Food', price: 40000, img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Triple decker' },
  { id: 7, name: 'Pasta Carbonara', category: 'Food', price: 55000, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Creamy bacon pasta' },
  { id: 8, name: 'Caesar Salad', category: 'Food', price: 35000, img: 'https://images.unsplash.com/photo-1546793668-c1e99ba4c48f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Fresh romaine salad' },
  { id: 9, name: 'Fresh Lemonade', category: 'Drinks', price: 25000, img: 'https://images.unsplash.com/photo-1621399241083-7df6b398ae47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Refreshing citrus' },
  { id: 10, name: 'Iced Tea', category: 'Drinks', price: 28000, img: 'https://images.unsplash.com/photo-1628306540004-7954d6a9c6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Chilled tea' },
  { id: 11, name: 'Orange Juice', category: 'Drinks', price: 30000, img: 'https://images.unsplash.com/photo-1604456398649-785499337441?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Fresh squeezed' },
  { id: 12, name: 'Tiramisu', category: 'Dessert', price: 40000, img: 'https://images.unsplash.com/photo-1541636415281-96b3f53b965d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Coffee soaked cake' },
  { id: 13, name: 'Cheesecake', category: 'Dessert', price: 38000, img: 'https://images.unsplash.com/photo-1544435432-7e88aecf2ce9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Creamy delight' },
  { id: 14, name: 'Brownie', category: 'Dessert', price: 35000, img: 'https://images.unsplash.com/photo-1534624283978-f8f092f284b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Chocolate chunk' }
];

// Cart functions
let cart = JSON.parse(localStorage.getItem('cafeCart')) || [];

function saveCart() {
  localStorage.setItem('cafeCart', JSON.stringify(cart));
}

function addToCart(id) {
  const item = menuItems.find(item => item.id === id);
  const existing = cart.find(cartItem => cartItem.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart();
  updateCartDisplay();
  alert(`${item.name} ditambahkan ke keranjang!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartDisplay();
}

function updateQuantity(id, change) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartDisplay();
    }
  }
}

function getTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const emptyMsg = document.getElementById('cart-empty');
  if (cartContainer) {
    if (cart.length === 0) {
      cartContainer.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
    } else {
      cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <span>${item.name} - Rp${item.price.toLocaleString()}</span>
          <div>
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})" style="background:#e74c3c;color:white;border:none;border-radius:50%;width:30px;height:30px;">×</button>
          </div>
          <small>${(item.price * item.quantity).toLocaleString()}</small>
        </div>
      `).join('');
      if (emptyMsg) emptyMsg.style.display = 'none';
    }
    if (totalEl) totalEl.textContent = `Total: Rp${getTotal().toLocaleString()}`;
  }
  // Update cart count in nav
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Render menu
function renderMenu(containerId, category = null) {
  const container = document.getElementById(containerId);
  let items = category ? menuItems.filter(item => item.category === category) : menuItems;
  container.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price">Rp${item.price.toLocaleString()}</div>
        <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Navigation
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Checkout
function processOrder() {
  const name = document.getElementById('customer-name').value;
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;
  if (!name || !address || cart.length === 0) {
    alert('Please fill all fields and add items to cart');
    return;
  }
  const orderDetails = cart.map(item => `${item.name} x${item.quantity} @Rp${item.price.toLocaleString()}`).join('\\n');
  const message = `Halo! Saya ingin pesan:%0A%0A${orderDetails}%0A%0ATotal: Rp${getTotal().toLocaleString()}%0A%0ANama: ${name}%0AAlamat: ${address}%0APembayaran: ${payment}`;
  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
  cart = [];
  saveCart();
  updateCartDisplay();
  alert('Order sent to WhatsApp! Thank you!');
}

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate send
    alert('Pesan terkirim! Kami akan hubungi segera.');
    form.reset();
  });
}

// Gallery shuffle (for about)
function initGallery() {
  // Simple shuffle for demo
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
  
  // Auto-render featured on home
  if (document.getElementById('featured-menu')) {
    renderMenu('featured-menu', 'Coffee');
  }
});

