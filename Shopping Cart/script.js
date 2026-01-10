// ============================================
// PROJECT #30: SHOPPING CART WITH TOTAL
// Skills: LocalStorage, CRUD operations, calculations, cart management
// ============================================

// ============================================
// PRODUCT DATA
// ============================================
// Array of product objects with id, name, price, emoji
let products = [
  { id: 1, name: "Laptop", price: 999.99, emoji: "💻" },
  { id: 2, name: "Smartphone", price: 699.99, emoji: "📱" },
  { id: 3, name: "Headphones", price: 199.99, emoji: "🎧" },
  { id: 4, name: "Camera", price: 549.99, emoji: "📷" },
  { id: 5, name: "Smartwatch", price: 249.99, emoji: "⌚" },
  { id: 6, name: "Keyboard", price: 129.99, emoji: "⌨️" },
  { id: 7, name: "Mouse", price: 79.99, emoji: "🖱️" },
  { id: 8, name: "Monitor", price: 399.99, emoji: "🖥️" },
  { id: 9, name: "Printer", price: 299.99, emoji: "🖨️" },
  { id: 10, name: "Game Console", price: 499.99, emoji: "🎮" },
  { id: 11, name: "Speaker", price: 149.99, emoji: "🔊" },
  { id: 12, name: "Microphone", price: 179.99, emoji: "🎤" },
  { id: 13, name: "Router", price: 129.99, emoji: "📡" },
  { id: 14, name: "USB Flash Drive", price: 29.99, emoji: "💾" },
  { id: 15, name: "External SSD", price: 189.99, emoji: "📀" },
  { id: 16, name: "Drone", price: 799.99, emoji: "🚁" },
  { id: 17, name: "VR Headset", price: 399.99, emoji: "🥽" },
  { id: 18, name: "Power Bank", price: 49.99, emoji: "🔋" },
  { id: 19, name: "Smart TV", price: 899.99, emoji: "📺" },
  { id: 20, name: "Coffee Maker", price: 99.99, emoji: "☕" },
];

// ============================================
// CART STATE
// ============================================
// Initialize empty cart array (will load from localStorage)
let cart = [];
// ============================================
// DOM ELEMENTS
// ============================================
// Get products grid container
// Get cart items container
// Get summary elements (subtotal, tax, total)
const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const total = document.getElementById("total");

// ============================================
// RENDER PRODUCTS FUNCTION
// ============================================
// Clear products grid
// Loop through products array
// For each product:
// Create product card with template literal
// Include: emoji, name, price, "Add to Cart" button
// Add data-id attribute to button for identifying product
// Append to products grid
// Add event listeners to all "Add to Cart" buttons
function renderProducts() {
  productsGrid.innerHTML = "";
  products.forEach((product) => {
    let productCard = `
  <div class="product-card">
    <div class="product-image">${product.emoji}</div>
    <div class="product-name">${product.name}</div>
    <div class="product-price">$${product.price}</div>
    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
  </div>
`;
    productsGrid.innerHTML += productCard;
  });
}
// ============================================
// ADD TO CART FUNCTION
// ============================================
// Get product id from button clicked
// Find the product in products array using id
// Check if product already exists in cart
// If exists:
// Find the cart item and increase quantity by 1
// If not exists:
// Add new item to cart with quantity: 1
// Save cart to localStorage
// Render cart

function addToCart(productId) {
  let foundProduct = products.find((product) => {
    return productId === product.id;
  });
  // Check if this product already exists in the cart
  let existingCartItem = cart.find((item) => item.id === productId);
  // If it exists in cart:
  if (existingCartItem) {
    existingCartItem.quantity = existingCartItem.quantity + 1;
  } else {
    cart.push({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
      emoji: foundProduct.emoji,
      quantity: 1,
    });
  }

  // Save and render (later
  saveCart();
  renderCart();
}
// ============================================
// RENDER CART FUNCTION
// ============================================
function renderCart() {
  // STEP 1: Clear cart items container (innerHTML = "")
  cartItems.innerHTML = "";
  // STEP 2: Check if cart array length is 0

  // STEP 3: If empty, create HTML with empty cart message (emoji + text)

  // STEP 4: Set cartItems innerHTML to empty message and return
  if (cart.length === 0) {
    let emptyHtml = `<div class="empty-cart-icon">🛒Cart is Empty</div>`;
    cartItems.innerHTML = emptyHtml;
    return;
  }
  // STEP 5: Loop through cart array with forEach

  // STEP 6: For each item, create template literal with:
  // - Outer div with class "cart-item"
  // - Item info div (emoji, name, price)
  // - Quantity controls div (-, quantity number, +)
  // - Remove button
  // - Add data-id to all buttons
  cart.forEach((item) => {
    let cartItemHTML = `
    <div class="cart-item">

      <div class="cart-item-info">
    ${item.emoji}
       <div class="cart-item-name">${item.name}</div>
         <div class="cart-item-price">$${item.price}</div>
      </div>
      
      <div class="cart-item-quantity">
       <button class="qty-btn" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-id="${item.id}">+</button>
      </div>
      
      <button class="remove-btn" data-id="${item.id}">Remove</button>
      
    </div>
  `;
    cartItems.innerHTML += cartItemHTML;
    // Append this HTML to cartItems
  });

  // STEP 8: Call updateCartSummary function
  updateCartSummary();
}

