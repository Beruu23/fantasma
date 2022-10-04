var fundo;
var imgFundo;
var fantasma, imgFantasma;
var barreiraE, barreiraD;
var janela, imgJanela;
var grade, imgGrade, gradesG;
var bloco, blocosG;
var gameState = "play"
var somAssustador;

function preload(){
    imgFundo = loadImage("tower.png");
    imgFantasma = loadImage("ghost-standing.png");
    imgJanela = loadImage("door.png");
    imgGrade = loadImage("climber.png");
    somAssustador = loadSound("spooky.wav");

}

function setup(){
    createCanvas(600, 600);
    fundo = createSprite(300, 300);
    fundo.addImage(imgFundo);
    fundo.velocityY = 5;

    fantasma = createSprite(200, 200, 50, 50);
    fantasma.addImage(imgFantasma);
    fantasma.scale = 0.3;

    barreiraE = createSprite(0,0,100,1200);
    barreiraE.visible = false;
    
    barreiraD = createSprite(560,0,100,1200);
    barreiraD.visible = false;

    gradesG = new Group();
    blocosG = new Group();
}

function draw(){
   
    background("gray");
   
    if(gameState === "play"){
        
        if(keyDown(LEFT_ARROW)){
            fantasma.x -=5
        }
        if(keyDown(RIGHT_ARROW)){
            fantasma.x +=5
        }
        if(keyDown("space")){
            fantasma.velocityY =-10 
        }
    
        fantasma.velocityY +=0.8;

        if(fundo.y > 400){
            fundo.y = 300
        }

        criarJanelas();
        gradeJanela();
        blocoInvisivel();
        fantasma.collide(barreiraE);
        fantasma.collide(barreiraD);
       

        if(fantasma.isTouching(gradesG)){
            fantasma.velocityY = 0;
        }
        if(fantasma.isTouching(blocosG ) || fantasma.y > 600){
            fantasma.destroy();
            gameState = "end"
        }
  
        

        drawSprites();

    }    

    if(gameState === "end"){
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("fim de jogo", 230,250);
       }

    
   
}

function criarJanelas(){
    if(frameCount % 240 === 0){
        janela = createSprite(200, -50);
        janela.addImage(imgJanela);
        janela.velocityY = 1;

        janela.x = Math.round(random(120, 400));

        fantasma.depth = janela.depth;
        fantasma.depth +=1;

        janela.lifeTime = 800;
    }
}

function gradeJanela(){
    if(frameCount % 240 === 0){
        grade = createSprite(200, 10);
        grade.addImage(imgGrade);
        grade.velocityY = 1;

        grade.x = janela.x;

        grade.lifeTime = 800;

        gradesG.add(grade);
    }
}

function blocoInvisivel(){
    if(frameCount % 240 === 0){
        bloco = createSprite(200, 15);
        bloco.velocityY = 1;

        bloco.x = janela.x;
        bloco.width = grade.width;
        bloco.height =2;
        bloco.visible = false;

        bloco.lifeTime = 800;

        blocosG.add(bloco);
    }
}