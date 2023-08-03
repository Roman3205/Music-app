let container = document.querySelector('.album')
let playlist = document.querySelector('.playlist')
let search = new URLSearchParams(window.location.search)

let i = search.get('i')

let album = albums[i]

if(!album) {
    container.innerText = `Ошибка`
    setTimeout(window.location.pathname = `index.html`, 5000)

} else {
    container.innerHTML += `
        <div class="card mb-3">
            <div class="row">
                <div class="col-4">
                    <img src="${album.img}" alt="" class="img-fluid rounded-start">
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-item">${album.title}</h5>
                        <p class="card-text">${album.description}</p>
                        <p class="card-text"><small class="text-muted">Альбом выпущен в ${album.year} году</small></p>
                    </div>
                </div>
            </div>
        </div>
    `
    album.tracks.forEach(element => {
        playlist.innerHTML += `
            <li class="track list-group-item d-flex align-items-center">
                <img src="assets/play-button.png" alt="" class="me-3 play" height="30px">
                <img src="assets/pause.png" alt="" class="me-3 pause d-none" height="30px">
                <div>
                    <div>${element.title}</div>
                    <div class="text-secondary">${element.author}</div>
                </div>
                <div class="progress ms-5 me-2" style="width: 50%;">
                    <div class="progress-bar" role="progressbar" style="width: 0%;"></div>
                </div>
                <div class="time ms-auto">${element.time}</div>
                <audio class="audio" src="${element.src}"></audio>
            </li>
        ` 
    })
}

function setupAudio() {
    let trackNodes = document.querySelectorAll(`.track`)
    for (let i = 0; i < trackNodes.length; i++) { 
        let node = trackNodes[i]
        let progress = document.querySelector('.progress-bar')
        let audio = node.querySelector(`.audio`)
        let isPlaying = false
        node.addEventListener(`click`, function () {
            if (isPlaying) {
                isPlaying = false
                audio.pause()
                document.querySelector('.play').classList.remove('d-none')
                document.querySelector('.pause').classList.add('d-none')
            } else {
                isPlaying = true
                audio.play()
                updateProgress()
                document.querySelector('.pause').classList.remove('d-none')
                document.querySelector('.play').classList.add('d-none')
            }
        })

        let timeNode = document.querySelector('.time')

        function updateProgress() {
            let time = getTime(audio.currentTime)
            if(timeNode.innerHTML != time) {
                timeNode.innerHTML = time
                progress.style.width = audio.currentTime * 100 / audio.duration + '%'
            }

            if(isPlaying) {
                requestAnimationFrame(updateProgress)
            }
        }
    }
}

setupAudio()

function getTime(time) {
    let currentSecond = Math.floor(time)
    let minutes = Math.floor(currentSecond / 60)
    let seconds = Math.floor(currentSecond % 60)

    if(minutes < 10) {
        minutes = '0' + minutes
    }

    if(seconds < 10) {
        seconds = '0' + seconds
    }

    return `${minutes}:${seconds}`
}