// Loading and rendering product data from a server.
// Redirecting unauthenticated users to the login page.
// Adding, updating, and removing products in the cart.
// Calculating and displaying the total cost of the cart.
// Placing an order by sending cart data to the server.
// Searching and sorting the product list based on user input.
// Persisting cart data in session storage across page loads.



window.onload = loadProducts;

let cart = {};

function checkAccessTokenAndRedirect() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "login.html";
  }
}

function loadProducts() {
  checkAccessTokenAndRedirect();
  fetch("http://localhost:5000/products", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then(handleProductData)
    .catch((error) => console.error(error));
}

function handleProductData(data) {
  if (data.error) {
    document.getElementById("tbodyProductList").innerHTML = data.error;
  } else {
    if (data) {
      localStorage.setItem("products", JSON.stringify(data));
      renderProducts(data);
      getCartFromSessionStorage(data);
    }
  }
}

function renderProducts(data) {
  let rows = "";
  data.forEach((singleRow) => {
    rows += createProductRow(singleRow);
  });

  document.getElementById("tbodyProductList").innerHTML = rows;
}

function createProductRow(singleRow) {
  return `<tr id="${singleRow.id}">
          <td>${singleRow.id}</td>
          <td>${singleRow.title}</td>
          <td>${singleRow.description}</td>
          <td id="${singleRow.id}-stock">${
    singleRow.stock === 0 ? "Out of Stock" : singleRow.stock
  }</td>
          <td><img src="${singleRow.image}" width="100px"></td>
          <td>${singleRow.price}</td>
          <td><button class="btn btn-sm btn-primary" onclick='addToCart(${JSON.stringify(
            singleRow
          )})' ${
    singleRow.stock === 0 ? "disabled" : ""
  }>add to cart</button></td>
      </tr>`;
}

function addToCart(item) {
  if (!cart || !cart[item.id]) {
    cart[item.id] = { ...item, quantity: 1 };
  } else if (cart && cart[item.id]) {
    cart[item.id].quantity += 1;
  }

  renderCartItems();
}

function enablePlaceOrder() {
  document.getElementById("placeOrder").removeAttribute("disabled");
}

function removeFromCart(item) {
  delete cart[item.id];
  if (!cart || Object.keys(cart).length === 0) {
    disablePlaceOrder();
    const tbodyCart = document.getElementById("tbodyCart");
    tbodyCart.innerHTML = `<tr><td colspan="10">There is no item in your cart!</td></tr>`;
  }

  renderCartItems();
}

function disablePlaceOrder() {
  document.getElementById("placeOrder").setAttribute("disabled", true);
}

function renderCartItems(updateSession = true) {
  if (updateSession) {
    updateCartInSessionStorage(cart);
  }

  const tbodyCart = document.getElementById("tbodyCart");
  tbodyCart.innerHTML = "";

  let totalCost = 0;
  for (const key in cart) {
    enablePlaceOrder();
    const row = createCartItemRow(cart[key]);
    tbodyCart.appendChild(row);
    totalCost += cart[key].quantity * cart[key].price;
  }

  const totalCostElement = document.getElementById("totalCost");
  totalCostElement.innerText = "Total Cost: $" + totalCost.toFixed(2);
}

function createCartItemRow(item) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${item.title}</td>
    <td>${item.price}</td>
    <td>${item.quantity * item.price}</td>
    <td>
      <button onclick='changeQuantity(${JSON.stringify(item)}, -1)'>-</button>
      <input type="text" value="${
        item.quantity
      }" style="width: 50px; text-align: center;" onchange='handleQuantityChange(event, ${JSON.stringify(
    item
  )})' />
      <button onclick='changeQuantity(${JSON.stringify(item)}, 1)'>+</button>
    </td>
    <td>
      <button onclick='removeFromCart(${JSON.stringify(item)})'>Remove</button>
    </td>
  `;

  return row;
}

function changeQuantity(item, change, newValue) {
  if (newValue !== undefined) {
    cart[item.id].quantity = newValue;
  } else {
    cart[item.id].quantity += change;
  }

  if (cart[item.id].quantity < 1) {
    removeFromCart(item);
  }

  renderCartItems();
}

function handleQuantityChange(event, item) {
  const newValue = parseInt(event.target.value);
  changeQuantity(item, 0, newValue);
}

function placeOrder() {
  if (!cart || Object.keys(cart).length === 0) {
    alert("Item quantity must be greater than 0");
    return;
  }

  const cartData = Object.values(cart);
  fetch("http://localhost:5000/Order/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(cartData),
  })
    .then((response) => response.json())
    .then(handleOrderResponse)
    .catch((error) => {
      console.error(error);
      enablePlaceOrder();
    });
}

function handleOrderResponse(data) {
  disablePlaceOrder();
  cart = {};
  renderCartItems();
  loadProducts();
}

function searchProducts(searchTerm) {
  let term = searchTerm.toLowerCase();
  const allProducts = JSON.parse(localStorage.getItem("products"));
  const filteredProducts = allProducts.filter((product) =>
    (
      product.title +
      product.description +
      product.price +
      product.stock +
      product.id
    )
      .toLowerCase()
      .includes(term)
  );
  renderProducts(filteredProducts);
}

document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value;
  searchProducts(searchTerm);
});

document.getElementById("searchInput").addEventListener("keyup", () => {
  const searchTerm = document.getElementById("searchInput").value;
  searchProducts(searchTerm);
});

function sortProducts(sortMethod) {
  const allProducts = JSON.parse(localStorage.getItem("products"));

  if (sortMethod === "asc") {
    allProducts.sort((a, b) => a.price - b.price);
  } else if (sortMethod === "desc") {
    allProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(allProducts);
}

document.getElementById("sortSelect").addEventListener("change", (event) => {
  const sortMethod = event.target.value;
  sortProducts(sortMethod);
});

function updateCartInSessionStorage(cart) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    localStorage.setItem(accessToken, JSON.stringify(cart));
  }
}

function getCartFromSessionStorage(products) {
  if (!products || products.length === 0) {
    cart = {};
    updateCartInSessionStorage(cart);
  }
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const storedCart = localStorage.getItem(accessToken);
    if (storedCart) {
      let parsedCart = JSON.parse(storedCart);
      for (const product of products) {
        if (!parsedCart[product.id]) {
          delete parsedCart[product.id];
        }
      }
      cart = parsedCart;
      renderCartItems(false);
    }
  }
}

function checkAccessTokenAndRedirect() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "login.html";
  }
}


function initEventListeners() {
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document.getElementById("searchInput").value;
    searchProducts(searchTerm);
  });

  document.getElementById("searchInput").addEventListener("keyup", () => {
    const searchTerm = document.getElementById("searchInput").value;
    searchProducts(searchTerm);
  });

  document.getElementById("sortSelect").addEventListener("change", (event) => {
    const sortMethod = event.target.value;
    sortProducts(sortMethod);
  });
}

initEventListeners();
