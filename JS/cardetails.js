document.addEventListener("DOMContentLoaded", () => {
    // Assume car_id is passed via URL, e.g., ?car_id=1
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("car_id");

    if (!carId) {
        alert("No car selected!");
        return;
    }

    // Fetch car details
    fetch(`../PHP/cardetails.php?car_id=${carId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const car = data.car;

                // Update the brand name and model
                document.getElementById("brand-name").textContent = car.brand;
                document.getElementById("model-name").textContent = car.model;  // Update the car model
                
                // Update the car logo and other details
                document.getElementById("car-logo").src = car.car_logo; // Make sure car_logo is the correct field for the logo URL
                document.getElementById("car-image").src = car.car_image;
                document.getElementById("price").textContent =car.price_per_day;  // Assuming price is a number
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error("Error fetching car details:", err);
            alert("An error occurred while fetching car details.");
        });
});
