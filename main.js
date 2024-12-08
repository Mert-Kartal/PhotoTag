"use strict";

let createPin = document.getElementById("createPin");
let locatePin = document.getElementById("locatePin");
let contain = document.getElementById("contain");
let isLocated;
let arr = [];
let pin;

createPin.addEventListener("click", () => {
  let hashtagValue = document.getElementById("hashtag").value;
  let descriptionValue = document.getElementById("description").value;
  let xPositionValue = document.getElementById("xPosition").value;
  let yPositionValue = document.getElementById("yPosition").value;

  if (
    !hashtagValue.trim() ||
    !descriptionValue.trim() ||
    !xPositionValue.trim() ||
    !yPositionValue.trim()
  ) {
    alert("Değer giriniz!");
  } else {
    let searchHashtag = arr.some(
      (item) => item.hashtag === hashtagValue.trim()
    );
    if (searchHashtag) {
      alert("Bu değeri önceden girdiniz");
      hashtagValue = "";
    } else {
      alert("Pin oluşturuldu!");
      isLocated = false;
    }
  }
});

locatePin.addEventListener("click", () => {
  let hashtagValue = document.getElementById("hashtag").value;
  let descriptionValue = document.getElementById("description").value;
  let xPositionValue = document.getElementById("xPosition").value;
  let yPositionValue = document.getElementById("yPosition").value;

  if (
    !hashtagValue.trim() ||
    !descriptionValue.trim() ||
    !xPositionValue.trim() ||
    !yPositionValue.trim()
  ) {
    alert("Değer giriniz!");
  } else {
    if (!isLocated) {
      let hashtagValueTrim = hashtagValue.trim();
      let descriptionValueTrim = descriptionValue.trim();
      let xPositionValueTrim = xPositionValue.trim();
      let yPositionValueTrim = yPositionValue.trim();
      pin = document.createElement("div");
      pin.id = hashtagValueTrim;
      pin.setAttribute("desc", descriptionValueTrim);
      pin.style.left = `${xPositionValueTrim}px`;
      pin.style.top = `${yPositionValueTrim}px`;
      pin.classList.add("popStyle");
      let newPin = {
        hashtag: hashtagValueTrim,
        description: descriptionValueTrim,
        xPosition: xPositionValueTrim,
        yPosition: yPositionValueTrim,
      };
      arr.push(newPin);
      newPin = {};

      document.getElementById("hashtag").value = "";
      document.getElementById("description").value = "";
      document.getElementById("xPosition").value = "";
      document.getElementById("yPosition").value = "";

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
      pin.addEventListener("click", function () {
        let deletePin = confirm("Silmek istediğinizden emin misiniz?");
        if (deletePin) {
          this.remove();
          arr = arr.filter((item) => this.id !== item.hashtag);
          console.log(arr);
          alert(`${this.id} kaldırıldı;`);
        } else {
          alert("Silme işlemi iptal edildi");
        }
      });
      isLocated = true;
    }
    contain.appendChild(pin);
  }
});

/*
 To Do
 preview in a page
 save local storage
 input image file
 X and Y coordinations
*/
