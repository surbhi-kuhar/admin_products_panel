function deleteProduct(productName) {
  var existingProducts = JSON.parse(localStorage.getItem("productData")) || [];

  var productIndex = existingProducts.findIndex(function (product) {
    return product.name === productName;
  });

  if (productIndex !== -1) {
    // Remove the product from the array
    existingProducts.splice(productIndex, 1);

    // Store the updated array in localStorage
    localStorage.setItem("productData", JSON.stringify(existingProducts));

    // Optionally, you can provide feedback to the user (e.g., show a success message)
    alert("Product deleted successfully!");
  } else {
    // The product doesn't exist, show an alert
    alert("Product does not exist. Cannot delete.");
  }
}

document.getElementById("submit").addEventListener("click", () => {
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the product name from the form
    var productName = document.getElementById("productName").value;

    // Delete the product from localStorage
    deleteProduct(productName);
  });
});
