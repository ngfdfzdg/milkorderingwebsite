// Product Data
const productsData = [
  {
    name: "Fresh Cow Milk",
    category: "milk",
    icon: "fa-glass-whiskey",
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
    product: "Curd"
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

// Application State (in-memory)
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

// Initialize App
function init() {
  renderFeaturedProducts();
  renderAllProducts();
  renderReviews();
  setupEventListeners();
  updateCartBadge();
  initCounterAnimations();
  initHeaderScroll();
  initVideoSlider();
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
    setTimeout(() => navigateTo('products'), 1500);
  });

  // Register form
  document.getElementById('registerFormElement').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    currentUser = { name, email };
    showToast('Registration successful! Welcome to Purevale.', 'success');
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
}

// Navigation
function navigateTo(pageName) {
  currentPage = pageName;
  
  // Hide all pages
  pages.forEach(page => {
    page.style.display = 'none';
  });
  
  // Show selected page
  const targetPage = document.getElementById(pageName);
  if (targetPage) {
    targetPage.style.display = 'block';
    window.scrollTo(0, 0);
  }
  
  // Update navigation active state
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('active');
    }
  });
  
  // Close mobile menu
  nav.classList.remove('active');
  
  // Update page-specific content
  if (pageName === 'cart') {
    renderCart();
  } else if (pageName === 'payment') {
    renderOrderSummary();
  }
}

// Render Featured Products (Home Page)
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const featured = productsData.slice(0, 6);
  
  container.innerHTML = featured.map(product => `
    <div class="product-card">
      <div class="product-image"><i class="fas ${product.icon}"></i></div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-variants">
          ${product.variants.map(variant => `
            <div class="variant">
              <span class="variant-size">${variant.size}</span>
              <span class="variant-price">₹${variant.price}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary add-to-cart-btn" onclick="addToCart('${product.name}', '${product.variants[0].size}', ${product.variants[0].price}, '${product.icon}')">
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
      <div class="product-image"><i class="fas ${product.icon}"></i></div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-variants">
          ${product.variants.map((variant, idx) => `
            <div class="variant">
              <span class="variant-size">${variant.size}</span>
              <span class="variant-price">₹${variant.price}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--primary add-to-cart-btn" onclick="addToCart('${product.name}', '${product.variants[0].size}', ${product.variants[0].price}, '${product.icon}')">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Add to Cart
function addToCart(name, size, price, icon) {
  const existingItem = cart.find(item => item.name === name && item.size === size);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, size, price, icon, quantity: 1 });
  }
  
  updateCartBadge();
  showToast('Item added to cart!', 'success');
}

// Update Cart Badge
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

// Render Cart
function renderCart() {
  const container = document.getElementById('cartContent');
  const emptyCart = document.getElementById('emptyCart');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious dairy products to get started!</p>
        <button class="btn btn--primary" data-page="products">Shop Now</button>
      </div>
    `;
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharges = subtotal > 200 ? 0 : 30;
  const total = subtotal + deliveryCharges;
  
  container.innerHTML = `
    <div class="cart-items">
      ${cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-image"><i class="fas ${item.icon}"></i></div>
          <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-variant">${item.size}</p>
            <p class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn" onclick="updateQuantity(${index}, -1)"><i class="fas fa-minus"></i></button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${index}, 1)"><i class="fas fa-plus"></i></button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i> Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="cart-summary">
      <h2>Cart Summary</h2>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>₹${subtotal}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Charges</span>
        <span>${deliveryCharges === 0 ? 'FREE' : '₹' + deliveryCharges}</span>
      </div>
      ${subtotal < 200 ? '<p style="font-size: 12px; color: var(--color-text-secondary); margin-top: 8px;">Add ₹' + (200 - subtotal) + ' more for free delivery</p>' : ''}
      <div class="summary-row total">
        <span>Total</span>
        <span>₹${total}</span>
      </div>
      <div class="cart-actions">
        <button class="btn btn--primary btn--full-width" data-page="payment">Proceed to Payment</button>
        <button class="btn btn--outline btn--full-width" data-page="products">Continue Shopping</button>
      </div>
    </div>
  `;
}

// Update Quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  
  updateCartBadge();
  renderCart();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCart();
  showToast('Item removed from cart', 'success');
}

// Render Order Summary (Payment Page)
function renderOrderSummary() {
  const container = document.getElementById('orderSummary');
  
  if (cart.length === 0) {
    navigateTo('cart');
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharges = subtotal > 200 ? 0 : 30;
  const total = subtotal + deliveryCharges;
  
  container.innerHTML = `
    ${cart.map(item => `
      <div class="order-summary-item">
        <span>${item.name} (${item.size}) × ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </div>
    `).join('')}
    <div class="order-summary-item">
      <span>Subtotal</span>
      <span>₹${subtotal}</span>
    </div>
    <div class="order-summary-item">
      <span>Delivery Charges</span>
      <span>${deliveryCharges === 0 ? 'FREE' : '₹' + deliveryCharges}</span>
    </div>
    <div class="order-summary-item" style="font-weight: 600; font-size: 18px;">
      <span>Total</span>
      <span>₹${total}</span>
    </div>
  `;
}

// Render Reviews
function renderReviews() {
  const container = document.getElementById('reviewsList');
  
  container.innerHTML = reviewsData.map(review => `
    <div class="review-card">
      <div class="review-header">
        <div>
          <div class="review-customer">${review.customer}</div>
          <div class="rating">${'<i class="fas fa-star"></i>'.repeat(review.rating)}</div>
        </div>
        <div class="review-date">${new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
      </div>
      <div class="review-product">${review.product}</div>
      <p class="review-text">${review.review}</p>
    </div>
  `).join('');
}

// Show Toast Notification
function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Counter Animations
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString() + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString() + '+';
    }
  };

  updateCounter();
}

// Header Scroll Hide/Show
function initHeaderScroll() {
  let lastScrollTop = 0;
  const header = document.getElementById('header');
  const scrollThreshold = 100;

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down & past threshold
      header.classList.add('hidden');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// Video Slider
let currentSlideIndex = 0;
let autoPlayInterval = null;

function initVideoSlider() {
  const slides = document.querySelectorAll('.video-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  
  if (!slides.length) return;
  
  // Arrow buttons
  prevBtn.addEventListener('click', () => {
    changeSlide(-1);
    resetAutoPlay();
  });
  
  nextBtn.addEventListener('click', () => {
    changeSlide(1);
    resetAutoPlay();
  });
  
  // Dot indicators
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToSlide(index);
      resetAutoPlay();
    });
  });
  
  // Start auto-play
  startAutoPlay();
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.video-slide');
  const dots = document.querySelectorAll('.dot');
  
  // Remove active class from current slide
  slides[currentSlideIndex].classList.remove('active');
  slides[currentSlideIndex].classList.add('prev');
  dots[currentSlideIndex].classList.remove('active');
  
  // Calculate new index
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  // Add active class to new slide
  setTimeout(() => {
    slides.forEach(s => s.classList.remove('prev'));
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }, 50);
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.video-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (index === currentSlideIndex) return;
  
  // Remove active class from current slide
  slides[currentSlideIndex].classList.remove('active');
  dots[currentSlideIndex].classList.remove('active');
  
  // Update index
  currentSlideIndex = index;
  
  // Add active class to new slide
  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    changeSlide(1);
  }, 5000); // Change slide every 5 seconds
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}