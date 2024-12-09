"use strict";

const createPin = document.getElementById("createPin");
const locatePin = document.getElementById("locatePin");
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
      pin.addEventListener("click", function () {
        let deletePin = confirm("Silmek istediğinizden emin misiniz?");
        if (deletePin) {
          this.remove();
          arr = arr.filter((item) => this.id !== item.hashtag);
          localStorage.setItem("pins", JSON.stringify(arr));
          console.log(arr);
          alert(`${this.id} kaldırıldı;`);
        } else {
          alert("Silme işlemi iptal edildi");
        }
      });
      isLocated = true;
      contain.appendChild(pin);
    });
  } else {
    console.log("Hiç pin bulunamadı.");
  }
});

photo.addEventListener("mouseover", () => (photo.style.cursor = "pointer"));

photo.addEventListener("click", (e) => {
  let xPosition = e.offsetX;
  let yPosition = e.offsetY;
  console.log(xPosition, yPosition);
  document.getElementById("xPosition").value = xPosition;
  document.getElementById("yPosition").value = yPosition;
});

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
      alert(`${hashtagValue} değerini daha önceden kullandınız`);
      document.getElementById("hashtag").value = "";
      document.getElementById("description").value = "";
      document.getElementById("xPosition").value = "";
      document.getElementById("yPosition").value = "";
    } else {
      let searchPosition = arr.some(
        (item) =>
          item.xPosition === xPositionValue.trim() &&
          item.yPosition === yPositionValue.trim()
      );
      if (searchPosition) {
        alert(`Bu konuma daha öncesinde pin yerleştirdiniz.`);
        document.getElementById("hashtag").value = "";
        document.getElementById("description").value = "";
        document.getElementById("xPosition").value = "";
        document.getElementById("yPosition").value = "";
      } else {
        if (
          xPositionValue.trim() > 500 ||
          yPositionValue.trim() > 750 ||
          (xPositionValue.trim() || yPositionValue.trim()) < 0
        ) {
          alert(`Fotoğrafın boyutundan farklı değer girdiniz`);
          document.getElementById("hashtag").value = "";
          document.getElementById("description").value = "";
          document.getElementById("xPosition").value = "";
          document.getElementById("yPosition").value = "";
        } else {
          alert("Pin oluşturuldu!");
          isLocated = false;
        }
      }
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
      localStorage.setItem("pins", JSON.stringify(arr));
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
          localStorage.setItem("pins", JSON.stringify(arr));
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
 input image file
 what if user create pin but dont locate and then try to create same 
*/
