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

    Swal.fire("Success", "Product created successfully", "success").then(
      (result) => {
        if (result.isConfirmed) {
          document.location.href = "../home/home.html";
        }
      }
    );

    // Reset the form
    document.getElementById("form").reset();
  });

var image = document.querySelector("#image-input");
var uploadedImage = "";

image.addEventListener("change", () => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    console.log(reader.result);

    document.querySelector("#image-preview").style.display = "block";
    document.querySelector(
      "#image-preview"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });

  if (image.files[0]) {
    reader.readAsDataURL(image.files[0]);
  }
});
