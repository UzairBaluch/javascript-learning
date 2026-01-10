// ============================================
// SHOPPING CART WITH TOTAL
// ============================================

// PRODUCT DATA - Tech products catalog with prices
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

// CART STATE - Store cart items
let cart = [];

// DOM ELEMENTS - Get product grid, cart container, and price displays
const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const total = document.getElementById("total");

// RENDER PRODUCTS - Display all products in grid
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

// ADD TO CART - Add product or increase quantity if already in cart
function addToCart(productId) {
  let foundProduct = products.find((product) => {
    return productId === product.id;
  });

  let existingCartItem = cart.find((item) => item.id === productId);

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

  saveCart();
  renderCart();
}

// RENDER CART - Display cart items or empty message
function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    let emptyHtml = `<div class="empty-cart-icon">🛒Cart is Empty</div>`;
    cartItems.innerHTML = emptyHtml;
    return;
  }

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
  });

  updateCartSummary();
}

// UPDATE QUANTITY - Increase, decrease, or remove items based on quantity
function updateQuantity(productId, action) {
  let foundCart = cart.find((item) => {
    return productId === item.id;
  });

  if (action === "increase") {
    foundCart.quantity = foundCart.quantity + 1;
  }

  if (action === "decrease") {
    foundCart.quantity = foundCart.quantity - 1;
  }

  if (foundCart.quantity === 0) {
    cart = cart.filter((item) => {
      return item.id !== productId;
    });
  }

  saveCart();
  renderCart();
}

// REMOVE FROM CART - Delete item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => {
    return item.id !== productId;
  });

  saveCart();
  renderCart();
}

// UPDATE CART SUMMARY - Calculate and display subtotal, tax (10%), and total
function updateCartSummary() {
  let subtotalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  let taxAmount = subtotalAmount * 0.1;
  let totalAmount = subtotalAmount + taxAmount;

  subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
  tax.textContent = `$${taxAmount.toFixed(2)}`;
  total.textContent = `$${totalAmount.toFixed(2)}`;
}

// SAVE CART - Store cart in localStorage
function saveCart() {
  let cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
}

// LOAD CART - Retrieve cart from localStorage
function loadCart() {
  let cartArray = localStorage.getItem("cart");

  if (cartArray) {
    return JSON.parse(cartArray);
  } else {
    return [];
  }
}

// INITIAL LOAD - Load saved cart and display products
cart = loadCart();
renderProducts();
renderCart();

// ADD TO CART EVENT - Handle product add button clicks
productsGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    let productId = Number(event.target.dataset.id);
    addToCart(productId);
  }
});

// CART ACTIONS EVENT - Handle quantity and remove button clicks
cartItems.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("qty-btn") &&
    event.target.textContent === "-"
  ) {
    let productId = Number(event.target.dataset.id);
    updateQuantity(productId, "decrease");
  }

  if (
    event.target.classList.contains("qty-btn") &&
    event.target.textContent === "+"
  ) {
    let productId = Number(event.target.dataset.id);
    updateQuantity(productId, "increase");
  }

  if (event.target.classList.contains("remove-btn")) {
    let productId = Number(event.target.dataset.id);
    removeFromCart(productId);
  }
});