// ============================================
// UPDATE QUANTITY FUNCTION
// ============================================
function updateQuantity(productId, action) {
  // STEP 1: Find the cart item using cart.find() matching by id
  let foundCart = cart.find((item) => {
    return productId === item.id;
  });
  // STEP 2: Check if action === 'increase'
  // STEP 3: If yes, increase item.quantity by 1
  if (action === "increase") {
    foundCart.quantity = foundCart.quantity + 1;
  }
  // STEP 4: Check if action === 'decrease'
  // STEP 5: Decrease item.quantity by 1
  if (action === "decrease") {
    foundCart.quantity = foundCart.quantity - 1;
  }
  // STEP 6: Check if quantity is now 0
  // STEP 7: If yes, filter cart to remove this item (cart = cart.filter())
  if (foundCart.quantity === 0) {
    cart = cart.filter((item) => {
      return item.id !== productId;
    });
  }
  // STEP 8: Call saveCart function
  saveCart();
  // STEP 9: Call renderCart function
  renderCart();
}

// ============================================
// REMOVE FROM CART FUNCTION
// ============================================
function removeFromCart(productId) {
  // STEP 1: Filter cart array to remove item where id matches productId
  cart = cart.filter((item) => {
    return item.id !== productId;
  });
  // STEP 2: Call saveCart function
  saveCart();
  // STEP 3: Call renderCart function
  renderCart();
}
// ============================================
// UPDATE CART SUMMARY FUNCTION
// ============================================
function updateCartSummary() {
  // STEP 1: Calculate subtotal using cart.reduce()
  // Start with 0
  // For each item, add (item.price * item.quantity) to total
  let subtotalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  // STEP 2: Calculate tax (subtotal * 0.10)
  let taxAmount = subtotalAmount * 0.1;
  // STEP 3: Calculate total (subtotal + tax)
  let totalAmount = subtotalAmount + taxAmount;
  // STEP 4: Update subtotal element textContent with $ and .toFixed(2)
  subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
  // STEP 5: Update tax element textContent with $ and .toFixed(2)
  tax.textContent = `$${taxAmount.toFixed(2)}`;
  // STEP 6: Update total element textContent with $ and .toFixed(2)
  total.textContent = `$${totalAmount.toFixed(2)}`;
}

// ============================================
// LOCALSTORAGE FUNCTIONS
// ============================================
function saveCart() {
  // STEP 1: Convert cart array to JSON string using JSON.stringify()
  let cartString = JSON.stringify(cart);
  // STEP 2: Save to localStorage with key 'cart'
  localStorage.setItem("cart", cartString);
}

function loadCart() {
  // STEP 1: Get cart from localStorage with key 'cart'
  let cartArray = localStorage.getItem("cart");
  // STEP 2: Check if cart exists
  if (cartArray) {
    return JSON.parse(cartArray);
  } else {
    return [];
  }
}

// ============================================
// INITIAL RENDER
// ============================================
// STEP 1: Load cart from localStorage (cart = loadCart())
cart = loadCart();
// STEP 2: Call renderProducts function
renderProducts();
// STEP 3: Call renderCart function
renderCart();

// EVENT LISTNERS
productsGrid.addEventListener("click", (event) => {
  // Check if clicked element has class "add-to-cart-btn"
  if (event.target.classList.contains("add-to-cart-btn")) {
    // Get the productId from data-id
    let productId = Number(event.target.dataset.id);
    // Call addToCart(productId)
    addToCart(productId);
  }
});

cartItems.addEventListener("click", (event) => {
  // Check if decrease button (-) was clicked
  if (
    event.target.classList.contains("qty-btn") &&
    event.target.textContent === "-"
  ) {
    // Get productId from data-id
    let productId = Number(event.target.dataset.id);
    // Call updateQuantity(productId, 'decrease')
    updateQuantity(productId, "decrease");
  }

  // Check if increase button (+) was clicked
  if (
    event.target.classList.contains("qty-btn") &&
    event.target.textContent === "+"
  ) {
    // Get productId from data-id
    let productId = Number(event.target.dataset.id);
    // Call updateQuantity(productId, 'increase')
    updateQuantity(productId, "increase");
  }
  // Check if remove button was clicked
  if (event.target.classList.contains("remove-btn")) {
    // Get productId from data-id
    let productId = Number(event.target.dataset.id);
    // Call removeFromCart(productId)
    removeFromCart(productId);
  }
});
