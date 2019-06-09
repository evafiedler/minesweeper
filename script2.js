var cells = [];
var rows = [];
var click = 0;

$(document).ready(function () {
    makeBoard();
    display();
});

function newGame(){
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

    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            cell = new Cell (i, j);
            rows.push(cell);
        }
        cells.push(rows);
        rows = [];
    }
    console.log(cells);

    var mines = random(10);
    for(var a = 0; a < mines.length; a++){
        i = mines[a][0];
        j = mines[a][1];
        cells[i][j].mine = true;
        if(i > 0){
            cells[i-1][j].count++;
            if(j > 0){
                cells[i-1][j-1].count++;
            }
            if(j < 9){
                cells[i-1][j+1].count++;
            }
        }
        if(i < 9){
            cells[i+1][j].count++;
            if(j > 0){
                cells[i+1][j-1].count++;
            }
            if(j < 9){
                cells[i+1][j+1].count++;
            }
        }
        if(j > 0){
            cells[i][j-1].count++;
        }
        if(j < 9){
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
            placeOne = Math.floor(Math.random() * 10);
            placeTwo = Math.floor(Math.random() * 10);
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
    for(var i = 0; i < 10; i++){
        $("#table").append("<tr id='x" + i + "'></tr>");
        for(var j = 0; j < 10; j++){
            $("#x" + i).append("<td id='" + i + j + "'><button id='button" + i + j + "' onmousedown='whenClicked(event, " + i
                + ", " + j + ")'></button></td>");
        }
    }
}

function whenClicked(event, i, j){
    if(event.button === 2){
        $("#button" + i + j).css("background-color", "yellow");
        if(cells[i][j].mine){
            click++;
        }
        if(click === 10){
            endGame("green", "You Win!");
        }
    }else{
        showNumber(i, j);
    }
}

function showNumber(i, j){
    if(!cells[i][j].mine){
        $("#" + i + j).html(cells[i][j].count);
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
        if(i < 9){
            $("#" + (i+1) + j).html(cells[i+1][j].count);
            clearCells( i+1, j );
        }
        if(i > 0){
            $("#" + (i-1) + j).html(cells[i-1][j].count);
            clearCells( i-1, j );
        }
        if(j > 0){
            $("#" + i + (j-1)).html(cells[i][j-1].count);
            clearCells( i, j-1 );
        }
        if(j < 9){
            $("#" + i + (j+1)).html(cells[i][j+1].count);
            clearCells( i, j+1 );
        }
        if(i < 9 && j < 9){
            $("#" + (i+1) + (j+1)).html(cells[i+1][j+1].count);
            clearCells( i+1, j+1 );
        }
        if(i > 0 && j < 9){
            $("#" + (i-1) + (j+1)).html(cells[i-1][j+1].count);
            clearCells( i-1, j+1 );
        }
        if(i < 9 && j > 0){
            $("#" + (i+1) + (j-1)).html(cells[i+1][j-1].count);
            clearCells( i+1, j-1 );
        }
        if(i > 0 && j > 0){
            $("#" + (i-1) + (j-1)).html(cells[i-1][j-1].count);
            clearCells( i-1, j-1 );
        }
    } else {
        return;
    }
}

function endGame(color, message){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if(cells[i][j].mine){
                $("#button" + i + j).css("background-color", color);
            }
            $("#button" + i + j).prop("disabled", true);
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
    }
}