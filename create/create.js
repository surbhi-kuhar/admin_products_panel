console.log("script executed");

var image = document.querySelector("#image-input");
var uploadedImage = "";

image.addEventListener("change", () => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    console.log(reader.result);

    var imagePreview = document.querySelector("#image-preview");
    imagePreview.style.display = "block"; // Display the image preview
    imagePreview.style.backgroundImage = `url(${uploadedImage})`;
  });

  if (image.files[0]) {
    reader.readAsDataURL(image.files[0]);
  }
});

document
  .getElementById("submit-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // prevent the page from reloading

    // Get the values from the form
    var productName = document.getElementById("productName").value;
    var productDescription =
      document.getElementById("productDescription").value;
    var productPrice = document.getElementById("productPrice").value;

    // creation of our new product object
    var productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: uploadedImage,
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

    swal({
      title: "Success",
      text: "Product Created Successfully",
      icon: "success",
    }).then((result) => {
      if (result) {
        window.location.href = "../home/home.html";
      }
    });
    // Reset the form
    document.getElementById("form").reset();
  });
