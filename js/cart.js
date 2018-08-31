function updateCart(list) {
  const ulCart = document.getElementById("shopping-cart-list");
  while (ulCart.firstChild) {
    ulCart.removeChild(ulCart.firstChild);
  }

  list.forEach(element => {
    var li = document.createElement("li");
    li.innerHTML = `${element.product.getName()}   [${
      element.quant
    }]   R$${element.product.getPrice()}`;
    ulCart.appendChild(li);
  });
}

function cartHover(shoppingList) {
  const listDOM = document.getElementById("shopping-list");
  const shoppingCart = document.getElementById("shopping-cart");

  listDOM.addEventListener("mouseenter", e => {
    shoppingCart.setAttribute("class", "show");
    updateCart(shoppingList.getUniqueProducts());
  });

  document.getElementById("list-products").addEventListener("mouseenter", e => {
    shoppingCart.setAttribute("class", "hide");
  });
}

function storageToList() {
  var returnProducts = [];
  Object.keys(sessionStorage).map(id => {
    var p = products.filter(element => element.id === id)[0];
    for (var i = 0; i < parseInt(sessionStorage.getItem(id)); i++) {
      returnProducts.push(p);
    }
  });

  return returnProducts;
}
