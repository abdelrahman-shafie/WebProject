let originalData = {};

document.addEventListener('DOMContentLoaded', function () {
    fetchUserData();
});

function fetchUserData() {
    // Fetch user data via AJAX
    fetch("../PHP/profile.php")
        .then(response => response.json())
        .then(data => {
            originalData = { ...data }; // Store original data for reset
            populateFields(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function populateFields(data) {
    // Display fetched data in spans
    document.getElementById('display-username').textContent = data.username || '';
    document.getElementById('display-nationalid').textContent = data.national_ID || '';
    document.getElementById('display-phone').textContent = data.phone_number || '';
    document.getElementById('display-email').textContent = data.email || '';
    document.getElementById('display-age').textContent = data.age || '';
}

function enableEditMode() {
    // Enter edit mode
    toggleButtons(true);
    toggleField('username', true);
    toggleField('nationalid', true);
    toggleField('phone', true);
    toggleField('email', true);
    toggleField('age', true);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block'; // Show the message

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function confirmDataChange() {
    const updatedData = {
        username: document.getElementById('edit-username').value,
        national_ID: document.getElementById('edit-nationalid').value,
        phone_number: document.getElementById('edit-phone').value,
        email: document.getElementById('edit-email').value,
        age: document.getElementById('edit-age').value,
    };

    fetch("../PHP/update_profile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Update originalData and display fields
                originalData = { ...updatedData };
                populateFields(updatedData);

                // Reset to display mode
                toggleField('username', false);
                toggleField('nationalid', false);
                toggleField('phone', false);
                toggleField('email', false);
                toggleField('age', false);
                toggleButtons(false);
                
                showSuccessMessage();
            } else {
                alert("Failed to update data. Please try again.");
            }
        })
        .catch(error => console.error('Error updating data:', error));
}

function cancelEdit() {
    // Reset all fields to original data
    toggleButtons(false);
    resetFieldsToOriginal();
}

function resetFieldsToOriginal() {
    // Reset input values and display spans
    document.getElementById('edit-username').value = originalData.username || '';
    document.getElementById('edit-nationalid').value = originalData.national_ID || '';
    document.getElementById('edit-phone').value = originalData.phone_number || '';
    document.getElementById('edit-email').value = originalData.email || '';
    document.getElementById('edit-age').value = originalData.age || '';

    toggleField('username', false);
    toggleField('nationalid', false);
    toggleField('phone', false);
    toggleField('email', false);
    toggleField('age', false);
}

function toggleField(field, toEditMode) {
    const displaySpan = document.getElementById('display-' + field);
    const editInput = document.getElementById('edit-' + field);

    if (toEditMode) {
        editInput.value = displaySpan.textContent;
        displaySpan.style.display = 'none';
        editInput.style.display = 'inline-block';
    } else {
        displaySpan.textContent = editInput.value || '';
        displaySpan.style.display = 'inline';
        editInput.style.display = 'none';
    }
}

function toggleButtons(inEditMode) {
    document.getElementById('edit-button').style.display = inEditMode ? 'none' : 'inline-block';
    document.getElementById('confirm').style.display = inEditMode ? 'inline-block' : 'none';
    document.getElementById('cancel-button').style.display = inEditMode ? 'inline-block' : 'none';
}
