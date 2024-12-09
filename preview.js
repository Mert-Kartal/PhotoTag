"use script";

const contain = document.getElementById("contain");
const photo = document.getElementById("photo");
let isLocated;
let arr = JSON.parse(localStorage.getItem("pins")) || [];
let pin;

document.addEventListener("DOMContentLoaded", () => {
  if (arr.length > 0) {
    arr.forEach((item) => {
      isLocated = false;
      pin = document.createElement("div");
      pin.id = item.hashtag;
      pin.setAttribute("desc", item.description);
      pin.style.left = `${item.xPosition}px`;
      pin.style.top = `${item.yPosition}px`;
      pin.classList.add("popStyle");
      pin.addEventListener("mouseover", function () {
        console.log(
          `Hashtag: ${this.id}, Description: ${this.getAttribute("desc")}`
        );
        this.innerHTML = `
          <div class="popover">
              <div id="hashtagPlace" class="p-1 rounded-top-2">${this.id}</div>
              <div id="descpPlace" class="p-1 rounded-bottom-2">${this.getAttribute(
                "desc"
              )}</div>
          </div>
          `;
      });
      pin.addEventListener("mouseout", function () {
        this.innerHTML = ``;
      });
      isLocated = true;
      contain.appendChild(pin);
    });
  } else {
    console.log("Hiç pin bulunamadı.");
  }
});
