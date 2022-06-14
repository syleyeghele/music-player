const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');


//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'SlyMan Electric Music1',
        artist: 'Sly1',
    },
    {
        name: 'jacinto-2',
        displayName: 'SlyMan Electric Music2',
        artist: 'Sly2',
    },
    {
        name: 'jacinto-3',
        displayName: 'SlyMan Electric Music3',
        artist: 'Sly3',
    },
    {
        name: 'metric-1',
        displayName: 'SlyMan Electric Music4',
        artist: 'Sly4',
    }
]


//check if playing
let isPlaying = false;

//Play
function playSong() {
    isPlaying = true;
    hide = document.getElementById("play").classList;
    hide.add("display-pause");
    show = document.getElementById("pause").classList;
    show.remove("display-pause");
    music.play()
}

//Pause 
function pauseSong() {
    isPlaying = false;
    hide = document.getElementById("pause").classList;
    hide.add("display-pause");
    show = document.getElementById("play").classList;
    show.remove("display-pause");
    music.pause()
}

//Play or Pause Event Listerner

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
pauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


// Current Song
let songIndex = 0;

// Prev Song
// Next Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// On Load - Select First Song
loadSong(songs[songIndex]);


//Update Progress Bar & Time
function updateProgressBar (e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        //Calculate the display for the duration
        const durationMinutes = Math.floor (duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes} :${durationSeconds}`;
        }

         //Calculate the display for tcurrent
         const currentMinutes = Math.floor (currentTime / 60);
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10){
             currentSeconds = `0${currentSeconds}`
         }
         currentTimeEl.textContent = `${currentMinutes} :${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration
}

//Event Listerner
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);