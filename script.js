const form = document.getElementById('form-element');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Submit button clicked");
});

