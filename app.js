// Product Data with images and variants
const productsData = [
  {
    name: "Fresh Cow Milk",
    category: "milk",
    icon: "fa-glass-whiskey",
    image: "https://storage.googleapis.com/grazecart-images-prod/images/1f718515-dc5a-447f-89c1-db08e9d3db3d.jpg",
    variants: [
      { size: "500ml", price: 30 },
      { size: "1L", price: 60 }
    ],
    description: "Pure and fresh cow milk delivered daily from local farms"
  },
  {
    name: "Buffalo Milk",
    category: "milk",
    icon: "fa-wine-bottle",
    image: "https://s3.amazonaws.com/grazecart/millersbiodiversityfarm/images/1651691794_6272d112a00a4.jpeg",
    variants: [
      { size: "500ml", price: 35 },
      { size: "1L", price: 70 }
    ],
    description: "Rich and creamy buffalo milk, perfect for tea and sweets"
  },
  {
    name: "Pure Ghee",
    category: "ghee",
    icon: "fa-jar",
    image: "https://m.media-amazon.com/images/I/91CVt92XwkL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg",
    variants: [
      { size: "250g", price: 150 },
      { size: "500g", price: 280 }
    ],
    description: "Traditional pure ghee made from cow milk"
  },
  {
    name: "Fresh Paneer",
    category: "paneer",
    icon: "fa-cheese",
    image: "https://www.kesargrocery.com/images/P/Malai%20paneer%20block%20454g.jpg",
    variants: [
      { size: "250g", price: 80 },
      { size: "500g", price: 150 }
    ],
    description: "Soft and fresh paneer, made daily"
  },
  {
    name: "Curd (Dahi)",
    category: "curd",
    icon: "fa-ice-cream",
    image: "http://static1.squarespace.com/static/638d8044b6fc77648ebcedba/t/6780c27597989111f184217d/1736491642044/Thick+and+Creamy+Homemade+Curd-min.png?format=1500w",
    variants: [
      { size: "500g", price: 35 },
      { size: "1kg", price: 65 }
    ],
    description: "Thick and creamy curd with natural taste"
  },
  {
    name: "Butter",
    category: "butter",
    icon: "fa-cookie-bite",
    image: "https://thumbs.dreamstime.com/b/block-fresh-butter-wooden-cutting-board-sliced-against-blue-background-119564035.jpg",
    variants: [
      { size: "100g", price: 60 },
      { size: "250g", price: 140 }
    ],
    description: "Fresh homemade butter from pure cream"
  },
  {
    name: "Sweet Lassi",
    category: "lassi",
    icon: "fa-glass-martini",
    image: "https://assets.bonappetit.com/photos/60ef61ef7009278ef6bad579/4:3/w_2248,h_1686,c_limit/Lassi.jpg",
    variants: [
      { size: "200ml", price: 25 },
      { size: "500ml", price: 55 }
    ],
    description: "Refreshing sweet lassi made from fresh curd"
  },
  {
    name: "Salted Lassi",
    category: "lassi",
    icon: "fa-mug-hot",
    image: "https://130482409.cdn6.editmysite.com/uploads/1/3/0/4/130482409/J25KMU5HD7HLIMYTZSOHGFCE.jpeg",
    variants: [
      { size: "200ml", price: 25 },
      { size: "500ml", price: 55 }
    ],
    description: "Traditional salted lassi, perfect for summer"
  }
];

// Reviews Data
const reviewsData = [
  {
    customer: "Meera Singh",
    rating: 5,
    review: "Excellent quality milk. Tastes just like fresh from the farm. My kids love it!",
    date: "2025-10-20",
    product: "Fresh Cow Milk"
  },
  {
    customer: "Amit Verma",
    rating: 5,
    review: "Pure ghee with amazing aroma. Worth every rupee. Great for traditional cooking.",
    date: "2025-10-18",
    product: "Pure Ghee"
  },
  {
    customer: "Sunita Reddy",
    rating: 4,
    review: "Very good paneer quality. Fresh and soft. Slightly expensive but worth it.",
    date: "2025-10-15",
    product: "Fresh Paneer"
  },
  {
    customer: "Rakesh Jain",
    rating: 5,
    review: "The curd is thick and creamy. Perfect for making lassi and raita.",
    date: "2025-10-12",
    product: "Curd (Dahi)"
  },
  {
    customer: "Kavita Malhotra",
    rating: 5,
    review: "Buffalo milk is so rich and creamy. Best for making tea and desserts.",
    date: "2025-10-10",
    product: "Buffalo Milk"
  },
  {
    customer: "Deepak Gupta",
    rating: 4,
    review: "Good quality butter. Fresh taste. Delivery was on time. Happy with purchase.",
    date: "2025-10-08",
    product: "Butter"
  }
];

