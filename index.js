var headY = 2;
var headX = 2;
var height = 30;
var width = 40;
var length = 0;
var interval = 100;
var increment = 2;

var tailY = [headY];
var tailX = [headX];
var foodY;
var foodX;
var moving = false;
var gameOver = false;
var dir = 0 // down = 0, up = 1, left = 2, right = 3
var int;
var score = 0;

const move = () => {
  init();
  int = setInterval(loop, interval);


}

const init = () => {
  map();
  snake();
  food();
}

const map = () => {
  document.write('<table>');
  for(var y = 0; y < height; y++){
    document.write('<tr>');
    for( var x = 0; x < width; x++){
      if( x === 0 || x === width - 1 || y === 0 || y === height - 1){
        document.write("<td class='borders' id= '"+ x + "-" + y + "'></td>");
      }else{
        document.write("<td class='arena' id= '"+ x + "-" + y + "'></td>");
      }
    }
    document.write('</tr>');

  }
  document.write('</table>');
}

const snake = () => {
  set(headX, headY, "snake");
}

const get = (x,y) => {
  return document.getElementById(x+"-"+y);
}

const set = (x,y,value) => {
  if(x!= null && y != null);
  get(x,y).setAttribute("class", value);

}

const makeType = (x,y) => {
  return get(x,y).getAttribute("class");
}

const food = () => {
  var found = false;
  while(!found && (length < (width -2)* (height-2)+1)){
    var foodX = rand(1, width-1);
    var foodY = rand(1, height-1);
    if(makeType(foodY,foodX) === "arena")
    found = true;
  }
  set(foodX,foodY, "food");
  fX= foodX;
  fY= foodY;
}

const rand = (min,max) => {
    return Math.floor(Math.random()*(max-min)+min);
}

window.addEventListener("keydown", function key(){
  var key = event.keyCode;
  if(key === 38)
    dir = 1;
  else if(key === 40)
    dir = 0;
  else if(key === 37)
    dir = 2;
  else if(key === 39)
    dir = 3;

  if(!moving)
    moving = true;
  else if(key === 32)
    moving = false;
})

const update = () => {
  set( fX, fY, "food");
  updTail();
  set(tailX[length], tailY[length], "arena");
  if (dir === 1)
    headY--;
  else if(dir === 0)
    headY++;
  else if(dir === 2)
    headX--;
  else if (dir === 3)
    headX++;
  set(headX, headY, "snake");
  for( var i = tailX.length-1; i >=0; i--){
    if(headX === tailX[i] && headY === tailY[i]){
      gameOver = true;
      break;
    }
  }
  if(headX === 0 || headX === width-1 || headY === 0 || headY === height-1)
    gameOver = true;
  else if (headX === fX && headY === fY){
    score+=100;
    food();
    length += increment;
  }
  document.getElementById('score').innerHTML = 'Score :' + score;
  if(gameOver){
  document.getElementById('score').innerHTML = 'GAME OVER';
  document.getElementById('playAgain').style.visibility = 'visible';
  }
}

const updTail = () => {
  for(var i = length; i > 0; i--){
    tailX[i] = tailX[i-1];
    tailY[i] = tailY[i-1];
  }
    tailX[0] = headX;
    tailY[0] = headY;

}

const loop = () => {
  if (moving && !gameOver){
    update();
  }else if(gameOver){
    clearInterval(int);
  }

}

move();
