import { webData, elementsData, otherData } from "./data.js";

const web = document.getElementById("web");
const elements = document.getElementById("elements");
const other = document.getElementById("other");

function generateHTML(section, header, dataSet) {
  let html = `<h2>${header}</h2>`
  dataSet.forEach(subsection => {
    let linksHTML = "";
    subsection.linksList.forEach(linkData => {
      linksHTML += `
    <p><a href="${linkData.link}" target="_blank">${linkData.name}</a></p>
    `;
    })
    html += `
  <div class="accordion">
      <img src="list-icon-closed.svg" id="${header}${subsection.name}" class="closed">
      <div class="accordion-text">
        <h3 id="${header}${subsection.name}" class="closed">${subsection.name}</h3>
        <div class="accordion-links closed" id="${header}${subsection.name}">
          ${linksHTML}
        </div>
      </div>
    </div>
  </div>
  `;
  });

  section.innerHTML = html;
}

generateHTML(web, "Веб", webData);
generateHTML(elements, "Элементы", elementsData);
generateHTML(other, "Другое", otherData);

//

const accordionLinks = document.querySelectorAll(".accordion-links");
const images = document.querySelectorAll("img");
const headers = document.querySelectorAll("h3");

images.forEach(image => {
  image.addEventListener("click", () => {
    const targetId = image.id;

    if (image.classList.value === "open") {
      image.classList.remove("open");
      image.classList.add("closed");
      image.src = "list-icon-closed.svg"

      accordionLinks.forEach(link => {
        if (link.id === targetId) {
          link.classList.remove("open")
          link.classList.add("closed");
        }
      })

    } else {
      image.classList.remove("closed");
      image.classList.add("open");
      image.src = "list-icon-open.svg"

      accordionLinks.forEach(link => {
        if (link.id === targetId) {
          link.classList.remove("closed");
          link.classList.add("open");
        }
      })
    }
  });
})

headers.forEach(header => {
  header.addEventListener("click", () => {
    const targetId = header.id;
    let targetImage;

    images.forEach(image => {
      if (image.id === targetId) {
        targetImage = image;
      }
    })

    if (header.classList.value === "open") {
      header.classList.remove("open");
      header.classList.add("closed");
      targetImage.src = "list-icon-closed.svg"

      accordionLinks.forEach(link => {
        if (link.id === targetId) {
          link.classList.remove("open")
          link.classList.add("closed");
        }
      })

    } else {
      header.classList.remove("closed");
      header.classList.add("open");
      targetImage.src = "list-icon-open.svg"

      accordionLinks.forEach(link => {
        if (link.id === targetId) {
          link.classList.remove("closed");
          link.classList.add("open");
        }
      })
    }
  });
})

// overflow-y: auto;
// max-height: 100%