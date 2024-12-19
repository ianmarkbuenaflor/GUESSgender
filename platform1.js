document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('genderForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        fetchGender(); 
        document.getElementById("submit").style.backgroundColor = `red`;
        document.getElementById("submit").textContent = `Refresh`;
        document.addEventListener("click", () => {
            location.reload();
        })
    });
});

function fetchGender() {
    var nameInput = document.getElementById('nameInput'); 
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    var name = nameInput.value; 
    if (!name) {
        resultDiv.textContent = 'Please enter a name.'; 
        return;
    }

    var url = 'https://api.genderize.io/?name=' + name; 

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP error! Status: ' + response.status); 
            }
            return response.json(); 
        })
        .then(function(data) {
            var result = document.createElement('p'); 
            result.textContent = 'Name: ' + data.name + ', Gender: ' + data.gender + ', Probability: ' + data.probability; 
            resultDiv.appendChild(result); 
        })
        .catch(function(error) {
            console.error('Error fetching data:', error); 
            resultDiv.textContent = 'An error occurred: ' + error.message; 
        });
}
