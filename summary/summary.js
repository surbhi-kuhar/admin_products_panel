function getProductCount() {
  var products = JSON.parse(localStorage.getItem("productData")) || [];
  return products.length;
}

// Update the product count in the HTML
function updateProductCount() {
  var productCount = getProductCount();
  var countElement = document.getElementById("count");
  countElement.textContent = productCount;
}

// Call the updateProductCount function to initially display the count
updateProductCount();

// Function to fetch products from local storage
function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("productData")) || [];
}

let amount500 = 0;
let amount2000 = 0;
let amount5000 = 0;
let amount20000 = 0;
let amount50000 = 0;
let amount100000 = 0;
// Function to calculate the total amount
function calculateTotalAmount() {
  var products = getProductsFromLocalStorage();
  var totalAmount = 0;

  // Loop through products and sum up the prices
  for (var i = 0; i < products.length; i++) {
    var price = parseFloat(products[i].price);
    totalAmount += price;

    if (price < 500) {
      amount500++;
    } else if (price < 2000) {
      amount2000++;
    } else if (price < 5000) {
      amount5000++;
    } else if (price < 20000) {
      amount20000++;
    } else if (price < 50000) {
      amount50000++;
    } else if (price < 100000) {
      amount100000++;
    }
  }

  return totalAmount;
}

// Function to update the total amount in the HTML
function updateTotalAmount() {
  var totalAmount = calculateTotalAmount();
  var amountElement = document.getElementById("amount");
  amountElement.textContent = totalAmount.toFixed(2); // Display the total amount with two decimal places
}

// Call the updateTotalAmount function to initialize the total amount
updateTotalAmount();

const less500 = document.getElementById("less-500");
less500.innerHTML = `<b>${amount500}</b>`;

const less2000 = document.getElementById("less-2000");
less2000.innerHTML = `<b>${amount2000}</b>`;

const less5000 = document.getElementById("less-5000");
less5000.innerHTML = `<b>${amount5000}</b>`;

const less20000 = document.getElementById("less-20000");
less20000.innerHTML = `<b>${amount20000}</b>`;

const less50000 = document.getElementById("less-50000");
less50000.innerHTML = `<b>${amount50000}</b>`;

const less100000 = document.getElementById("less-100000");
less100000.innerHTML = `<b>${amount100000}</b>`;
