let button, quebraLinha, jogada = 1, vencedor = 0, cont = 0, contAcertos = 0, marcacao, contLine = 1
let tabuleiro = new Array(5)
for(let i = 0; i < tabuleiro.length;i++){
    tabuleiro[i] = new Array(11)
}

const gameRoot = document.getElementById('gameScreen') || document.body

let gameState = "idle"
let remainingSeconds = 180
let timerIntervalId = null

function enableLine(linha){
    for(let x = 0; x < 5; x++){
        const bt = document.getElementById("bt" + linha + "" + x)
        if(bt) bt.disabled = false
    }
    const v = document.getElementById("btVerifica" + linha)
    if(v) v.disabled = false
}

function initIdle(){
    remainingSeconds = 180
    setTimerText()
    setAllButtonsDisabled(true)
    const playBtn = document.getElementById('playBtn')
    if(playBtn) playBtn.disabled = false

    const startScreen = document.getElementById('startScreen')
    const gameScreen = document.getElementById('gameScreen')
    if(startScreen) startScreen.hidden = false
    if(gameScreen) gameScreen.hidden = true
}

function startGame(){
    if(gameState !== "idle") return
    gameState = "armed"
    const playBtn = document.getElementById('playBtn')
    if(playBtn) playBtn.disabled = true

    const startScreen = document.getElementById('startScreen')
    const gameScreen = document.getElementById('gameScreen')
    if(startScreen) startScreen.hidden = true
    if(gameScreen) gameScreen.hidden = false

    enableLine(0)
    startTimer()
}

function pad2(n){
    return String(n).padStart(2, '0')
}

function setTimerText(){
    const timerEl = document.getElementById('timer')
    if(!timerEl) return
    const m = Math.floor(remainingSeconds / 60)
    const s = remainingSeconds % 60
    timerEl.textContent = `${pad2(m)}:${pad2(s)}`
    if(remainingSeconds <= 30){
        timerEl.classList.add('timer--danger')
    }else{
        timerEl.classList.remove('timer--danger')
    }
}

function startTimer(){
    setTimerText()
    timerIntervalId = setInterval(() => {
        if(gameState !== "armed"){
            clearInterval(timerIntervalId)
            timerIntervalId = null
            return
        }
        remainingSeconds--
        if(remainingSeconds <= 0){
            remainingSeconds = 0
            setTimerText()
            explode()
            return
        }
        setTimerText()
    }, 1000)
}

function setAllButtonsDisabled(disabled){
    const buttons = document.querySelectorAll('button')
    for(const b of buttons){
        b.disabled = disabled
    }
}

function disarm(){
    if(gameState !== "armed") return
    gameState = "disarmed"
    const bombEl = document.getElementById('bomb')
    if(bombEl) bombEl.classList.add('bomb--disarmed')
    const boomOverlay = document.getElementById('boomOverlay')
    if(boomOverlay){
        boomOverlay.classList.remove('is-active')
        boomOverlay.setAttribute('aria-hidden', 'true')
    }
    const res = document.getElementById('resultado')
    if(res) res.textContent = 'BOMBA DESARMADA!'
    setAllButtonsDisabled(true)
}

function explode(){
    if(gameState !== "armed") return
    gameState = "exploded"
    const bombEl = document.getElementById('bomb')
    if(bombEl) bombEl.classList.add('bomb--exploded')
    const boomOverlay = document.getElementById('boomOverlay')
    if(boomOverlay){
        boomOverlay.classList.add('is-active')
        boomOverlay.setAttribute('aria-hidden', 'false')
    }
    const res = document.getElementById('resultado')
    if(res) res.textContent = 'BOOM!'
    setAllButtonsDisabled(true)
}

