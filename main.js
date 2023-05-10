const videoSrc = document.querySelector("#video-source");
const videoTag = document.querySelector("#video-tag");
const inputTag = document.querySelector("#input-tag");
const seekTimer = document.querySelector("#seektime");
const play_display = document.querySelector("#play_display");
const adImg = document.querySelector("#adImage");
const adText = document.querySelector("#adText");
const volSlider = document.querySelector("#vol");
var seekslider;
vid = videoTag;
canPause = true;
play_display.style.animationPlayState = "paused";
play_display.style.display = "none";
inputTag.addEventListener('change', readVideo);

function getRandom(max) {return Math.floor(Math.random() * max + 1);}
function canPauseFunc() {canPause = true; play_display.style.display = "none";}

var playButton = document.getElementById("play_button");
// Event listener for the play/pause button
playButton.addEventListener("click", function () {
  video = videoTag;
  if (canPause == true) {
    canPause = false;
    play_display.style.display = "block";
    if (video.paused == true) {
      // Play the video
      video.play();
      showButton();
      // Update the button text to 'Pause'
      playButton.innerHTML = '<i class="fa fa-pause"></i>';
      play_display.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
      // Pause the video
      video.pause();
      showButton();
      // Update the button text to 'Play'
      playButton.innerHTML = '<i class="fa fa-play"></i>';
      play_display.innerHTML = '<i class="fa fa-play"></i>';
    }
    setTimeout(canPauseFunc, 1200);
  }
});

function myF() {
  play_display.style.animationPlayState = "paused";
}
function showButton() {
  play_display.style.animationPlayState = "running";
  setTimeout(myF, 1000)
}

function readVideo(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      videoSrc.src = e.target.result
      console.log(e.target);
      videoTag.load()
      //saveToWeb(e.target.result)
      save(e.target.result);
    }.bind(this)

    reader.readAsDataURL(event.target.files[0]);
  }
}

function loadFromStorage() {
  sugestions = document.querySelector(".suggestions")
  sugestions.innerHTML = "";
  for (i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    fileType = key.split(".").slice(1).join(".");
    if (fileType == "video") {
      sugestions.innerHTML = sugestions.innerHTML + "<button class='minor' onclick='startQuery(this)'>" + key + "</button>";
    }

  }
}
loadFromStorage()
function save(data) {
  title = document.querySelector("#title");
  video = document.querySelector("#video-source");
  if (data != null) {
    localStorage.setItem("temp.video", saveToWeb(data));
    loadFromStorage();
  }
  else if (title.value != "" && video.src != "") {
    localStorage.setItem(title.value + ".video", saveToWeb(video.src));
    loadFromStorage();
  }
}
function startQuery(obj) {
  tag = obj.innerText;
  footage = localStorage.getItem(tag);
  videoSrc.src = footage;
  videoTag.load();
}
function saveToWeb(data) {
  const blob = new Blob([data], { type: "mp4" });
  const href = URL.createObjectURL(blob);
  return href
}

seekslider = document.getElementById("seekslider");
seekslider.addEventListener("change", vidSeek, false);
function vidSeek() {
  var seekto = vid.duration * (seekslider.value / 100);
  vid.currentTime = seekto;
}
vid.addEventListener("timeupdate", seektime, false);
function seektime() {
  var ct = vid.currentTime * (100 / vid.duration);
  seekslider.value = ct;
  seekTimer.innerText = Math.round(vid.currentTime) + "/" + Math.round(vid.duration);
}
volSlider.addEventListener("change", vidVol, false);
function vidVol() {
  vid.volume = volSlider.value / 10;
}

function playBFadvert(vidfile) {vid.src = vidfile; vid.currentTime = 0; vid.play();}

var adImages = ["https://cdn.redmondpie.com/wp-content/uploads/2012/09/iPhone-5-splash.png","https://iwater.bookie0.repl.co/media/bottles/landing.png","https://worldwideinterweb.com/wp-content/uploads/2016/12/barbie-knockoff.jpg","https://www.designbolts.com/wp-content/uploads/2021/06/50-Knock-Off-Famous-Brands-Getting-Owned-Its-Hilarious.jpg", "https://external-preview.redd.it/1CDWyDblR_kEFCYTw7SejslWuXNgNNcHZq-nQq38Els.jpg?auto=webp&s=2171a2701d772bbc44c80281ef4a33efdc4d810b"];
var adTexts = ["<b>Iphone 5</b>, the tallest thing to happen to Iphone <button onclick='playBFadvert(`applead.mp4`);' class='adB'>view ad</button>","<b>Iwater</b>, think diffrent. (<a target='_blanc' href='https://iwater.bookie0.repl.co/'>website</a>)","<b>Crust,</b> Extra Whitening Formula! (Anty Cavity toothpaste).","Burger friends is the best place to get a burger!!!1! <button onclick='playBFadvert(`bfad.mp4`);' class='adB'>view ad</button>", "9/11 superstore, the 9/11 event wasnt a plane crash, but our stocks crash."];
adNum = getRandom(adImages.length) - 1;
adImg.src = adImages[adNum];
adText.innerHTML = adTexts[adNum];