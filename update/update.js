function updateProduct(updatedProduct) {
  // Get existing products from localStorage
  var existingProducts = JSON.parse(localStorage.getItem("productData")) || [];

  // Check if the product to be updated exists
  var existingProductIndex = existingProducts.findIndex(function (product) {
    return product.name === updatedProduct.name;
  });

  if (existingProductIndex !== -1) {
    // Update the existing product
    existingProducts[existingProductIndex] = updatedProduct;

    // Store the updated array in localStorage
    localStorage.setItem("productData", JSON.stringify(existingProducts));

    // Optionally, you can provide feedback to the user (e.g., show a success message)
    alert("Product updated successfully!");
  } else {
    // The product doesn't exist, show an alert
    alert("Product does not exist. Cannot update.");
  }
}

document.getElementById("submit").addEventListener("click", () => {
  var productName = document.getElementById("productName").value;
  var productDescription = document.getElementById("productDescription").value;
  var productPrice = document.getElementById("productPrice").value;

  // Create an object with the form data
  var updatedProduct = {
    name: productName,
    description: productDescription,
    price: productPrice,
  };

  // Update the product in localStorage
  updateProduct(updatedProduct);
});