// Application State
let cart = [];
let currentUser = null;
let currentPage = 'home';
let selectedCategory = 'all';

// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const cartBadge = document.getElementById('cartBadge');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const loginBtn = document.getElementById('loginBtn');
const toast = document.getElementById('toast');

// Modal Elements
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');
const modalVariantSelect = document.getElementById('modalVariantSelect');
const modalBuyBtn = document.getElementById('modalBuyBtn');
const modalCartBtn = document.getElementById('modalCartBtn');
const closeModalBtn = document.getElementById('closeModal');

// Initialize App
function init() {
  renderFeaturedProducts();
  renderAllProducts();
  renderReviews();
  setupEventListeners();
  updateCartBadge();
  initCounterAnimations();
  initHeaderScroll();
  initVideoSlider(); // Safe even if markup missing
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-page]');
    if (target) {
      e.preventDefault();
      const page = target.getAttribute('data-page');
      navigateTo(page);
    }
  });

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Login button
  loginBtn.addEventListener('click', () => {
    navigateTo('login');
  });

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.getAttribute('data-category');
      renderAllProducts();
    });
  });

  // Auth tabs
  const authTabs = document.querySelectorAll('.auth-tab');
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      document.getElementById('loginForm').style.display = tabName === 'login' ? 'block' : 'none';
      document.getElementById('registerForm').style.display = tabName === 'register' ? 'block' : 'none';
    });
  });

  // Login form
  document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    currentUser = { email };
    showToast('Login successful! Welcome back.', 'success');
    loginBtn.textContent = 'Profile';
    setTimeout(() => navigateTo('products'), 1500);
  });

  // Register form
  document.getElementById('registerFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    currentUser = { name, email };
    showToast('Registration successful! Welcome to Purevale.', 'success');
    loginBtn.textContent = 'Profile';
    setTimeout(() => navigateTo('products'), 1500);
  });

  // Review form
  document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const rating = document.getElementById('reviewRating').value;
    const product = document.getElementById('reviewProduct').value;
    const text = document.getElementById('reviewText').value;
    
    const newReview = {
      customer: name,
      rating: parseInt(rating),
      review: text,
      date: new Date().toISOString().split('T')[0],
      product: product
    };
    
    reviewsData.unshift(newReview);
    renderReviews();
    e.target.reset();
    showToast('Thank you for your review!', 'success');
  });

  // Payment form
  document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    cart = [];
    updateCartBadge();
    showToast(`Order #${orderNumber} placed successfully! Redirecting...`, 'success');
    setTimeout(() => navigateTo('home'), 3000);
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! We will get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  // Modal close
  closeModalBtn.onclick = () => modal.style.display = 'none';
  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

// Navigation
function navigateTo(pageName) {
  currentPage = pageName;
  pages.forEach(page => page.style.display = 'none');
  const targetPage = document.getElementById(pageName);
  if (targetPage) {
    targetPage.style.display = 'block';
    window.scrollTo(0, 0);
  }
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageName) link.classList.add('active');
  });
  nav.classList.remove('active');

  if (pageName === 'cart') renderCart();
  else if (pageName === 'payment') renderOrderSummary();
}

