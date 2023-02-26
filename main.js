var screen = new Scene(innerWidth,innerHeight);
screen.solidShader('#996600');
screen.Scrolloff()
screen.MKflex()
var scrWin = document.createElement('h1');
scrWin.innerHTML ='hello';
scrWin.style.position = 'absolute';
scrWin.style.zIndex = '500';
scrWin.style.color = 'wheat';
document.body.appendChild(scrWin);

var borco = new Gradient(0,0,0,innerHeight,'lightgray','steelblue');

var road = new Cube(centerX-(innerWidth/1.3/2),0,innerWidth/1.3,innerHeight,0,'black')
var root = [];
var enemy = [];
var player = new ImageSrc('/bus.png',centerX-17.5,innerHeight-100,70,100);
setInterval(()=>{
  root.push(new Cube(centerX,-36,5,35,0,"white"));
},500)
setInterval(()=>{
  enemy.push(new ImageSrc('/truck.png',Math.random()*(road.x,road.width-60+1)+road.x,-100,60,90))
},1000)
var roadBorderL = new Cube(road.x - 10,0,10,innerHeight,0,borco.color)
var roadBorderR = new Cube(road.x + road.width,0,10,innerHeight,0,borco.color)
var l = true;
var r = true;
var score = 0;
var gameplay = true;
function update(){
  if (gameplay == true) {
  score += 1;
  }
  scrWin.innerText = 'score : '+score;
  frame(update)
  clear(0,0,innerWidth,innerHeight)
  road.load()
  for(var i=0;i<root.length;i++){
    root[i].load()
    root[i].moveY(3);
    
  }
  for (var i = 0; i < enemy.length; i++) {
    enemy[i].load()
    enemy[i].Rigidbody = true;
    Kinametic(enemy[i],5)
    if (onCollisionEnter(enemy[i],player)) {
      Destroy(player,0);
      gameplay = false;
    }
  }
  player.load()
  player.Static = true;
  roadBorderL.load()
  roadBorderR.load()
}
update()
var n = new Audio('game.mp3');
addEventListener('mousemove',(e)=>{
  if (e.x >= innerWidth/2 && r == true) {
    player.x += 40;
  }else if(e.x <= innerWidth/2 && l == true){
    player.x -= 40;
  }
  if(player.x - player.width/2 <= road.x){
    l = false;
    r = true;
  } else if (player.x + player.width+player.width/2 >= road.x + road.width) {
    r = false;
    l = true;
  }
})
//math.random()*(max-min+1)+min
addEventListener('click', ()=>{
  n.play()
})