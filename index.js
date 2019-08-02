'use strict';

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'jeUZvM7Vfk1LTuMVUJpMH8mruyWN9p6hbf4z6lBd'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  console.log(responseJson.data.fullName);
  for (let result of responseJson.data) {
    $('#results-list').append(`
      <h2><p>Park Name: ${result.fullName}</p></h2>
      <p>Description: ${result.description}</p>
      <p>Website URL: ${result.url}</p>
  `)};
};

function getParkInfo(query, maxResults) {

  const params = {
    stateCode : query,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = `${searchURL}?${queryString}&api_key=${apiKey}`;

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
    const maxResults = $('#js-max-results').val();
    getParkInfo(searchTerm, maxResults);
    
  });
}

$(watchForm);
