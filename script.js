const form = document.getElementById("form-element");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchQuery = document.getElementById("searchQuery").value;
  const plusQuery = searchQuery.split(" ").join("+");

  const apiUrl = `https://openlibrary.org/search.json?q=${plusQuery}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const resultDiv = document.getElementById("resultDiv");
      resultDiv.innerHTML = "";

      data.docs.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const titleElement = document.createElement("a");
        titleElement.textContent = item.title;

        // Google search link test
        const itemTitle = item.title
        const itemTitleSplit = itemTitle.split(' ')
        const itemTitleJoin = itemTitleSplit.join('+')
        const googleSearch = `https://www.google.com/search?q=${itemTitleJoin}`
        console.log(googleSearch)
        // Google search link end
        titleElement.href = googleSearch
        titleElement.target = '_BLANK'


        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${item.author_name}`;

        const numberOfPagesElement = document.createElement("p");
        numberOfPagesElement.textContent = `Pages: ${item.number_of_pages_median}`;

        const imageElement = document.createElement("img");
        imageElement.src = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;

        card.appendChild(titleElement);
        card.appendChild(authorElement);

        if (item.number_of_pages_median !== undefined) {
          card.appendChild(numberOfPagesElement);
        }
        card.appendChild(imageElement);

        if (item.cover_i !== undefined) {
          resultDiv.appendChild(card);
        }

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
