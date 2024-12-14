document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('car_id'); // Get car_id from URL

    // Set the car_id to the hidden field
    document.getElementById("car_id").value = carId;

    const modal = document.getElementById("booking-modal");
    const bookNowBtn = document.getElementById("book-now");
    const closeBtn = document.getElementById("close-btn");
    const confirmBtn = document.getElementById("confirm-booking");
    const notAvailableModal = document.getElementById("car-not-available-modal");
    const closeNotAvailableBtn = document.getElementById("close-not-available-btn");
    const confirmationModal = document.getElementById("confirmation-modal");
    const totalPriceElement = document.getElementById("total-price");
    const numOfDaysElement = document.getElementById("num-of-days");
    const closeConfirmationBtn = document.getElementById("close-modal"); // Close button for the confirmation modal

    bookNowBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    confirmBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const startDate = document.querySelector("[name='start_date']").value;
        const endDate = document.querySelector("[name='end_date']").value;

        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const data = new FormData();
        data.append("start_date", startDate);
        data.append("end_date", endDate);
        data.append("car_id", carId); // Include car_id from URL

        // Send AJAX request using fetch
        fetch("../PHP/booknow.php", {
            method: "POST",
            body: data
        })
        .then(response => response.json())  // Parse JSON response
        .then(response => {
            if (response.status === "success") {
                const numOfDays = response.num_of_days;
                const totalPrice = response.total_price;

                // Display the number of days and total price
                numOfDaysElement.textContent = `Number of Days: ${numOfDays}`;
                totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

                confirmationModal.style.display = "block"; // Show confirmation modal
                modal.style.display = "none"; // Close booking modal
            } else if (response.status === "not_available") {
                notAvailableModal.style.display = "block"; // Show car not available modal
            }
        });

    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    closeNotAvailableBtn.addEventListener("click", function() {
        notAvailableModal.style.display = "none";
    });

    // Close the confirmation modal when the close button is clicked
    closeConfirmationBtn.addEventListener("click", function() {
        confirmationModal.style.display = "none";
    });

    // Close the confirmation modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target == confirmationModal) {
            confirmationModal.style.display = "none";
        }
    });
});
