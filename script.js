const form = document.getElementById('form-element');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Submit button clicked");

    const searchQuery = document.getElementById('searchQuery').value;
    const plusQuery = searchQuery.split(' ').join('+');
    console.log("plusQuery:", plusQuery);

    const apiUrl = `https://openlibrary.org/search.json?q=${plusQuery}`;

    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        const resultDiv = document.getElementById('resultDiv');
        const ul = document.createElement('ul');

        data.docs.forEach((item) => {
            const card = document.createElement('div');
            card.classList.add('card');
                    
            const titleElement = document.createElement('h2');
            titleElement.textContent = item.title;
                    
            const authorElement = document.createElement('p');
            authorElement.textContent = `Author: ${item.author_name}`;
                    
            card.appendChild(titleElement);
            card.appendChild(authorElement);
                    
            resultDiv.appendChild(card);

        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

