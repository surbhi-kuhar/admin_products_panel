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

    // Create a container div for the image and set its style
    var productImageDiv = document.createElement("div");
    productImageDiv.style.float = "left"; // Align image to the left
    productImageDiv.style.marginRight = "10px"; // Add some space between image and text

    // Create the image element and set its style
    var productImage = document.createElement("img");
    productImage.src = product.image; // Assuming product.image is the URL or base64 data
    productImage.alt = product.name + " Image";
    productImage.style.width = "100px"; // Set the desired width
    productImage.style.height = "100px"; // Set the desired height

    // Append the image to its container and the container to the product item
    productImageDiv.appendChild(productImage);
    productItem.appendChild(productImageDiv);

    // Create elements for the product details
    var productDetails = document.createElement("div");
    productDetails.style.overflow = "hidden"; // Ensure text doesn't overlap with the image

    var productName = document.createElement("strong");
    productName.textContent = product.name;

    var productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    var productPrice = document.createElement("p");
    productPrice.textContent = "Price: Rs." + product.price;

    // Append elements to the product details container
    productDetails.appendChild(productName);
    productDetails.appendChild(productDescription);
    productDetails.appendChild(productPrice);

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
    var image = document.querySelector("#update-image-input");
    var uploadedImage = "";

    image.addEventListener("change", () => {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        uploadedImage = reader.result;

        // Preview the selected image in the modal
        document.querySelector("#image-preview").style.display = "block";
        document.querySelector(
          "#image-preview"
        ).style.backgroundImage = `url(${uploadedImage})`;
      });

      if (image.files[0]) {
        reader.readAsDataURL(image.files[0]);
      }
    });

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
      console.log(existingProducts);

      // Find the index of the product to update
      const productIndex = existingProducts.findIndex(
        (p) => p.name === product.name
      );

      if (productIndex !== -1) {
        // Update the product in the array
        existingProducts[productIndex].description = updatedProductDescription;
        existingProducts[productIndex].price = updatedProductPrice;
        existingProducts[productIndex].image = uploadedImage;

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
    deleteIcon.style.color = "red";
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

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const menuDropdown = document.getElementById("menu-dropdown");

  menuIcon.addEventListener("click", function () {
    menuDropdown.classList.toggle("show-dropdown");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches("#menu-icon") && !event.target.matches("#menu-dropdown")) {
      menuDropdown.classList.remove("show-dropdown");
    }
  });
});

