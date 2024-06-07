if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
  
  var totalAmount = "0,00";
  
  function ready() {
    const removeProductButtons = document.getElementsByClassName("remove");
    for (var i = 0; i < removeProductButtons.length; i++) {
      removeProductButtons[i].addEventListener("click", removeProduct);
    }
  
    const quantityImputs = document.getElementsByClassName("product-input");
    for (var i = 0; i < quantityImputs.length; i++) {
      quantityImputs[i].addEventListener("change", checkIfInputIsNull);
    }
  
    const addToCartButtons = document.getElementsByClassName("button-hover");
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart);
    }
  
    const purchaseButton = document.getElementsByClassName("purchase")[0];
    purchaseButton.addEventListener("click", makePurchase);
  }
  
  function makePurchase() {
    if (totalAmount === "0,00") {
      alert("Seu carrinho está vazio!");
    } else {
      const products = getProducts();
  
      let message = "Olá, gostaria de fazer um pedido:\n\n";
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
  
        message += `- ${product.productTitle} ${product.productQuantity} unidade(s) \n`;
      }
  
      message += `\nValor total: R$${totalAmount}\n\n`;
  
      window.open(
        `https://api.whatsapp.com/send?phone=5517988342799&text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
  
      // alert(
      //   `
      //     Obrigado pela sua compra!
      //     Valor do pedido: R$${totalAmount}
      //     Volte sempre :)
  
      //     `
      // );
    }
  
    document.querySelector(".cart-table tbody").innerHTML = "";
    updateTotal();
  }
  
  function checkIfInputIsNull(event) {
    if (event.target.value === "0")
      event.target.parentElement.parentElement.remove();
  
    updateTotal();
  }
  
  function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName("image")[0].src;
    const productTitle = productInfos.getElementsByClassName("product")[0]
      .innerText;
    const productPrice = productInfos.getElementsByClassName("product-price")[0]
      .innerText;
  
    const productsCartName = document.getElementsByClassName("cart-title");
    for (var i = 0; i < productsCartName.length; i++) {
      if (productsCartName[i].innerText === productTitle) {
        productsCartName[i].parentElement.getElementsByClassName(
          "product-input"
        )[0].value++;
        return;
      }
    }
  
    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-production");
  
    newCartProduct.innerHTML = `
  
      <td class="identification">
                      <img class="cart-image" src="${productImage}" alt="${productTitle}">
                      <strong class="cart-title">${productTitle}</strong>
                  </td>
                  <td>
                      <span class="cart-price">${productPrice}</span>
                  </td>
                  <td>
                      <input class="product-input" type="number" value="1" min="0">
                      <button class="remove" type="button">Remover</button>
                  </td>
      
      `;
  
    const tableBody = document.querySelector(".cart-table tbody");
    tableBody.append(newCartProduct);
  
    updateTotal();
    newCartProduct
      .getElementsByClassName("product-input")[0]
      .addEventListener("change", checkIfInputIsNull);
    newCartProduct
      .getElementsByClassName("remove")[0]
      .addEventListener("click", removeProduct);
  }
  
  function removeProduct(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
  }
  
  function updateTotal() {
    totalAmount = 0;
    const cartProducts = document.getElementsByClassName("cart-production");
    for (var i = 0; i < cartProducts.length; i++) {
      //console.log(cartProducts[i])
      const ProductPrice = cartProducts[i]
        .getElementsByClassName("cart-price")[0]
        .innerText.replace("R$", "")
        .replace(",", ".");
      const productQuantity = cartProducts[i].getElementsByClassName(
        "product-input"
      )[0].value;
  
      totalAmount += ProductPrice * productQuantity;
    }
    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace(".", ",");
    document.querySelector(".cart-total span").innerText = "R$" + totalAmount;
  }
  
  suggestion.addEventListener("click", (event) => {
    const inputText = document.querySelector("div._2FVVk._2UL8j");
    inputText.classList.add("focused");
    const textBox = document.querySelector(
      "#main > footer > div._3ee1T._1LkpH.copyable-area > div._3uMse > div > div._3FRCZ.copyable-text.selectable-text"
    );
    textBox.textContent = event.target.textContent;
    document.querySelector('span[data-icon="send"]').click();
  });
  
  function getProducts() {
    const products = [];
    const cartProducts = document.getElementsByClassName("cart-production");
    for (var i = 0; i < cartProducts.length; i++) {
      const ProductPrice = cartProducts[i]
        .getElementsByClassName("cart-price")[0]
        .innerText.replace("R$", "")
        .replace(",", ".");
      const productQuantity = cartProducts[i].getElementsByClassName(
        "product-input"
      )[0].value;
  
      const productTitle = cartProducts[i].getElementsByClassName("cart-title")[0]
        .innerText;
  
      products.push({
        productTitle,
        ProductPrice,
        productQuantity,
      });
    }
  
    return products;
  }
  