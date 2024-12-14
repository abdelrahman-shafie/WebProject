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

                // Update the DOM
                document.getElementById("title").textContent = car.brand;
                document.getElementById("breadcrumb").textContent = car.model;
                document.getElementById("car-image").src = car.car_image;
                document.getElementById("car-logo").src = car.car_logo;
                document.getElementById("car-name").textContent = car.car_name;
                document.getElementById("price").textContent = `$${car.price_per_day}`;
                document.getElementById("brand-name").textContent = car.brand;
                document.getElementById("model-name").textContent = car.model;
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error fetching car details:", error));
});
