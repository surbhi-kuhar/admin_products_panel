function getProductsFromLocalStorage() {
  var storedData = localStorage.getItem("productData");

  if (storedData) {
    // Parse the JSON string to get the object
    var productDataArray = JSON.parse(storedData);

    return productDataArray;
  } else {
    return [];
  }
}

function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function displayProducts(products, container) {
  // Clear existing content in the container
  container.innerHTML = "";

  // Check if there are products to display
  if (products.length === 0) {
    container.innerHTML = "<p>No products available</p>";
    return;
  }

  // Loop through each product and create HTML elements
  products.forEach(function (product) {
    var productItem = document.createElement("div");
    productItem.className = "product-item";

    var productName = document.createElement("strong");
    productName.textContent = product.name;

    var productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    var productPrice = document.createElement("p");
    productPrice.textContent = "Price: Rs." + product.price;

    var editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit";
    editIcon.addEventListener("click", function () {
      // Open the modal
      openModal();

      // Populate the modal with current product data (if needed)
      // For example:
      const updateProductDescriptionInput = document.getElementById(
        "updateProductDescription"
      );
      const updateProductPriceInput =
        document.getElementById("updateProductPrice");

      updateProductDescriptionInput.value = product.description;
      updateProductPriceInput.value = product.price;
    });

    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", closeModal);

    // Event listener for the "Update Product" button in the modal
    const updateProductButton = document.getElementById("updateProductBtn");
    updateProductButton.addEventListener("click", function () {
      // Get updated values from the modal inputs
      const updatedProductDescription = document.getElementById(
        "updateProductDescription"
      ).value;
      const updatedProductPrice =
        document.getElementById("updateProductPrice").value;

      // Update the product data in localStorage
      const existingProducts = getProductsFromLocalStorage();

      // Find the index of the product to update
      const productIndex = existingProducts.findIndex(
        (p) => p.name === product.name
      );

      if (productIndex !== -1) {
        // Update the product in the array
        existingProducts[productIndex].description = updatedProductDescription;
        existingProducts[productIndex].price = updatedProductPrice;

        // Update the product data in localStorage
        localStorage.setItem("productData", JSON.stringify(existingProducts));

        // Update the displayed products (you may need to re-render the list)
        const productListContainer =
          document.querySelector(".list-of-products");
        const updatedProducts = getProductsFromLocalStorage();
        displayProducts(updatedProducts, productListContainer);

        // Close the modal
        closeModal();
      } else {
        alert("Product not found. Unable to update.");
      }
    });

    // Create delete icon
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.addEventListener("click", function () {
      deleteProduct(product.name);
    });

    // Append elements to the product item
    productItem.appendChild(productName);
    productItem.appendChild(productDescription);
    productItem.appendChild(productPrice);
    productItem.appendChild(editIcon);
    productItem.appendChild(deleteIcon);

    productItem.style.position = "relative";
    editIcon.style.position = "absolute";
    editIcon.style.bottom = "5px";
    editIcon.style.right = "5px";
    deleteIcon.style.position = "absolute";
    deleteIcon.style.bottom = "5px";
    deleteIcon.style.right = "35px";

    // Append the product item to the container
    container.appendChild(productItem);
  });
}

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

    // Update the displayed products on the Read Page
    var readPageListContainer = document.querySelector(".list-of-products");
    var readPageProducts = getProductsFromLocalStorage();
    displayProducts(readPageProducts, readPageListContainer);

    // Optionally, you can provide feedback to the user (e.g., show a success message)
    alert("Product deleted successfully!");
  } else {
    // The product doesn't exist, show an alert
    alert("Product does not exist. Cannot delete.");
  }
}

console.log("script working");
var productListContainer = document.querySelector(".list-of-products");
var products = getProductsFromLocalStorage();
displayProducts(products, productListContainer);
