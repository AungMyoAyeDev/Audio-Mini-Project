import { tracks } from "./track.js";
const audioElement = document.getElementById("audio-elem");
const playTag = document.getElementById("play");
const pauseTag = document.getElementById("pause");
const img = document.getElementById("img");
const seekBar = document.getElementById("progress");
let curr = 0;
let isPlaying = false;
//Render the songs list
const render = () => {
    tracks.map((item, index) => {
        const audioElem = document.createElement("div");
        audioElem.classList.add("songs-con");
        audioElem.id = item.id;
        audioElem.innerHTML = `
         <h4>${item.title}</h4>
          <p>${item.artist}</p>
  `;

        document.querySelector("content").append(audioElem);
        audioElem.onclick = () => {
            curr = index;
            selected();
            audioElem.classList.add("selected");

            playing();
        };
    });
};
render();
const playing = () => {
    audioElement.src = tracks[curr].src;
    audioElement.play();
    isPlaying = true;
    uiUpdate();
};
const selected = () => {
    let select = document.querySelectorAll(".songs-con");

    for (const a of select) {
        if (a.classList.contains("selected")) {
            a.classList.remove("selected");
        }
    }
};

const uiUpdate = () => {
    img.src = tracks[curr].img;
    if (isPlaying) {
        playTag.style.display = "none";
        pauseTag.style.display = "inline";
        isPlaying = false;
    } else {
        playTag.style.display = "inline";
        pauseTag.style.display = "none";
        isPlaying = true;
    }
};

audioElement.addEventListener("timeupdate", () => {
    let total = audioElement.duration;
    let currTime = audioElement.currentTime;
    seekBar.value = (currTime / total) * 100;
    document.getElementById("duration").innerHTML =
        timeUpdate(total) + "/" + timeUpdate(currTime);
});
seekBar.onchange = () => {
    audioElement.currentTime = (seekBar.value / 100) * audioElement.duration;
};
const timeUpdate = time => {
    let min = Math.round(time / 60);
    let sec = Math.round(time % 60);
    let mins = min < 10 ? "0" + min.toString() : min;
    let secs = sec < 10 ? "0" + sec.toString() : sec;
    return mins + ":" + secs;
};
playTag.addEventListener("click", () => {
    if (audioElement.currentTime === 0) {
        playing();
    } else {
        audioElement.play();
        uiUpdate();
    }
});
pauseTag.addEventListener("click", () => {
    audioElement.pause();
    isPlaying = false;
    uiUpdate();
});
document.getElementById("next").addEventListener("click", () => {
    if (curr === tracks.length - 1) {
        curr = 0;
        playing();
    } else {
        curr++;
        playing();
    }
});
document.getElementById("previous").addEventListener("click", () => {
    if (curr == 0) {
        return;
    } else {
        curr--;
        playing();
    }
});
img.src = "img/Red.jpg";
