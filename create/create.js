console.log("script executed");

document
  .getElementById("submit-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Get the values from the form
    var productName = document.getElementById("productName").value;
    var productDescription =
      document.getElementById("productDescription").value;
    var productPrice = document.getElementById("productPrice").value;

    var productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
    };

    var existingProducts =
      JSON.parse(localStorage.getItem("productData")) || [];

    if (!Array.isArray(existingProducts)) {
      existingProducts = [];
    }
    // Append the new product to the existing array
    existingProducts.push(productData);

    // Convert the updated array to a JSON string
    var updatedProductDataString = JSON.stringify(existingProducts);

    // Store the updated array in localStorage
    localStorage.setItem("productData", updatedProductDataString);

    // Reset the form
    document.getElementById("form").reset();
  });
