
// Select the button by its ID
const button = document.getElementById('hover');

// Add hover (mouseenter) event
button.addEventListener('mouseenter', function() {
    button.style.backgroundColor = 'blue'; // Change background color on hover
    button.style.color = 'white';          // Optional: Change text color
});

// Add hover out (mouseleave) event
button.addEventListener('mouseleave', function() {
    button.style.backgroundColor = 'white'; // Revert background color
    button.style.color = 'black';          // Revert text color
});