// Render Featured Products
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const featured = productsData.slice(0, 6);
  container.innerHTML = featured.map(product => `
    <div class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" class="product-img"></div>
      <div class="product-info">
        <h3 class="product-name" onclick="showProductDetails('${product.name}')">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-variants">
          ${product.variants.map(v => `
            <div class="variant">
              <span class="variant-size">${v.size}</span>
              <span class="variant-price">₹${v.price}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary add-to-cart-btn" onclick="addToCart('${product.name}', '${product.variants[0].size}', ${product.variants[0].price}, '${product.icon}', '${product.image}')">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Render All Products
function renderAllProducts() {
  const container = document.getElementById('allProducts');
  const filtered = selectedCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);
  
  container.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" class="product-img"></div>
      <div class="product-info">
        <h3 class="product-name" onclick="showProductDetails('${product.name}')">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-variants">
          ${product.variants.map(v => `
            <div class="variant">
              <span class="variant-size">${v.size}</span>
              <span class="variant-price">₹${v.price}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary add-to-cart-btn" onclick="addToCart('${product.name}', '${product.variants[0].size}', ${product.variants[0].price}, '${product.icon}', '${product.image}')">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Product Details Modal
function showProductDetails(name) {
  const product = productsData.find(p => p.name === name);
  if (!product) return;

  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;
  modalImg.src = product.image;
  modalImg.alt = product.name;

  // Populate variant dropdown
  modalVariantSelect.innerHTML = product.variants.map((v, i) => `
    <option value="${i}">₹${v.price} - ${v.size}</option>
  `).join('');

  // Buy Now
  modalBuyBtn.onclick = () => {
    const idx = modalVariantSelect.value;
    const v = product.variants[idx];
    addToCart(product.name, v.size, v.price, product.icon, product.image);
    modal.style.display = 'none';
    navigateTo('cart');
  };

  // Add to Cart
  modalCartBtn.onclick = () => {
    const idx = modalVariantSelect.value;
    const v = product.variants[idx];
    addToCart(product.name, v.size, v.price, product.icon, product.image);
    modal.style.display = 'none';
    showToast('Added to cart!', 'success');
  };

  modal.style.display = 'flex';
}

// Add to Cart
function addToCart(name, size, price, icon, image) {
  const existing = cart.find(item => item.name === name && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, size, price, icon, image, quantity: 1 });
  }
  updateCartBadge();
  showToast('Item added to cart!', 'success');
}

// Update Cart Badge
function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.quantity, 0);
  cartBadge.textContent = total;
}

// Render Cart
function renderCart() {
  const container = document.getElementById('cartContent');
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">Cart</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious dairy products to get started!</p>
        <button class="btn btn--primary" data-page="products">Shop Now</button>
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal > 200 ? 0 : 30;
  const total = subtotal + delivery;

  container.innerHTML = `
    <div class="cart-items">
      ${cart.map((item, idx) => `
        <div class="cart-item">
          <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" class="cart-item-img"></div>
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>${item.size}</p>
            <p>₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn" onclick="updateQuantity(${idx}, -1)">-</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${idx}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${idx})">Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary">
      <h2>Summary</h2>
      <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
      <div class="summary-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span></div>
      ${subtotal < 200 ? `<p style="font-size:12px;color:var(--color-text-secondary);margin-top:8px;">Add ₹${200 - subtotal} more for free delivery</p>` : ''}
      <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>
      <div class="cart-actions">
        <button class="btn btn--primary btn--full-width" data-page="payment">Proceed to Payment</button>
        <button class="btn btn--outline btn--full-width" data-page="products">Continue Shopping</button>
      </div>
    </div>
  `;
}

// Update Quantity
function updateQuantity(idx, change) {
  cart[idx].quantity += change;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  updateCartBadge();
  renderCart();
}

// Remove from Cart
function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartBadge();
  renderCart();
  showToast('Item removed', 'success');
}

// Render Order Summary
function renderOrderSummary() {
  const container = document.getElementById('orderSummary');
  if (cart.length === 0) { navigateTo('cart'); return; }
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal > 200 ? 0 : 30;
  const total = subtotal + delivery;

  container.innerHTML = `
    ${cart.map(i => `<div class="order-summary-item"><span>${i.name} (${i.size}) × ${i.quantity}</span><span>₹${i.price * i.quantity}</span></div>`).join('')}
    <div class="order-summary-item"><span>Subtotal</span><span>₹${subtotal}</span></div>
    <div class="order-summary-item"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span></div>
    <div class="order-summary-item" style="font-weight:600;font-size:18px;"><span>Total</span><span>₹${total}</span></div>
  `;
}

// Render Reviews
function renderReviews() {
  const container = document.getElementById('reviewsList');
  container.innerHTML = reviewsData.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <div class="review-customer">${r.customer}</div>
          <div class="rating">${'<i class="fas fa-star"></i>'.repeat(r.rating)}</div>
        </div>
        <div class="review-date">${new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
      </div>
      <div class="review-product">${r.product}</div>
      <p class="review-text">${r.review}</p>
    </div>
  `).join('');
}

// Toast
function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Counter Animations
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.getAttribute('data-count'));
        let current = 0;
        const inc = target / 100;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current).toLocaleString() + '+';
          }
        }, 20);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// Header Scroll
function initHeaderScroll() {
  let last = 0;
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    const top = window.pageYOffset;
    if (top > last && top > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    last = top;
  });
}

// Video Slider (safe fallback)
function initVideoSlider() {
  const slides = document.querySelectorAll('.video-slide');
  if (!slides.length) return;
  // ... existing code (safe to keep)
}

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
