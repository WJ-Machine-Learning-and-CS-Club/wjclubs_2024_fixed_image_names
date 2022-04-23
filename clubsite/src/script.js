const rangeInput = document.querySelector('input[type = "range"]');
const imageList = document.querySelector(".image-list");
const searchInput = document.querySelector('input[type="search"]');
const photosCounter = document.querySelector(".toolbar .counter span");
const imageListItems = document.querySelectorAll(".image-list li");
const captions = document.querySelectorAll(".image-list figcaption");
const myArray = [];
let counter = 1;
const active = "active";
const dNone = "d-none";



// SEARCH FUNCTIONALITY
for (const caption of captions) {
  myArray.push({
	id: counter++,
	text: caption.textContent
  });
}

searchInput.addEventListener("keyup", keyupHandler);

window.onload = function funLoad() {
       	photosCounter.textContent= myArray.length;
    	}



 

function keyupHandler() {
  for (const item of imageListItems) {
	item.classList.add(dNone);
  }
  const text = this.value;
  const filteredArray = myArray.filter(el => el.text.toLowerCase().includes(text.toLowerCase()));
  if (filteredArray.length > 0) {
	for (const el of filteredArray) {
  	document.querySelector(`.image-list li:nth-child(${el.id})`).classList.remove(dNone);
	}
  }
  photosCounter.textContent = filteredArray.length;
}

function catClick(el){
  searchInput.value = el.textContent;
  if(el.id=="games"){
    searchInput.value = "Games/Sports";
  }
    if(el.id=="charity"){
    searchInput.value = "Charity/Activism";
  }
  searchInput.dispatchEvent(new KeyboardEvent('keyup', {'key':'y'}));
}