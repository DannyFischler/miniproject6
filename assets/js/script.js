const searchForm = document.getElementById('searchForm');
const searchQueryInput = document.getElementById('searchQuery');
const formatSelect = document.getElementById('formatSelect');
const resultsContainer = document.getElementById('resultsContainer');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = searchQueryInput.value;
  const selectedFormat = formatSelect.value;

  let apiUrl = `https://www.loc.gov/search/?format=${selectedFormat}&q=${query}&fo=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      resultsContainer.innerHTML = '';

      if (data.results && data.results.length > 0) {
        data.results.forEach(result => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('result-item');
          itemDiv.innerHTML = `
            <h2>${result.title}</h2>
            <p>${result.description}</p>
          `;
          resultsContainer.appendChild(itemDiv);
        });
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsContainer.innerHTML = '<p>An error occurred while fetching data.</p>';
    });
});
