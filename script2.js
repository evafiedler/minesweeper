var cells = [];
var rows = [];
var click = 0;
var marked = 50;


//change number of mines remaining after new game
$(document).ready(function () {
    makeBoard();
    display();
});

function newGame(){
    marked = 50;
    $("#score").html(marked + " mines remaining");
    $("#results").empty();
    $("#table").empty();
    click = 0;
    cells = [];
    rows = [];
    makeBoard();
    display();
}

function makeBoard(){
    var i = 0;
    var j = 0;
    var cell;

    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            cell = new Cell (i, j);
            rows.push(cell);
        }
        cells.push(rows);
        rows = [];
    }
    console.log(cells);

    var mines = random(50);
    for(var a = 0; a < mines.length; a++){
        i = mines[a][0];
        j = mines[a][1];
        cells[i][j].mine = true;
        if(i > 0){
            cells[i-1][j].count++;
            if(j > 0){
                cells[i-1][j-1].count++;
            }
            if(j < 19){
                cells[i-1][j+1].count++;
            }
        }
        if(i < 19){
            cells[i+1][j].count++;
            if(j > 0){
                cells[i+1][j-1].count++;
            }
            if(j < 19){
                cells[i+1][j+1].count++;
            }
        }
        if(j > 0){
            cells[i][j-1].count++;
        }
        if(j < 19){
            cells[i][j+1].count++;
        }
    }
    console.log(mines);
}

function random(num){
    var places = [];
    var eachPlace = [];
    var placeOne = 0;
    var placeTwo = 0;
    var same = true;
    for(var i = 0; i < num; i++){
        while(same === true){
            placeOne = Math.floor(Math.random() * 20);
            placeTwo = Math.floor(Math.random() * 20);
            same = false;
            for(var a = 0; a < places.length; a++){
                if(places[a][0] === placeOne) {
                    if (places[a][1] === placeTwo) {
                        same = true;
                    }
                }
            }
        }
        eachPlace.push(placeOne, placeTwo);
        places.push(eachPlace);
        eachPlace = [];
        same = true;
    }
    return places;
}

function display(){
    for(var i = 0; i < 20; i++){
        $("#table").append("<tr id='x" + i + "'></tr>");
        for(var j = 0; j < 20; j++){
            $("#x" + i).append("<td id='" + i + "_" + j + "'><button id='button" + i + "_" + j + "' onmousedown='whenClicked(event, " + i
                + ", " + j + ")'></button></td>");
        }
    }
}

function whenClicked(event, i, j){
    if(event.button === 2){
        //$("#" + i + "_" + j).empty();
        $("#" + i + "_" + j).css("background-color", "yellow");
        if(!cells[i][j].yellow){
            marked--;
        }
        cells[i][j].yellow = true;
        if(cells[i][j].mine){
            click++;
        }
        if(click === 50){
            endGame("green", "You Win!");
        }
    }else{
        if(cells[i][j].yellow){
            $("#" + i + "_" + j).css("background-color", "lightgray");
            marked++;
        }
        showNumber(i, j);
    }
    $("#score").html(marked + " mines remaining");
}

function showNumber(i, j){
    if(!cells[i][j].mine){
        $("#" + i + "_" + j).html(cells[i][j].count);
        if(cells[i][j].count === 0){
            clearCells(i, j);
        }else{
            cells[i][j].click = true;
        }
    }else{
        endGame("red", "You hit a mine! Game over");
    }
}


function clearCells(i ,j){
    if ( cells[i][j].count === 0 && !cells[i][j].click) {
        cells[i][j].click = true;
        if(i < 19){
            $("#" + (i+1) + "_" + j).html(cells[i+1][j].count);
            clearCells( i+1, j );
        }
        if(i > 0){
            $("#" + (i-1) + "_" + j).html(cells[i-1][j].count);
            clearCells( i-1, j );
        }
        if(j > 0){
            $("#" + i + "_" + (j-1)).html(cells[i][j-1].count);
            clearCells( i, j-1 );
        }
        if(j < 19){
            $("#" + i + "_" + (j+1)).html(cells[i][j+1].count);
            clearCells( i, j+1 );
        }
        if(i < 19 && j < 19){
            $("#" + (i+1) + "_" + (j+1)).html(cells[i+1][j+1].count);
            clearCells( i+1, j+1 );
        }
        if(i > 0 && j < 19){
            $("#" + (i-1) + "_" + (j+1)).html(cells[i-1][j+1].count);
            clearCells( i-1, j+1 );
        }
        if(i < 19 && j > 0){
            $("#" + (i+1) + "_" + (j-1)).html(cells[i+1][j-1].count);
            clearCells( i+1, j-1 );
        }
        if(i > 0 && j > 0){
            $("#" + (i-1) + "_" + (j-1)).html(cells[i-1][j-1].count);
            clearCells( i-1, j-1 );
        }
    } else {
        return;
    }
}

function endGame(color, message){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            if(cells[i][j].mine){
                $("#" + i + "_" + j).empty();
                $("#" + i + "_" + j).css("background-color", color);
            }
            $("#button" + i + "_" + j).prop("disabled", true);
        }
    }
    alert(message);
    $("#results").append("<button onclick='newGame()'>New Game</button>");
}

class Cell{
    constructor(x, y){
        //this.xlocation = x;
        //this.ylocation = y;
        this.mine = false;
        this.count = 0;
        this.click = false;
        this.yellow = false;
    }
}