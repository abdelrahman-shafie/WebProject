$(document).ready(function() {
    $.ajax({
        url: "../PHP/fetch_cars_admin.php", // Ensure this is correct
        method: "GET",
        success: function(data) {
            // Clear the container if it has any old data
            $("#car-container").empty();

            // Iterate over each car and generate a card
            data.forEach(function(car) {
                const carCard = `
                    <div class="col-md-4">
                        <div class="card car-card" data-car-id="${car.car_id}">
                            <img src="${car.image}" class="card-img-top" alt="${car.name}">
                            <div class="card-body">
                                <h5 class="card-title">${car.name}</h5>
                                <p class="card-text">
                                    <strong>${car.daily_price}</strong> / Day
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                $("#car-container").append(carCard);
            });

        }
    });
});
