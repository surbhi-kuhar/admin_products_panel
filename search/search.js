function performSearch() {
  var query = searchInput.value;
  var results = searchProducts(query);
  displaySearchResults(results, searchResultsContainer);
}

// Get the search input element
var searchInput = document.getElementById("searchProduct");

// Get the container to display search results
var searchResultsContainer = document.getElementById("searchResults");

// Get the search button
var searchButton = document.getElementById("searchButton");

// Add an event listener to the search button
searchButton.addEventListener("click", performSearch);

// Add an event listener to the search input field to trigger search on "Enter" key press
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

// Function to filter products based on the search query
function searchProducts(query) {
  var existingProducts = JSON.parse(localStorage.getItem("productData")) || [];
  query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search

  return existingProducts.filter(function (product) {
    return product.name.toLowerCase().includes(query);
  });
}

// Function to display search results
function displaySearchResults(results, container) {
  container.innerHTML = ""; // Clear existing content
  if (results.length === 0) {
    container.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  results.forEach(function (product) {
    // Create a container div for each product
    var productItem = document.createElement("div");
    productItem.className = "product-item";

    // Create a div for the product image and style it
    var imageContainer = document.createElement("div");
    imageContainer.className = "product-image";
    var productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name + " Image";
    imageContainer.appendChild(productImage);

    // Create a div for the product details
    var detailsContainer = document.createElement("div");
    detailsContainer.className = "product-details";

    var productName = document.createElement("strong");
    productName.textContent = product.name;

    var productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    var productPrice = document.createElement("p");
    productPrice.textContent = "Price: Rs." + product.price;

    // Append elements to the details container
    detailsContainer.appendChild(productName);
    detailsContainer.appendChild(productDescription);
    detailsContainer.appendChild(productPrice);

    // Append image and details containers to the product item
    productItem.appendChild(imageContainer);
    productItem.appendChild(detailsContainer);

    // Append the product item to the container
    container.appendChild(productItem);
  });
}
