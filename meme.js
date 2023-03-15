const urlContainer = document.getElementById("pic-form");
const textContainer = document.getElementById("text-form");
const submitContainer = document.getElementById("finish");
const selectors = document.getElementById("selector-container");

const buttons = document.querySelectorAll("button");

const imgUrl = document.getElementById("pic-url");

const topTextInput = document.getElementById("top-text");
const bottomTextInput = document.getElementById("bottom-text");
const topText = document.getElementById("upper");
const bottomText = document.getElementById("lower");

const pic = document.getElementById("image");

const textColor = document.getElementById("color");
const topPostion = document.getElementById("top-postion");
const bottomPostion = document.getElementById("bottom-postion");

const preview = document.getElementById("preview");

let pageTarget = "link-page";

function linkPage() {
	urlContainer.style.marginLeft = "20px";
	textContainer.style.marginLeft = "100%";
	submitContainer.style.marginLeft = "100%";
}
function textPage() {
	urlContainer.style.marginLeft = "-100%";
	textContainer.style.marginLeft = "20px";
	submitContainer.style.marginLeft = "100%";
}

function submitPage() {
	urlContainer.style.marginLeft = "-100%";
	textContainer.style.marginLeft = "-100%";
	submitContainer.style.marginLeft = "20px";
}

function saveMeme() {
    let save = [];
    let memeObj = {};
	if (localStorage.getItem("Memes")) {
        save = JSON.parse(localStorage.getItem("Memes"));
		localStorage.clear();
	}
	memeObj.picSource = imgUrl.value;
	memeObj.tText = topTextInput.value;
	memeObj.bText = bottomTextInput.value;
	memeObj.textColor = textColor.value;
	memeObj.tPos = topText.style.bottom;
	memeObj.bPos = bottomText.style.top;
	save.push(memeObj);
	localStorage.setItem("Memes", JSON.stringify(save));
}

function refreshMemes() {
    const selectMemes = document.querySelectorAll(".finished-meme");
    for (let selection of selectMemes){
        selection.remove();
    }
}

function postMemes() {
    let temp = JSON.parse(localStorage.getItem("Memes"));
    for (let items of temp) {
        const finishedMemes = document.querySelector("#meme-display");
        const newDiv = document.createElement("div");
        const tDiv = document.createElement("div");
        const bDiv = document.createElement("div");
        newDiv.appendChild(tDiv);
        newDiv.appendChild(bDiv);
        finishedMemes.appendChild(newDiv);
        newDiv.classList.add("finished-meme");
        tDiv.classList.add("memeTextTop");
        bDiv.classList.add("memeTextBottom");
        newDiv.style.backgroundImage = "url(" + items.picSource + ")";
        tDiv.innerText = items.tText;
        bDiv.innerText = items.bText;
        tDiv.style.color = items.textColor;
        bDiv.style.color = items.textColor;
        tDiv.style.bottom = items.tPos;
        tDiv.style.paddingTop = "6rem";
        bDiv.style.top = items.bPos;
    }
}

function clearSelections() {
	imgUrl.value = "";
	pic.style.backgroundImage = "";
	topTextInput.value = "";
	bottomTextInput.value = "";
	topText.innerText = "";
	bottomText.innerText = "";
	textColor.value = "#000000";
	topText.style.color = "black";
	bottomText.style.color = "black";
	topText.style.bottom = "7.5rem";
	bottomText.style.top = "6.5rem";
	topPostion.value = "7.5";
	bottomPostion.value = "6.5";
}

selectors.addEventListener("click", (e) => {
	pageTarget = e.target.id;
	if (pageTarget === "link-page") {
		linkPage();
	}
	if (pageTarget === "text-page") {
		textPage();
	}
	if (pageTarget === "submit-page") {
		submitPage();
	}
});

for (let button of buttons) {
	button.addEventListener("click", (e) => {
		let buttonTarget = e.target.id;
		if (buttonTarget === "enter-url") {
			let img = imgUrl.value;
			pic.style.backgroundImage = "url(" + img + ")";
			textPage();
		}
		if (buttonTarget === "enter-text") {
			let upper = topTextInput.value;
			let lower = bottomTextInput.value;
			topText.innerText = upper;
			bottomText.innerText = lower;
			submitPage();
		}
		if (buttonTarget === "color-select") {
			let changeColor = textColor.value;
			topText.style.color = changeColor;
			bottomText.style.color = changeColor;
		}
		if (buttonTarget === "generate-meme") {
			saveMeme();
			clearSelections();
            refreshMemes();
			linkPage();
            postMemes();
		}
	});
}

topPostion.addEventListener("input", () => {
	topText.style.bottom = topPostion.value + "rem";
});

bottomPostion.addEventListener("input", () => {
	bottomText.style.top = bottomPostion.value + "rem";
});

if (localStorage.getItem("Memes")) {
    postMemes();
}
