// Get the form element by its ID
const form = document.getElementById("form-element");

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

   // Get the value of the search query input field
  const searchQuery = document.getElementById("searchQuery").value;

   // Replace spaces in the search query with '+'
  const plusQuery = searchQuery.split(" ").join("+");

   // Construct the API URL with the modified search query
  const apiUrl = `https://openlibrary.org/search.json?q=${plusQuery}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Get the result div element
      const resultDiv = document.getElementById("resultDiv");

       // Clear the result div content
      resultDiv.innerHTML = "";

       // Loop through each item in the retrieved data
      data.docs.forEach((item) => {
        // Create a new card element
        const card = document.createElement("div");
        card.classList.add("card");

        // Create a link element for the title
        const titleElement = document.createElement("a");
        titleElement.textContent = item.title;

        // Create a Google search link for the title
        const itemTitle = item.title
        const itemTitleSplit = itemTitle.split(' ')
        const itemTitleJoin = itemTitleSplit.join('+')
        const googleSearch = `https://www.google.com/search?q=${itemTitleJoin}`
        console.log(googleSearch)
        // Google search link end
        titleElement.href = googleSearch
        titleElement.target = '_BLANK'

         // Create a paragraph element for the author
        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${item.author_name}`;

        // Create a paragraph element for the number of pages
        const numberOfPagesElement = document.createElement("p");
        numberOfPagesElement.textContent = `Pages: ${item.number_of_pages_median}`;

        // Create an image element for the book cover
        const imageElement = document.createElement("img");
        imageElement.src = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;

        // Append the elements to the card
        card.appendChild(titleElement);
        card.appendChild(authorElement);

        // Check if the number of pages is defined and append the element to the card
        if (item.number_of_pages_median !== undefined) {
          card.appendChild(numberOfPagesElement);
        }

        // Append the image element to the card
        card.appendChild(imageElement);

        // Check if the cover is defined and append the card to the result div
        if (item.cover_i !== undefined) {
          resultDiv.appendChild(card);
        }

        // Add event listeners to the card for hover effects
        card.addEventListener('mouseover', () => {
          card.classList.add('focus');
        })

        card.addEventListener('mouseout', () => {
          card.classList.remove('focus')
        })
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
