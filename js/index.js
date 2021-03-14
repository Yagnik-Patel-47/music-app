"use strict";

const library = document.querySelector("#library");
const app = document.querySelector("#player");
const libBtn = document.querySelector("#go-lib");
const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", makeLibrary);

const musicData = [
  {
    name: "The Nights",
    url: "The_Nights.mp3",
    singers: "Avicii",
    cover: "the_nights_cover.jpeg"
  },
  {
    name: "Mood Remix",
    url: "Mood_Remix.mp3",
    singers: "24kGoldn, Iann Dior, Justin Bieber, J Balvin",
    cover: "mood_remix_cover.jpeg"
  },
  {
    name: "Old Town Road",
    url: "Old_Town_Road.mp3",
    singers: "Lil Nas X, ft. Billy Ray Cyrus",
    cover: "old_town_road_cover.jpeg"
  },
  {
    name: "Brown Munde",
    url: "Brown_Munde.mp3",
    singers: "AP Dilhon, Gurinder Gill, Shinda Kahlon",
    cover: "brown_munde_cover.jpeg"
  },
  {
    name: "Astronaut In The Ocean",
    url: "Astronaut_in_the_Ocean.mp3",
    singers: "Masked Wolf",
    cover: "astronaut_cover.jpeg"
  },
  {
    name: "Trampoline",
    url: "trampoline.mp3",
    singers: "SHAED, Zayn",
    cover: "trampoline_cover.jpeg"
  }
];

let needObject;

function makeLibrary() {
  musicData.forEach((music, i) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("musics");
    const songCoverCon = document.createElement("div");
    const songCover = document.createElement("img");
    songCover.setAttribute("src", `./assets/covers/${music.cover}`);
    songCoverCon.appendChild(songCover);
    const playBtn = document.createElement("img");
    playBtn.setAttribute("src", "./assets/icons/play.svg");
    playBtn.classList.add("library-play");
    playBtn.addEventListener("click", () => {
      app.classList.remove("hidden");
      library.classList.add("hidden");
      needObject = music;
    });
    const songNameCon = document.createElement("p");
    const songName = document.createTextNode(music.name);
    songNameCon.classList.add("library-name");
    songNameCon.appendChild(songName);
    songDiv.appendChild(songCoverCon);
    songDiv.appendChild(songNameCon);
    songDiv.appendChild(playBtn);
    songDiv.classList.add("songWrapper");
    songNameCon.classList.add("name-wrapper");
    songCoverCon.classList.add("cover-wrapper");
    
    library.appendChild(songDiv);
  });
}

setTimeout(function() {
  let elems = document.querySelectorAll(".library-play");
  elems.forEach(elm => {
    elm.addEventListener("click", playerScreen);
  });
}, 0);

const cover = document.querySelector(".song-cover");
const audio = document.querySelector("audio");
const songTitle = document.querySelector(".songInfo h4");
const singers = document.querySelector(".songInfo p");
const audioSource = document.querySelector("audio source");

function playerScreen() {
  cover.addEventListener("load", () => {
    cover.classList.add("animate");
  });
  songTitle.innerText = needObject.name;
  singers.innerText = needObject.singers;
  cover.setAttribute("src", `./assets/covers/${needObject.cover}`);
  audioSource.setAttribute("src", `./assets/${needObject.url}`);
  audio.load();
  body.style.background = `url(./assets/covers/${needObject.cover}) no-repeat center / cover`;
  setInterval(() => {
    if (audio.paused) {
      cover.style.animationPlayState = "paused";
    } else {
      cover.style.animationPlayState = "initial";
    }
    if (audio.currentTime === audio.duration || audio.currentTime === 0) {
      cover.classList.remove("animate");
    } else {
      cover.classList.add("animate");
    }
  }, 10);
}

libBtn.addEventListener("click", () =>
{
  app.classList.add("hidden");
  library.classList.remove("hidden");
  
  const cover = document.querySelector(".song-cover");
  const audio = document.querySelector("audio");
  audio.pause();
  const audioSource = document.querySelector("audio source");
  cover.setAttribute("src", "");
  cover.classList.remove("animate");
  audioSource.setAttribute("src", "");
  body.style.background = "initial";
});