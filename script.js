function searchBooks() {
    const searchInput = document.getElementById('searchInput').value;
    const url = 'https://www.googleapis.com/books/v1/volumes?q=$'+ searchInput +'&maxResults=30';
   

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (data.items && data.items.length > 0) {
                data.items.forEach(book => {
                    const title = book.volumeInfo.title;
                    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Bilinmeyen Yazar';
                    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';

                    resultsContainer.innerHTML += `
                        <div>
                            <h3>${title}</h3>
                            <p>Yazar: ${authors}</p>
                            <img src="${thumbnail}" alt="${title}">
                            <hr color=black>
                        </div>
                    `;
                });
            } else {
                resultsContainer.innerHTML = 'Kitap Bulunamadı.';
            }
      
        })
        .catch(error => console.error('Veri getirilemedi:', error));
}