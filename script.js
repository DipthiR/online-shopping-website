const form = document.getElementById('userForm');
const detailsSection = document.getElementById('detailsSection');
const shopSection = document.getElementById('shopSection');

const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const displayAddress = document.getElementById('displayAddress');

const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const shopNowBtn = document.getElementById('shopNowBtn');

const orderSection = document.getElementById('orderSection');
const orderName = document.getElementById('orderName');
const orderEmail = document.getElementById('orderEmail');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
renderCart();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  displayName.textContent = name;
  displayEmail.textContent = email;
  displayAddress.textContent = address;

  detailsSection.style.display = 'block';
  shopSection.style.display = 'block';
  form.style.display = 'none';
});

function addToCart(product, price) {
  cart.push({ product, price });
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - RS.${item.price.toFixed(2)}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeFromCart(index);

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `Total: RS.${total.toFixed(2)}`;

  shopNowBtn.style.display = cart.length > 0 ? 'inline-block' : 'none';

  localStorage.setItem('cart', JSON.stringify(cart));
}

function shopNow() {
  orderName.textContent = displayName.textContent;
  orderEmail.textContent = displayEmail.textContent;

  orderItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - RS.${item.price.toFixed(2)}`;
    orderItems.appendChild(li);
  });

  orderTotal.textContent = `Order Total: RS.${cartTotal.textContent}`;

  shopSection.style.display = 'none';
  orderSection.style.display = 'block';

  cart = [];
  renderCart();
}

function viewDetails(name, price, image, description) {
  localStorage.setItem('product', JSON.stringify({ name, price, image, description }));
  window.location.href = 'product.html';
}
