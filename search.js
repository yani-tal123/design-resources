import { webData, elementsData, otherData } from "./data.js";

const input = document.querySelector("input");
const resultsContainer = document.getElementById("results-sections");
const searchHeader = document.getElementById("h2-search");
const cancelBtn = document.getElementById("cancel-btn");

let totalLinksList = [];
let totalTopicsList = [];
let searchResults = [];
let topicResults = [];

addToTotalTopicsList(webData);
addToTotalTopicsList(elementsData);
addToTotalTopicsList(otherData);

function addToTotalTopicsList(dataCategory) {
  dataCategory.forEach(element => {
    totalTopicsList.push(element);
  });
}

addToTotalLinksList(webData);
addToTotalLinksList(elementsData);
addToTotalLinksList(otherData);

function addToTotalLinksList(dataCategory) {
  dataCategory.slice(1).forEach(element => {
    element.linksList.forEach(link => {
      totalLinksList.push(link);
    });
  });
}

input.addEventListener("keyup", () => {

  searchResults = [];
  topicResults = [];

  totalLinksList.forEach(link => {
    if (link.name.toLowerCase().includes(input.value.toLowerCase())) {
      searchResults.push(link);
    }
  });

  totalTopicsList.forEach(topic => {
    if (topic.name.toLowerCase().includes(input.value.toLowerCase())) {
      topicResults.push(topic);
    }
  });

  if ((searchResults.length === 0 && topicResults.length === 0) || input.value === "") {
    resultsContainer.innerHTML = "<p></p>";
    searchHeader.textContent = "Ничего не найдено"
  } else {
    displaySearchResults();
  }
});

function displaySearchResults() {

  let totalResultsNumber = 0;
  let html = "";

  searchResults.forEach(result => {
    totalResultsNumber++;
    html += `
      <div class="link-container">
        <div class="img-container">
          <img src='http://www.google.com/s2/favicons?domain=${result.link}' />
        </div>
        <p><a href="${result.link}" target="_blank">${result.name}</a></p>
      </div>
    `;
  });

  topicResults.forEach(topic => {
    html += `
      <div class="topic-container">
        <h2>${topic.name}</h2>
    `;

    topic.linksList.forEach(result => {
      totalResultsNumber++;
      html += `
        <div class="link-container">
          <div class="img-container">
            <img src='http://www.google.com/s2/favicons?domain=${result.link}' />
          </div>
          <p><a href="${result.link}" target="_blank">${result.name}</a></p>
        </div>
      `;
    })

    html += `
      </div>
    `;
  })

  resultsContainer.innerHTML = html;

  let stringNumber = String(totalResultsNumber).slice(-1);
  let resultName = "";

  if (stringNumber === "1" && totalResultsNumber !== 11) {
    resultName = "результат";
  } else if ((stringNumber === "2" || stringNumber === "3" || stringNumber === "4") && totalResultsNumber !== 12 && totalResultsNumber !== 13 && totalResultsNumber !== 14) {
    resultName = "результата";
  } else {
    resultName = "результатов";
  }

  searchHeader.textContent = totalResultsNumber + " " + resultName;
}

cancelBtn.addEventListener("click", () => {
  input.textContent = "";
  input.value = "";
  resultsContainer.innerHTML = "<p></p>";
  searchHeader.textContent = ""
});