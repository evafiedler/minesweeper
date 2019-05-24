// var cells = [];
// var rows = [];

$(document).ready(function () {
    var place1 = 0;
    var place2 = 0;
    //var both = "";
    var cell;

    for(var i = 0; i < 10; i++){
        $("#table").append("<tr id='x" + i + "'></tr>");
        for(var j = 0; j < 10; j++){
            cell = new Cell (j, i);
            // rows.push(cell);
            //
            //
            $("#" + i + j).click(function(){
                var iString = this.id.substring(0, 1);
                var jString = this.id.substring(1);
                var iInt = parseInt(iString);
                var jInt = parseInt(jString);

                //numbers on sides are wrong
                var left = findLeft(jInt);

                var right = findRight(jInt);

                var up = findUp(iInt);

                var down = findDown(iInt);

                console.log(this.id);
                $("#" + this.id).empty();
                var nearNum = 0;
                if($("#" + this.id).attr("class").includes("mine")){
                    $("#results").html("you dead");
                }else{
                    // if(left)
                    if($("#" + up + jInt.toString()).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + down + jInt.toString()).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + up + left).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + down + left).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + up + right).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + down + right).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + iInt.toString() + left).attr("class").includes("mine")){
                        nearNum++;
                    }
                    if($("#" + iInt.toString() + right).attr("class").includes("mine")){
                        nearNum++;
                    }
                    $("#" + this.id).html(nearNum);
                }

            });
        }
        // cells.push(rows);
        // rows = [];
    }
    var array;
    array = random(10);
    for(var a = 0; a < array.length; a++){
        string1 = array[a][0].toString();
        string2 = array[a][1].toString();
        both = string1 + string2;
        $("#" + both).addClass("mine");
        // place1 = array[a][0];
        // place2 = array[a][1];
        // cells[place1][place2].mine = true;
    }

    console.log(array);
});




//figure out how to deal with edges. when on the edges, there
//are two of the same if statements so counter is too high
function findLeft(jInt){
    if(jInt === 0){
        var left = (jInt).toString();
    }else{
        left = (jInt - 1).toString();
    }
    return left;
}

function findRight(jInt){
    if(jInt === 9){
        var right = jInt.toString();
    }else{
        right = (jInt + 1).toString();
    }
    return right;
}

function findUp(iInt){
    if(iInt === 0){
        var up = iInt.toString();
    }else{
        up = (iInt - 1).toString();
    }
    return up;
}

function findDown(iInt){
    if(iInt === 9){
        var down = iInt.toString();
    }else{
        down = (iInt + 1).toString();
    }
    return down;
}

// class Cell{
//     constructor(x, y){
//         this.xlocation = x;
//         this.ylocation = y;
//         this.mine = false;
//     }
// }
// if(places[a][0] === placeOne){
//     if(places[a][1] === placeTwo){
//         same = true;
//     }else{
//         same = false;
//         eachPlace.push(placeOne, placeTwo);
//         places.push(eachPlace);
//         eachPlace = [];
//     }
// }else{
//     same = false;
//     eachPlace.push(placeOne, placeTwo);
//     places.push(eachPlace);
//     eachPlace = [];
// }