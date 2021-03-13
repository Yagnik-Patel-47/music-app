"use strict";

import musicData from "./data.js";

const library = document.querySelector("#library");
const app = document.querySelector("#player");
const libBtn = document.querySelector("#go-lib");

document.addEventListener("DOMContentLoaded", makeLibrary);

let needObject;

function makeLibrary() {
  musicData.forEach((music, i) => {
    const songDiv = document.createElement("div");
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

const body = document.querySelector("body");

setTimeout(function() {
  let elems = document.querySelectorAll(".library-play");
  elems.forEach(elm => {
    elm.addEventListener("click", playerScreen);
  });
}, 0);

function playerScreen() {
  const cover = document.querySelector(".song-cover");
  cover.addEventListener("load", () => {
    cover.classList.add("animate");
  });
  const audio = document.querySelector("audio");
  const songTitle = document.querySelector(".songInfo h4");
  const singers = document.querySelector(".songInfo p");
  songTitle.innerText = needObject.name;
  singers.innerText = needObject.singers;
  const audioSource = document.querySelector("audio source");
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

libBtn.addEventListener("click", () => {
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