function isLineCorrect(linha){
    return (
        document.getElementById("bt" + linha + "0").style.backgroundColor === "blue" &&
        document.getElementById("bt" + linha + "1").style.backgroundColor === "green" &&
        document.getElementById("bt" + linha + "2").style.backgroundColor === "purple" &&
        document.getElementById("bt" + linha + "3").style.backgroundColor === "orange" &&
        document.getElementById("bt" + linha + "4").style.backgroundColor === "yellow"
    )
}
for(let i = 0; i < tabuleiro.length;i++){
    quebraLinha = document.createElement('br');
    gameRoot.append(quebraLinha);
    for(let j = 0; j < tabuleiro[i].length; j++){
        button = document.createElement('button')
        button.setAttribute('type','button')
        if(j < 5){
            button.setAttribute('id', 'bt' + i + "" + j)
            button.setAttribute('onclick', "marca(" + i + "," + j + ")")
        }else if(j == 5){
            button.setAttribute('id', 'btVerifica' + i)
            //button.setAttribute('onclick', "confere(" + i + "," + j + ")")
            button.setAttribute('onclick', "verificaSequencia(" + i + ")")
        }else{
            button.setAttribute('id', 'btResult' + i + "" + j)
        }
        if(i > 0){
            button.disabled = true
        }
        button.setAttribute('class', 'btJogo' + i )
        button.setAttribute('class', 'btJogoCol' + j )
        button.append(document.createTextNode(""));
        gameRoot.append(button);
    }
}
let h1 = document.createElement('h1')
h1.setAttribute('id', 'resultado')
gameRoot.append(h1);

const playBtn = document.getElementById('playBtn')
if(playBtn){
    playBtn.addEventListener('click', startGame)
}

initIdle()

function marca(linha, coluna){
    if(coluna < 5)
    marcarCasa("bt" + linha + '' + coluna)
}
function verificaSequencia(linha){
    if(gameState !== "armed") return
    if(document.getElementById("bt" +linha + "0").style.backgroundColor == "blue"){
        document.getElementById("btResult" + linha + "6").style.backgroundColor = "green"
    }else{
        document.getElementById("btResult" + linha + "6").style.backgroundColor = "red"
    }
    document.getElementById("bt" +linha + "0").disabled = true
    if(document.getElementById("bt" +linha + "1").style.backgroundColor == "green"){
        document.getElementById("btResult" + linha + "7").style.backgroundColor = "green"
    }else{
        document.getElementById("btResult" + linha + "7").style.backgroundColor = "red"
    }
    document.getElementById("bt" +linha + "1").disabled = true
    if(document.getElementById("bt" +linha + "2").style.backgroundColor == "purple"){
        document.getElementById("btResult" + linha + "8").style.backgroundColor = "green"
    }else{
        document.getElementById("btResult" + linha + "8").style.backgroundColor = "red"
    }
    document.getElementById("bt" +linha + "2").disabled = true
    if(document.getElementById("bt" +linha + "3").style.backgroundColor == "orange"){
        document.getElementById("btResult" + linha + "9").style.backgroundColor = "green"
    }else{
        document.getElementById("btResult" + linha + "9").style.backgroundColor = "red"
    }
    document.getElementById("bt" +linha + "3").disabled = true
    if(document.getElementById("bt" +linha + "4").style.backgroundColor == "yellow"){
        document.getElementById("btResult" + linha + "10").style.backgroundColor = "green"
    }else{
        document.getElementById("btResult" + linha + "10").style.backgroundColor = "red"
    }
    document.getElementById("bt" + linha + "4").disabled = true

    if(isLineCorrect(linha)){
        disarm()
        return
    }

    for(let x = 0; x < 5; x++){
        if(contLine < 5){
            document.getElementById("bt" + contLine + "" + x).disabled = false
            document.getElementById("btVerifica" + contLine).disabled = false
        }
    }
    contLine++

    if(contLine > 5){
        explode()
    }
}
function marcarCasa(nomeBotao){
    switch(cont){
        case 0:
        document.getElementById(nomeBotao).style.backgroundColor = "purple"
        break
        case 1:
        document.getElementById(nomeBotao).style.backgroundColor = "yellow"
        break
        case 2:
        document.getElementById(nomeBotao).style.backgroundColor = "green"
        break
        case 3:
        document.getElementById(nomeBotao).style.backgroundColor = "red"
        break
        case 4:
        document.getElementById(nomeBotao).style.backgroundColor = "blue"
        break
        case 5:
        document.getElementById(nomeBotao).style.backgroundColor = "orange"
        break
        default:
            document.getElementById(nomeBotao).style.backgroundColor = "purple"
        cont = 0
    }
    marcacao = cont
    cont++
}

