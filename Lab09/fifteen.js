/*
    Author: Drew Walizer
    Date: 5/7/20
    Course: 366
*/
"use strict";

//blank tile x and y
var blank_x = 300;
var blank_y = 300;

// Sets up starting positions and backgrounds of the tiles.
$(function(){ 
    var tile = $("#puzzlearea div");
    for(var i = 0; i < tile.length; i++){
      var row = i % 4;
      var col = Math.floor(i / 4);
      var x = 100 * row; 
      var y = 100 * col; 
      tile[i].style.left = x + "px";
      tile[i].style.top = y + "px";
      tile.eq(i).css('background-image', 'url("background.jpg"');
      tile.eq(i).css('background-position', '-'+ x + 'px -' + y + 'px');
      tile.eq(i).css('background-repeat', 'no-repeat');

    }  
});

// Swap tile on click.
$(function(){
  $("#puzzlearea div").click(function(){
    swap(this);
    if(isFinished()){
      alert("Congratulations! You solved the puzzle!");
    }
  });
});

// highlights tile red when hovered over.
$(function(){
  $("#puzzlearea div").hover(function(){
      var tile = $(this);  
      var x = parseInt(this.style.left);
      var y = parseInt(this.style.top);
      
      if( (x == blank_x && Math.abs(blank_y - y) == 100) || (y == blank_y && Math.abs(blank_x - x) == 100)){
        tile.css('border-color', 'red');
        tile.css('color', 'red');
      }
    },  
    function(){
      $(this).css('border-color', 'black');
      $(this).css('color', 'black');
    });   
});

// Shuffles the game 
$(function(){
  $("#shufflebutton").click(function(){
    for(var i = 0; i < 300; i++){ 
      // checks if tile was swapped. 
      var check = false;
      while(!check){
          var rand = Math.floor(Math.random() * 15);
          var tile = $("#puzzlearea div")[rand];
          check = swap(tile);
       }  
    }
  });
});

// swaps tile and blank spot.
function swap(tile){
    var x = parseInt(tile.style.left);
    var y = parseInt(tile.style.top);
    if( (x == blank_x && Math.abs(blank_y - y) == 100) || (y == blank_y && Math.abs(blank_x - x) == 100)){
      tile.style.left = blank_x + "px";
      tile.style.top = blank_y + "px";
      blank_x = x;
      blank_y = y;
      // for shuffle return true if tile was moved. 
      return true;
    }
    // for shuffle return false if tile not moved.
    return false;
}

// checks if finished. 
function isFinished(){
  for(var i = 0; i < 15; i++){ 
    var tile = $("#puzzlearea div")[i];
    var row = i % 4;
    var col = Math.floor(i / 4);
    var x = 100 * row; 
    var y = 100 * col;
    if(parseInt(tile.style.left) == x && parseInt(tile.style.top) == y){
      if(i == 14){
        // if game is complete return true.
        return true;
      }
    }
    else{
      break;
    }
  }
  // if game is not complete return flase.
  return false;
}