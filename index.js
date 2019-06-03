// Variablen & Co. KG
const marker = document.querySelectorAll(".marker")
const topText = document.querySelector("#top-text")
let tempStartTime = null
let tempPrecision = []
let gameRunning = false
// let globalHighscore = 0

// function getGLobalHighscore() {
//     fetch("https://example.com/api/kalibrierungsgame/globalHighscore")
//         .then(raw => raw.json())
//         .then(json => globalHighscore = json.score)
// }

/**
 * Spiele eine Audio Datei ab
 * @param {String} path - Der Pfad zur Audio-Datei
 */
function playSound(path) {
    var audio = new Audio(path)
    audio.play()
}

/**
 * Countdown
 * @param {Integer} i - Von wie viel soll heruntergezählt werden?
 * @param {Function} callback - Funktion die ausgeführt wird wenn countdown fertig ist
 */
function countdown(i, callback) {

    // countdown ist fertig
    if (i <= 0) {
        document.querySelector("#countdown").innerHTML = ""
        callback()
        return
    }

    // zähle runter
    document.querySelector("#countdown").innerHTML = i
    setTimeout(() => countdown(i - 1, callback), 900)
}

/**
 * Alle Marker wurden geklickt, zeige nun score und highscore an
 */
function end() {

    const time = Date.now() - tempStartTime
    const score = calculateScore(time)

    // Highscore
    let highscore = parseInt(localStorage.getItem("Highscore")) || 0

    if (score > highscore) {
        localStorage.setItem("Highscore", score)
        highscore = score
    }

    topText.innerHTML = `Score: <br> ${score} <br><br>Highscore: ${highscore}<br><br>`
    

    // button um Spiel zu wiederholen
    const retryButton = document.createElement("button")
    retryButton.innerHTML = "NOCHMAL"
    retryButton.addEventListener("click", init)
    topText.appendChild(retryButton)

    let clickPrecisions = [];
    for(let click of tempPrecision) { clickPrecisions.push(click.off_diagonal) }
    sendData('', time, clickPrecisions);
}

/**
 * Gehe alle Marker nacheinander durch und beende das Spiel wenn alle Marker durch sind
 * @param {Integer} i - Welcher Marker soll nun geklickt werden?
 */
function step(i = 0) {

    // alle Marker wurden behandelt
    if (i >= marker.length) return end()

    const mark = marker[i]

    mark.classList.add("show")

    function handleMouseDown() {
        mark.classList.add("green")
    }

    function handleMouseUp(e) {
        mark.classList.remove("green")
        mark.classList.remove("show")

        playSound("./assets/pling.mp3")

        tempPrecision.push(calculateClickPrecision(e))

        mark.removeEventListener("mousedown", handleMouseDown)
        mark.removeEventListener("mouseup", handleMouseUp)

        // weiter zum nächsten Marker
        step(i + 1)
    }
    
    mark.addEventListener("mousedown", handleMouseDown)
    mark.addEventListener("mouseup", handleMouseUp)
}


/**
 * Starte das Spiel
 */
function start() {
    
    topText.innerHTML = "Drücken Sie auf den Mittelpunkt des Ziel und lassen Sie los"

    tempStartTime = Date.now()
    tempPrecision = []
    
    step()
}

/**
 * Starte Countdown und bereite Spiel vor
 */
function init() {

    gameRunning = true

    topText.innerHTML = ""
    countdown(3, start)
}

/**
 * Berechne die Prezision der Klicks
 * @param {Event} e - Das "mouseup" event
 */
function calculateClickPrecision(e) {
    let ev_x = e.pageX
    let ev_y = e.pageY

    let e_bounds = e.target.getBoundingClientRect()
    let e_x = e_bounds.left + (e_bounds.right-e_bounds.left) / 2
    let e_y = e_bounds.top + (e_bounds.bottom-e_bounds.top) / 2

    // console.log(e_x, e_y, ev_x, ev_y)
    let off_x = Math.abs(e_x - ev_x)
    let off_y = Math.abs(e_y - ev_y)
    let off_diagonal = Math.sqrt(off_x**2 + off_y**2)

    return {off_x: off_x, off_y: off_y, off_diagonal: off_diagonal}
}

/**
 * Berechne den Score aus Zeit und Prezision
 * @param {Integer} time - Die Zeit die gebraucht wurde um das Spiel zu beenden
 */
function calculateScore(time) {
    
    let precisionAverage = 0
    let precisionScore = 0
    let timeScore = 0

    tempPrecision.forEach(precision => {
        precisionAverage += precision.off_diagonal
    })

    precisionAverage = precisionAverage / tempPrecision.length

    if (precisionAverage < 22) {
        precisionScore = 50 / precisionAverage
    }
    
    // Time score
    if (time/1000 < 60 ) timeScore = 550 / (time / 1000)

    // Score
    return Math.round(precisionScore * timeScore)
    
}

/**
 * Sendet die Spieldaten an das PHP-Backend
 * @param {String} username Der Nutzername
 * @param {Number} time Zeit, die der Spieler gebraucht hat
 * @param {Number[]} click_precisions Präzisionswerte aller Klicks
 */
function sendData(username, time, clickPrecisions) {
    const Http = new XMLHttpRequest();
    const url='submitGame.php';
    Http.open("POST", url);

    var formData = new FormData();
    clickPrecisions.forEach((click, i) => {
        formData.append('click_'+(i+1), click);
    })

    formData.append('user', username);
    formData.append('time', time);
    Http.send(formData);

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
}

// starte Game wenn geklickt wird
document.onclick = () => gameRunning || init()