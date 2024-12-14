document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.getElementById("car-container");

    // Get brand from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get("brand");

    if (!brand) {
        carContainer.innerHTML = "<p>Please select a brand from the carousel to display cars.</p>";
        return;
    }

    // Fetch cars based on the selected brand
    fetch(`../PHP/fetch_cars_filter.php?brand=${brand}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const cars = data.cars;

                cars.forEach(car => {
                    const carCard = document.createElement("div");
                    carCard.classList.add("col-md-4");

                    carCard.innerHTML = `
                        <div class="card car-card" data-car-id="${car.car_id}">
                            <img src="${car.car_image}" class="card-img-top" alt="${car.car_name}">
                            <div class="card-body">
                                <h5 class="card-title">${car.car_name}</h5>
                                <p class="card-text">
                                    <strong>${car.price_per_day}</strong> / Day
                                </p>
                            </div>
                        </div>
                    `;

                    carContainer.appendChild(carCard);
                });
             // Add a click listener to all cards
             document.querySelectorAll(".car-card").forEach(card => {
                card.addEventListener("click", function () {
                    const carId = this.getAttribute("data-car-id");
                    // Redirect to the details page with the car_id parameter
                    window.location.href = `cardetails.html?car_id=${carId}`;
                });
            });
        } else {
            carContainer.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error("Error fetching cars:", error);
        carContainer.innerHTML = `<p>Failed to fetch cars. Please try again later.</p>`;
    });
});
