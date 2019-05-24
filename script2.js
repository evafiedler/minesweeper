var cells = [];
var rows = [];

$(document).ready(function () {
    makeBoard();
    display();

    //var both = "";

});

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

    var mines = random(10);
    for(var a = 0; a < mines.length; a++){
        i = mines[a][0];
        j = mines[a][1];
        cells[i][j].mine = true;
    }

    console.log(mines);
}

function random(num){
    var places = [];
    var eachPlace = [];
    var placeOne = "";
    var placeTwo = "";
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
            $("#x" + i).append("<td id='" + i + j + "'><button>0</button></td>");

            $("#" + i + j).click(function(){
                showNumber(this.id);
            })
        }
    }
}

function showNumber(id){
    var i = parseInt(id.substring(0,1));
    var j = parseInt(id.substring(1));
    //fix border
    var left = j - 1;
    var right = j + 1;
    var up = i - 1;
    var down = i + 1;
    var count = 0;

    if(!cells[i][j].mine){
        if(cells[up][left].mine){
            count++;
        }
        if(cells[up][j].mine){
            count++;
        }
        if(cells[up][right].mine){
            count++;
        }
        if(cells[i][left].mine){
            count++;
        }
        if(cells[i][right].mine){
            count++;
        }
        if(cells[down][left].mine){
            count++;
        }
        if(cells[down][j].mine){
            count++;
        }
        if(cells[down][right].mine){
            count++;
        }
        $("#" + id).html(count);
    }else{
        endGame();
    }
}

//write endGame
function endGame(){

}

class Cell{
    constructor(x, y){
        this.xlocation = x;
        this.ylocation = y;
        this.mine = false;
        this.click = false;
    }
}