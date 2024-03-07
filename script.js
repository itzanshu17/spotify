console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "O-Mere Dil Ke Chain", filePath: "songs/1.mp3", coverPath: "images.png"},
    {songName: "Ek Ladki Ko Dekha", filePath: "songs/2.mp3", coverPath:"images.png"},
    {songName: "Apki Nazro Ne Samjha", filePath: "songs/3.mp3", coverPath:"images.png"},
    {songName: "Lag Ja Gle", filePath: "songs/4.mp3", coverPath:"images.png"},
    {songName: "Jane Wo Kaise", filePath: "songs/5.mp3", coverPath:"images.png"},
    {songName: "Neele Neele Ambar Pr", filePath: "songs/6.mp3", coverPath:"images.png"},
    {songName: "Tere Bina Zindgi Se", filePath: "songs/7.mp3", coverPath:"images.png"},
    {songName: "Yeh Raat Bheegi Bheegi", filePath: "songs/8.mp3", coverPath:"images.png"},
    {songName: "Khushnaseeb", filePath: "songs/9.mp3", coverPath:"images.png"},
    {songName: "Mere Mehaboob Quayamat", filePath: "songs/10.mp3", coverPath: "images.png"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
const volumeIcon = document.getElementById('volumeIcon');
const volumeRange = document.getElementById('volumeRange');

// Initialize volume to 1 (full volume)
audioElement.volume = 1;

// Event listener for volume range input
volumeRange.addEventListener('input', () => {
    const volume = parseFloat(volumeRange.value);
    audioElement.volume = volume;
    updateVolumeIcon(volume);
});

// Function to update volume icon based on the volume level
function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down');
        volumeIcon.classList.add('fa-volume-off');
    } else if (volume < 0.7) {
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-off');
        volumeIcon.classList.add('fa-volume-down');
    } else {
        volumeIcon.classList.remove('fa-volume-down', 'fa-volume-off');
        volumeIcon.classList.add('fa-volume-up');
    }
}

// Event listener for volume icon click
volumeIcon.addEventListener('click', () => {
    if (audioElement.volume === 0) {
        // If muted, restore the previous volume (if available)
        audioElement.volume = audioElement.lastVolume || 1;
        volumeRange.value = audioElement.volume;
    } else {
        // Mute the audio and remember the previous volume
        audioElement.lastVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeRange.value = 0;
    }
    updateVolumeIcon(audioElement.volume);
});