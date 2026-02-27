let button, quebraLinha, jogada = 1, vencedor = 0, cont = 0, contAcertos = 0, marcacao, contLine = 1
let tabuleiro = new Array(5)
for(let i = 0; i < tabuleiro.length;i++){
    tabuleiro[i] = new Array(11)
}
for(let i = 0; i < tabuleiro.length;i++){
    quebraLinha = document.createElement('br');
    document.body.append(quebraLinha);
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
        document.body.append(button);
    }
}
let h1 = document.createElement('h1')
h1.setAttribute('id', 'resultado')
document.body.append(h1);

function marca(linha, coluna){
    if(coluna < 5)
    marcarCasa("bt" + linha + '' + coluna)
}
function verificaSequencia(linha){
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
    for(let x = 0; x < 5; x++){
        document.getElementById("bt" + contLine + "" + x).disabled = false
        document.getElementById("btVerifica" + contLine).disabled = false
    }
    contLine++
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

