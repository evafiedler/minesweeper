var cells = [];
var rows = [];

$(document).ready(function () {
    makeBoard();
    display();
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
    console.log(cells);
    var mines = random(10);
    for(var a = 0; a < mines.length; a++){
        i = mines[a][0];
        j = mines[a][1];
        cells[i][j].mine = true;
        //adds to count variable of cells surrounding the mine
        //if statements allow the borders to work
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
            $("#x" + i).append("<td id='" + i + j + "'><button></button></td>");

            $("#" + i + j).click(function(){
                showNumber(this.id);
            })
        }
    }
}

function showNumber(id){
    var i = parseInt(id.substring(0,1));
    var j = parseInt(id.substring(1));

    // var left = j - 1;
    // var right = j + 1;
    // var up = i - 1;
    // var down = i + 1;
    // var count = 0;

    if(!cells[i][j].mine){
        $("#" + id).html(cells[i][j].count);
    }else{
        endGame();
    }
}

//write endGame
function endGame(){

}


//count variable in each cell that tracks how many adjacent cells are mines
class Cell{
    constructor(x, y){
        this.xlocation = x;
        this.ylocation = y;
        this.mine = false;
        this.count = 0;
    }
}

// if(j > 0){
//     if(cells[i][left].mine){
//         count++;
//     }
// }
// if(j > 0 && i > 0){
//     if(cells[up][left].mine){
//         count++;
//     }
// }
// if(i > 0){
//     if(cells[up][j].mine){
//         count++;
//     }
// }
// if(i > 0 && j < 9){
//     if(cells[up][right].mine){
//         count++;
//     }
// }
// if(j < 9){
//     if(cells[i][right].mine){
//         count++;
//     }
// }
// if(i < 9 && j > 0){
//     if(cells[down][left].mine){
//         count++;
//     }
// }
// if(i < 9){
//     if(cells[down][j].mine){
//         count++;
//     }
// }
// if(i < 9 && j < 9){
//     if(cells[down][right].mine){
//         count++;
//     }
// }