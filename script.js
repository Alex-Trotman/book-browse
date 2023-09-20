const form = document.getElementById('form-element');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Submit button clicked")

    const searchQuery = document.getElementById('searchQuery').value;

    let plusQuery = searchQuery.split(' ').join('+')

    console.log(plusQuery)
})