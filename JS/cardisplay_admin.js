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
            <div class="col-md-4 car-wrapper">
              <div class="card car-card">
                <img src="path/to/default-image.jpg" class="card-img-top" alt="New Car">
                <div class="card-body">
                  <h5 class="card-title editable-car-name">New Car</h5>
                  <p class="card-text">
                    <strong class="editable-car-price">0</strong> / Day
                  </p>
                  <div class="button-container">
                    <button class="btn btn-success add-car" title="Add Car">
                      <i class="fas fa-plus"></i> Add
                    </button>
                    <button class="btn btn-warning edit-car" title="Edit Car">
                      <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger delete-car" title="Delete Car">
                      <i class="fas fa-minus"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
          $("#car-container").append(newCarContainer);
        });
  
        // Delete a car container
        $(document).on("click", ".delete-car", function () {
          $(this).closest(".car-wrapper").remove();
        });
  
        // Edit car details (Name and Price)
        $(document).on("click", ".edit-car", function () {
          const cardBody = $(this).closest(".card-body");
          const carName = cardBody.find(".editable-car-name");
          const carPrice = cardBody.find(".editable-car-price");
  
          // Save current values to restore on cancel
          const oldName = carName.text();
          const oldPrice = carPrice.text();
  
          // Replace car name and price with input fields
          carName.html(`<input type="text" class="form-control car-name-input" value="${oldName}">`);
          carPrice.html(`<input type="number" class="form-control car-price-input" value="${oldPrice}">`);
  
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
          cardBody.data("oldPrice", oldPrice);
        });
  
        // Save edited details
        $(document).on("click", ".save-car", function () {
          const cardBody = $(this).closest(".card-body");
          const newName = cardBody.find(".car-name-input").val();
          const newPrice = cardBody.find(".car-price-input").val();
  
          // Update name and price fields
          cardBody.find(".editable-car-name").text(newName);
          cardBody.find(".editable-car-price").text(newPrice);
  
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
  
        // Cancel editing and restore old values
        $(document).on("click", ".cancel-edit", function () {
          const cardBody = $(this).closest(".card-body");
          const oldName = cardBody.data("oldName");
          const oldPrice = cardBody.data("oldPrice");
  
          // Restore old name and price
          cardBody.find(".editable-car-name").text(oldName);
          cardBody.find(".editable-car-price").text(oldPrice);
  
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
  