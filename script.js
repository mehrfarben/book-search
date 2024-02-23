const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});

function searchBooks() {
  const url = "https://www.googleapis.com/books/v1/volumes?q=$" + searchInput.value + "&maxResults=30";
  const resultsContainer = document.getElementById("results");

  if (!searchInput) {
    resultsContainer.innerHTML = "Kitap Adı Giriniz.";
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = "";

        if (data.items && data.items.length > 0) {
          data.items.forEach((book) => {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Bilinmeyen Yazar";
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";

            resultsContainer.innerHTML += `
                        <div>
                            <h3>${title}</h3>
                            <p>Yazar: ${authors}</p>
                            <img src="${thumbnail}" alt="${title}" onerror="this.src='https://placehold.co/120x170';">
                            <hr color=black>
                        </div>
                    `;
          });
        } else {
          resultsContainer.innerHTML = "Kitap Bulunamadı.";
        }
      })
      .catch((error) => console.error("Veri getirilemedi:", error));
  }
}
