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
                  <h5 class="card-title">${car.name}</h5>
                  <p class="card-text">
                    <strong>${car.daily_price}</strong> / Day
                  </p>
                  <div class="button-container">
                    <!-- Add Button -->
                    <button class="btn btn-success add-car" title="Add Car">
                      <i class="fas fa-plus"></i> Add
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
                  <h5 class="card-title">New Car</h5>
                  <p class="card-text">
                    <strong>0</strong> / Day
                  </p>
                  <div class="button-container">
                    <button class="btn btn-success add-car" title="Add Car">
                      <i class="fas fa-plus"></i> Add
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
      },
    });
  });
  