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
  
        // Event listener to add a new car container
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
  
        // Event listener to delete the car container
        $(document).on("click", ".delete-car", function () {
          $(this).closest(".car-wrapper").remove();
        });
  
        // Event listener to edit car name and price
        $(document).on("click", ".edit-car", function () {
          const cardBody = $(this).closest(".card-body");
          const carName = cardBody.find(".editable-car-name");
          const carPrice = cardBody.find(".editable-car-price");
  
          // Convert to input fields if not already
          if (!cardBody.find("input").length) {
            const currentName = carName.text();
            const currentPrice = carPrice.text();
  
            // Replace car name and price with input fields
            carName.html(`<input type="text" class="form-control car-name-input" value="${currentName}">`);
            carPrice.html(`<input type="number" class="form-control car-price-input" value="${currentPrice}">`);
  
            // Change Edit button to Save button
            $(this)
              .html('<i class="fas fa-save"></i> Save')
              .removeClass("edit-car btn-warning")
              .addClass("save-car btn-success");
          }
        });
  
        // Event listener to save edited car details
        $(document).on("click", ".save-car", function () {
          const cardBody = $(this).closest(".card-body");
          const carNameInput = cardBody.find(".car-name-input").val();
          const carPriceInput = cardBody.find(".car-price-input").val();
  
          // Update text with input values
          cardBody.find(".editable-car-name").text(carNameInput);
          cardBody.find(".editable-car-price").text(carPriceInput);
  
          // Change Save button back to Edit button
          $(this)
            .html('<i class="fas fa-edit"></i> Edit')
            .removeClass("save-car btn-success")
            .addClass("edit-car btn-warning");
        });
      },
    });
  });
  