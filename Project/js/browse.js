window.onload = function () {
  // console.log(`${sessionStorage.getItem('accessToken')}`);
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
          sessionStorage.setItem("products", data);

          let rows = "";
          for (const singleRow of data) {
            rows += `<tr id="${singleRow.id}">
          <td >${singleRow.id}</td>
          <td >${singleRow.title}</td>
          <td >${singleRow.description}</td>
          <td id="${singleRow.id}-stock">${singleRow.stock}</td>
          <td ><img src="\\${singleRow.image}" width="100px"></td>
          <td >${singleRow.price}</td>
          <td ><button onclick='addToCart(${JSON.stringify(
            singleRow
          )})'>add to cart</button></td>
      </tr>`;
          }

          document.getElementById("tbodyProductList").innerHTML = rows;
        }
      }
    });
};

let cart = [];

function addToCart(item) {
  debugger;
  if (!cart[item.id]) {
    cart[item.id] = { ...item, quantity: 1 };
  } else {
    cart[item.id].quantity += 1;
  }

  renderCartItems();
}

function renderCartItems() {
  const tbodyCart = document.getElementById("tbodyCart");
  tbodyCart.innerHTML = "";

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

    tbodyCart.appendChild(row);
  }
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
