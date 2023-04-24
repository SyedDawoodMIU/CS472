window.onload = loadProducts;
function loadProducts() {
  fetch("http://localhost:5000/products", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        document.getElementById("tbodyProductList").innerHTML = data.error;
      } else {
        if (data) {
          sessionStorage.setItem("products", JSON.stringify(data));
          renderProducts(data);
        }
      }
    });
}

let cart = [];

function renderProducts(data) {
  let rows = "";
  for (const singleRow of data) {
    rows += `<tr id="${singleRow.id}">
          <td >${singleRow.id}</td>
          <td >${singleRow.title}</td>
          <td >${singleRow.description}</td>
          <td id="${singleRow.id}-stock">${
      singleRow.stock === 0 ? "Out of Stock" : singleRow.stock
    }</td>
          <td ><img src="${singleRow.image}" width="100px"></td>
          <td >${singleRow.price}</td>
          <td ><button class="btn btn-sm btn-primary" onclick='addToCart(${JSON.stringify(
            singleRow
          )})' ${
      singleRow.stock === 0 ? "disabled" : ""
    }>add to cart</button></td>
      </tr>`;
  }

  document.getElementById("tbodyProductList").innerHTML = rows;
}

function addToCart(item) {
  if (!cart[item.id]) {
    cart[item.id] = { ...item, quantity: 1 };
  } else {
    cart[item.id].quantity += 1;
  }

  enablePlaceOrder();

  renderCartItems();
}

function enablePlaceOrder() {
  document.getElementById("placeOrder").removeAttribute("disabled");
}

function removeFromCart(item) {
  cart = cart.filter((x) => x.id !== item.id);
  renderCartItems();
}

function renderCartItems() {
  const tbodyCart = document.getElementById("tbodyCart");
  tbodyCart.innerHTML = "";

  let totalCost = 0;

  for (const index in cart) {
    const row = document.createElement("tr");
    const item = cart[index];
    const nameCell = document.createElement("td");
    nameCell.innerText = item.title;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.innerText = item.price;
    row.appendChild(priceCell);

    const totalCell = document.createElement("td");
    totalCell.innerText = item.quantity * item.price;
    row.appendChild(totalCell);
    totalCost += item.quantity * item.price;

    const quantityCell = document.createElement("td");
    const minusBtn = document.createElement("button");
    minusBtn.innerText = "-";
    minusBtn.onclick = () => changeQuantity(item, -1);
    quantityCell.appendChild(minusBtn);

    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.value = item.quantity;
    quantityInput.style.width = "50px";
    quantityInput.style.textAlign = "center";
    quantityInput.onchange = (e) =>
      changeQuantity(item, 0, parseInt(e.target.value));
    quantityCell.appendChild(quantityInput);

    const plusBtn = document.createElement("button");
    plusBtn.innerText = "+";
    plusBtn.onclick = () => changeQuantity(item, 1);
    quantityCell.appendChild(plusBtn);

    row.appendChild(quantityCell);

    const removeCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.onclick = () => removeFromCart(item);
    removeCell.appendChild(removeBtn);
    row.appendChild(removeCell);

    tbodyCart.appendChild(row);
  }

  const totalCostElement = document.getElementById("totalCost");
  totalCostElement.innerText = "Total Cost: $" + totalCost.toFixed(2);
}

function changeQuantity(item, change, newValue) {
  if (newValue !== undefined) {
    cart[item.id].quantity = newValue;
  } else {
    cart[item.id].quantity += change;
  }

  if (cart[item.id].quantity < 1) {
    cart = cart.filter((x) => x.id != item.id);
  }

  renderCartItems();
}

function placeOrder() {
  document.getElementById("placeOrder").setAttribute("disabled", true);
  if (cart.filter((x) => x.quantity === 0).length === cart.length) {
    alert("Item quantity must be greater than 0");
    return;
  }
  const cartData = Object.values(cart);
  fetch("http://localhost:5000/Order/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(cartData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      cart = [];
      renderCartItems();
      loadProducts();
    })
    .catch((error) => {
      console.error(error);
      enablePlaceOrder();
    });
}

function searchProducts(searchTerm) {
  let term = searchTerm.toLowerCase();
  const allProducts = JSON.parse(sessionStorage.getItem("products"));
  const filteredProducts = allProducts.filter((product) =>
    (
      product.title +
      product.description +
      product.price +
      product.stock +
      product.id
    ).includes(term)
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
  const allProducts = JSON.parse(sessionStorage.getItem("products"));

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
