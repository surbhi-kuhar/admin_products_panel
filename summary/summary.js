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
  
  // Function to calculate the total amount
  function calculateTotalAmount() {
    var products = getProductsFromLocalStorage();
    var totalAmount = 0;
  
    // Loop through products and sum up the prices
    for (var i = 0; i < products.length; i++) {
      totalAmount += parseFloat(products[i].price);
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
  
