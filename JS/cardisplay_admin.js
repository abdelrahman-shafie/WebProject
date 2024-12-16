$(document).ready(function () {
    $.ajax({
      url: "../PHP/fetch_cars_admin.php", // Ensure this is correct
      method: "GET",
      success: function (data) {
        // Clear the container if it has any old data
        $("#car-container").empty();
  
        // Iterate over each car and generate a card
        data.forEach(function (car) {
          const carCard = `
            <div class="col-md-4 car-wrapper" data-car-id="${car.car_id}">
              <div class="card car-card">
                <img src="${car.image}" class="card-img-top" alt="${car.name}">
                <div class="card-body">
                  <h5 class="card-title editable-car-name">${car.name}</h5>
                  <p class="card-text">
                    <strong class="editable-car-price">${car.daily_price}</strong> / Day
                  </p>
                  <div class="button-container">
                    <!-- Add Button -->
                    <button class="btn btn-success add-car" title="Add Car">
                      <i class="fas fa-plus"></i> Add
                    </button>
                    <!-- Edit Button -->
                    <button class="btn btn-warning edit-car" title="Edit Car">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    <!-- Delete Button -->
                    <button class="btn btn-danger delete-car" title="Delete Car">
                      <i class="fas fa-minus"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
          $("#car-container").append(carCard);
        });

        // Add a new car container
        $(document).on("click", ".add-car", function () {
          const newCarContainer = `
            <div class="col-md-4 car-wrapper new-car">
              <div class="card car-card">
                <div class="card-body">
                  <!-- Input for Car Image -->
                  <div class="form-group mb-2">
                    <label>Car Image URL:</label>
                    <input type="text" class="form-control car-image-input" placeholder="Image URL">
                  </div>
                  <!-- Input for Car Name -->
                  <div class="form-group mb-2">
                    <label>Car Name:</label>
                    <input type="text" class="form-control car-name-input" placeholder="Enter Car Name">
                  </div>
                  <!-- Input for Car Price -->
                  <div class="form-group mb-2">
                    <label>Price per Day:</label>
                    <input type="text" class="form-control car-price-input" placeholder="Enter Price (e.g., '100 USD / Day')">
                  </div>
                  <!-- Save and Cancel Buttons -->
                  <div class="button-container">
                    <button class="btn btn-primary submit-new-car" title="Submit Car">
                      <i class="fas fa-save"></i> Submit
                    </button>
                    <button class="btn btn-secondary cancel-new-car" title="Cancel">
                      <i class="fas fa-times"></i> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
          $("#car-container").append(newCarContainer);
        });

        // Submit new car to the backend
        $(document).on("click", ".submit-new-car", function () {
          const cardBody = $(this).closest(".card-body");
          const carName = cardBody.find(".car-name-input").val().trim();
          const carPrice = cardBody.find(".car-price-input").val().trim();
          const carImage = cardBody.find(".car-image-input").val().trim();

          // Validate inputs
          if (carName === "" || carPrice === "" || carImage === "") {
            alert("Please enter a valid car name, price, and image URL.");
            return;
          }

          // Send data to the backend
          $.ajax({
            url: "../PHP/add_car.php", // PHP endpoint for adding a car
            method: "POST",
            data: {
              name: carName,
              daily_price: carPrice,
              image: carImage
            },
            success: function (response) {
              if (response.status === "success") {
                alert("Car added successfully!");
                // Reload or re-fetch the cars to include the new one
                location.reload();
              } else {
                alert("Failed to add car: " + response.message);
              }
            },
            error: function () {
              alert("An error occurred while adding the car. Please try again.");
            }
          });
        });

        // Cancel new car addition
        $(document).on("click", ".cancel-new-car", function () {
          $(this).closest(".car-wrapper").remove();
        });

        // Delete a car container
        $(document).on("click", ".delete-car", function () {
          const carWrapper = $(this).closest(".car-wrapper");
          const carId = carWrapper.data("car-id"); // Retrieve the car_id from data attribute

          // Confirm deletion
          if (!confirm("Are you sure you want to delete this car?")) {
              return;
          }

          // Send AJAX request to delete the car
          $.ajax({
              url: "../PHP/delete_car.php", // PHP file for deleting car
              method: "POST",
              data: { car_id: carId },
              success: function (response) {
                  if (response.status === "success") {
                      alert("Car deleted successfully.");
                      carWrapper.remove(); // Remove the container from the DOM
                  } else {
                      alert("Failed to delete car: " + response.message);
                  }
              },
              error: function () {
                  alert("An error occurred while deleting the car. Please try again.");
              }
          });
        });

  
        // Edit car details (Name and Price)
        $(document).on("click", ".edit-car", function () {
          const cardBody = $(this).closest(".card-body");
          const carName = cardBody.find(".editable-car-name");
          const carPrice = cardBody.find(".editable-car-price");

          // Save current values to restore on cancel
          const oldName = carName.text().trim();
          const oldPriceText = carPrice.text().trim(); // Retains the entire text (currency, "/Day", etc.)

          // Replace car name and price with input fields, including the full price text
          carName.html(`<input type="text" class="form-control car-name-input" value="${oldName}">`);
          carPrice.html(`<input type="text" class="form-control car-price-input" value="${oldPriceText}">`);

          // Show Save and Cancel buttons
          const buttonContainer = cardBody.find(".button-container");
          buttonContainer.html(`
              <button class="btn btn-primary save-car" title="Save">
                <i class="fas fa-save"></i> Save
              </button>
              <button class="btn btn-secondary cancel-edit" title="Cancel">
                <i class="fas fa-times"></i> Cancel
              </button>
          `);

          // Store old values temporarily to restore on Cancel
          cardBody.data("oldName", oldName);
          cardBody.data("oldPriceText", oldPriceText); // Store the entire price text
        });

          // Save edited car details
        $(document).on("click", ".save-car", function () {
          const cardBody = $(this).closest(".card-body");
          const carWrapper = $(this).closest(".car-wrapper");
          const carId = carWrapper.data("car-id"); // Retrieve the car_id
          const newName = cardBody.find(".car-name-input").val().trim();
          const newPriceText = cardBody.find(".car-price-input").val().trim(); // Full price text

          // Validate inputs
          if (newName === "" || newPriceText === "") {
              alert("Please enter a valid name and price.");
              return;
          }

          // Send updated data to the backend
          $.ajax({
              url: "../PHP/update_car.php", // PHP file for updating car details
              method: "POST",
              data: {
                  car_id: carId,
                  car_name: newName,
                  price_per_day: newPriceText
              },
              success: function (response) {
                  if (response.status === "success") {
                      alert("Car updated successfully.");

                      // Update the car details in the DOM
                      cardBody.find(".editable-car-name").text(newName);
                      cardBody.find(".editable-car-price").text(newPriceText);

                      // Restore Edit/Delete buttons
                      cardBody.find(".button-container").html(`
                          <button class="btn btn-success add-car" title="Add Car">
                            <i class="fas fa-plus"></i> Add
                          </button>
                          <button class="btn btn-warning edit-car" title="Edit Car">
                            <i class="fas fa-edit"></i> Edit
                          </button>
                          <button class="btn btn-danger delete-car" title="Delete Car">
                            <i class="fas fa-minus"></i> Delete
                          </button>
                      `);
                  } else {
                      alert("Failed to update car: " + response.message);
                  }
              },
              error: function () {
                  alert("An error occurred while updating the car. Please try again.");
              }
          });
        });

        // Cancel editing and restore old values
        $(document).on("click", ".cancel-edit", function () {
          const cardBody = $(this).closest(".card-body");
          const oldName = cardBody.data("oldName");
          const oldPriceText = cardBody.data("oldPriceText");

          // Restore old name and price text
          cardBody.find(".editable-car-name").text(oldName);
          cardBody.find(".editable-car-price").text(oldPriceText);

          // Restore Edit/Delete buttons
          cardBody.find(".button-container").html(`
              <button class="btn btn-success add-car" title="Add Car">
                <i class="fas fa-plus"></i> Add
              </button>
              <button class="btn btn-warning edit-car" title="Edit Car">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-danger delete-car" title="Delete Car">
                <i class="fas fa-minus"></i> Delete
              </button>
          `);
        });
      },
    });
  });
  