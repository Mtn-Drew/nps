'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  for (let result of responseJson) {
    $('#results-list').append(`
      <p>Repo: ${result.name}</p>
      <p>Link: ${result.url}</p>
  `)};
};

function getRepos(query) {

  const url = `${searchURL}${query}/repos`; 
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        $('#js-error-message').hide();
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#results-list').empty();
      $('#js-error-message').show();
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
