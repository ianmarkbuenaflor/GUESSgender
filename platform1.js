document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submit event
    var form = document.getElementById('genderForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        fetchGender(); // Call the fetchGender function
        // document.getElementById('nameInput').value = "";
        document.getElementById("submit").style.backgroundColor = `red`;
        document.getElementById("submit").textContent = `Refresh`;
        document.addEventListener("click", () => {
            location.reload();
        })
    });
});

function fetchGender() {
    var nameInput = document.getElementById('nameInput'); // Get the input element
    var resultDiv = document.getElementById('result'); // Get the result div
    resultDiv.innerHTML = ''; // Clear any previous results

    var name = nameInput.value; // Get the value from the input field
    if (!name) {
        resultDiv.textContent = 'Please enter a name.'; // If no name is provided, show a message
        return; // Exit the function
    }

    var url = 'https://api.genderize.io/?name=' + name; // Construct the API URL

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status); // Throw an error if the response is not OK
            }
            return response.json(); // Convert the response data to JSON
        })
        .then(function(data) {
            var result = document.createElement('p'); // Create a new paragraph element
            result.textContent = 'Name: ' + data.name + ', Gender: ' + data.gender + ', Probability: ' + data.probability; // Set the text content of the paragraph
            resultDiv.appendChild(result); // Add the paragraph to the result div
        })
        .catch(function(error) {
            console.error('Error fetching data:', error); // Log any errors to the console
            resultDiv.textContent = 'An error occurred: ' + error.message; // Show an error message in the result div
        });
}
