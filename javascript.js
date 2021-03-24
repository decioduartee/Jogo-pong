var vbtnIniciar;
var vbola;
var vcpu;
var vjogador;
var vPaineltxtPontos;

//Controle e animação
var game, frames;

//Posiçães
var posBolaX, posBolaY;
var posJogadorX, posJogadorY, posCpuX, posCpuY;

//Direção de acordo com o teclado
var dirJy;

//Posições iniciais
var posJogIniY = 200, posCpuInitY = 200, posBolaInitX = 480, posBolaInitY = 250, posJogIniX= 0, posCpuIniX= 930;

//Tamanhos
var campoX = 0, campoY = 0, campoW = 960, campoH = 520;
var barraW = 25, barraH = 120, bolaW = 20, bolaH = 20;

//Direção
var bolaX, bolaY;
var cpuY = 0;

//Velocidade
var velBola, velCpu, velJogador;

//Controle
var pontos = 0;
var tecla;

var jogo = false;

async function controlajog() {
    if(jogo) {
        posJogadorY += velJogador * dirJy
        if(((posJogadorY+barraH) >= campoH) || ((posJogadorY) <= -2)) {
            posJogadorY += (velJogador * dirJy) * (-1);
        }
        vjogador.style.top = posJogadorY + "px";
    }
}

async function controlacpu() {
    if(jogo) {
        if((posBolaX > (campoW / 2)) && (bolaX > 0)) {
            //Movimentar CPU
            if (((posBolaY + (bolaH / 2)) > ((posCpuY + (barraH / 2))) + velCpu)) {
                //Mover para baixo
                if((posCpuY + barraH) <= campoH) {
                    posCpuY += velCpu;
                }
            } else if ((posBolaY + (bolaH / 2)) < (posCpuY + (barraH / 2)) - velCpu) {
                //Mover para cima
                if(posCpuY >= 0) {
                    posCpuY -= velCpu;
                }
            }
        } else {
            //Posicionar CPU no centro
            if((posCpuY + (bolaH / 2)) < 200) {
                posCpuY += velCpu;
            } else if((posCpuY + (barraH / 2)) > (campoH / 2)) {
                posCpuY -= velCpu;
            }
        }

        vcpu.style.top = posCpuY + "px";
    }
}

async function controlaBola() {
    //Movimentação bola
    posBolaX += velBola * bolaX;
    posBolaY += velBola * bolaY;

    //Colisão com jogador
    if((posBolaX <= posJogadorX + barraW) && ((posBolaY + bolaH >= posJogadorY) && (posBolaY <= posJogadorY + barraH))){
        bolaY = (((posBolaY + (bolaH / 2)) - (posJogadorY + (barraH / 2))) / 16);
        bolaX *=- 1;
    }

    //Colisão com cpu
    if(((posBolaX >= posCpuX - barraW) && (posBolaY + bolaH >= posCpuY) && (posBolaY <= posCpuY + barraH))){
        bolaY = (((posBolaY + (bolaH / 2)) - (posCpuY + (barraH / 2))) / 16);
        bolaX *=- 1;
    }

    //Limites ferior e inferior
    if((posBolaY >= 460) || (posBolaY <= 0)){
        bolaY*= -1;
    }

    //Saiu da tela pela direita e pela esquerda
    if(posBolaX >= (campoW-20)){
        velBola = 0;
        posBolaX = posBolaInitX;
        posBolaY = posBolaInitY;
        posJogadorY = posJogIniY;
        posCpuY = posCpuInitY;
        pontos++;
        vPaineltxtPontos.value = pontos;
        jogo = false;
        vjogador.style.top = posJogadorY + "px";
        vcpu.style.top = posCpuY + "px";
    } else if(posBolaX <= 0){
        velBola = 0;
        posBolaX = posBolaInitX;
        posBolaY = posBolaInitY;
        posJogadorY = posJogIniY;
        posCpuY = posCpuInitY;
        pontos--;
        vPaineltxtPontos.value = pontos;
        jogo = false;
        vjogador.style.top = posJogadorY + "px";
        vcpu.style.top = posCpuY + "px";
    }

    vbola.style.top = posBolaY + "px";
    vbola.style.left = posBolaX + "px";
}

async function teclaDw() {
    tecla = event.keyCode;
    if(tecla == 38) { //CIMA
        dirJy = -1;
    } else if(tecla == 40) { //BAIXO    
        dirJy = +1;
    }
}

async function teclaUp() {
    tecla = event.keyCode;
    if(tecla == 38) { //CIMA
        dirJy = 0;
    } else if(tecla == 40) { //BAIXO    
        dirJy = 0;
    }
}

async function game() {
    if(jogo) {
        controlajog();
        controlaBola();
        controlacpu();
    }

    frames = requestAnimationFrame(game);
}

async function iniciaJogo() {
    if(!jogo) {
        cancelAnimationFrame(frames);
        velBola = velCpu = velJogador = 8;
        jogo = true;
        dirJy = 0;
        bolaY = 0;
        if((Math.random() * 10) < 5) {
            bolaX =- 1;
        } else {
            bolaX = 1;
        }
        posBolaX = posBolaInitX;
        posBolaY = posBolaInitY;
        posJogadorY = posJogIniY;
        posCpuY = posCpuInitY;

        posJogadorX = posJogIniX;
        posCpuX = posCpuIniX;

        game();
    }
};

async function inicializa() {
    velBola = velCpu = velJogador = 8;
    vbtnIniciar = document.getElementById('btnIniciar');
    vjogador = document.getElementById('dvJogador');
    vbola = document.getElementById('dvBola');
    vcpu = document.getElementById('dvCpu');
    vPaineltxtPontos =  document.getElementById('txtPontos');
    vbtnIniciar.addEventListener('click', iniciaJogo);
    
    document.addEventListener('keydown', teclaDw);
    document.addEventListener('keyup', teclaUp);
};

window.addEventListener('load', inicializa);