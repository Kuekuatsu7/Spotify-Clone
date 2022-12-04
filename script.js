console.log("Welcome to Spotify")

let songIndex= 0;
let audioELement = new Audio('songs/Enemy.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    {songName: "Enemy", filePath: "songs/Enemy.mp3", coverPath: "cover/1.jfif"},
    {songName: "Believer", filePath: "songs/Believer.mp3", coverPath: "cover/2.jfif"},
    {songName: "Demons", filePath: "songs/Demons.mp3", coverPath: "cover/3.jfif"},
    {songName: "Natural", filePath: "songs/Natural.mp3", coverPath: "cover/4.jfif"},
    {songName: "Warriors", filePath: "songs/Warriors.mp3", coverPath: "cover/5.jfif"},
    {songName: "Radioactive", filePath: "songs/Radioactive.mp3", coverPath: "cover/6.jfif"},
    {songName: "Bones", filePath: "songs/Bones.mp3", coverPath: "cover/7.jfif"},
    {songName: "Thunder", filePath: "songs/Thunder.mp3", coverPath: "cover/8.jfif"},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
    if(audioELement.paused || audioELement.currentTime<=0){
        audioELement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioELement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioELement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioELement.currentTime/audioELement.duration)*100);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change', ()=>{
    audioELement.currentTime = ProgressBar.value * audioELement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle'); 
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');        
        e.target.classList.add('fa-pause-circle'); 
        masterSongName.innerText = songs[songIndex].songName;
        audioELement.src = 'songs/${songIndex+1}.mp3';
        audioELement.currentTime = 0;
        audioELement.play();   
        gif.style.opacity = 1; 
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1
    }
    audioELement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioELement.currentTime = 0;
    audioELement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1
    }
    audioELement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioELement.currentTime = 0;
    audioELement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
})