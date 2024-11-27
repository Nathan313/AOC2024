function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                text = allText;
            }
        }
    }
    rawFile.send(null);
    return text.trim();
    
}

function partOne(){
    let fileData = readTextFile("../2023_inputFiles/daythreeinput.txt");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var runningTotal = 0;
    for(var y = 0; y < currentLine.length; y++){
        var partNumber = "";
        var isAPartNumber = false;
        for(var x = 0; x < currentLine[y].length; x++){
            if(!isNaN(currentLine[y][x])){
                if(checkIfAdjacentToSymbol(y,x,currentLine)){
                    isAPartNumber = true;
                }
                partNumber += currentLine[y][x]
            }
            if((isNaN(currentLine[y][x]) || x == (currentLine[y].length-1)) && isAPartNumber){
                runningTotal += parseInt(partNumber);
                currentLine = removeNumber(y,x,currentLine,partNumber);
                isAPartNumber = false;
                partNumber = "";
            }
            if(isNaN(currentLine[y][x]) && !isAPartNumber){
                partNumber = "";
                isAPartNumber = false;
            }
        }
    }
    console.log(runningTotal);
}

function checkIfAdjacentToSymbol(y,x,currentLine){
    for(var y2 = y-1; y2 <= y+1; y2++){
        for(var x2 = x-1; x2 <= x+1; x2++){
            if(currentLine[y2] !== undefined && currentLine[y2][x2] !== undefined){
                if(isNaN(currentLine[y2][x2]) && currentLine[y2][x2] != "."){
                    return true;
                }
            }
        }
    }
    return false;
}
function removeNumber(y,x,currentLine,partNumber){
    var lineArray = currentLine[y].split('');
    for(var x2 = 1; x2 <= partNumber.length; x2++){
        lineArray[x-x2] = ".";
    }
    currentLine[y] = lineArray.join('');
    return currentLine;
}




function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/daythreeinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var runningTotal = 0;
    var gearsLocation = [];
    
    for (var y = 0; y < currentLine.length; y++){
        gearsLocation[y] = [];
    
        for (var x = 0; x < currentLine[y].length; x++) {
            gearsLocation[y][x] = [];
        }
    }

    for(var y = 0; y < currentLine.length; y++){
        var currentGearCoords;
        var partNumber = "";
        var isAPartNumber = false;
        for(var x = 0; x < currentLine[y].length; x++){
            
            if(!isNaN(currentLine[y][x])){
                if(checkIfAdjacentToGear(y,x,currentLine) != false){
                    currentGearCoords = checkIfAdjacentToGear(y,x,currentLine);
                    isAPartNumber = true;
                }
                partNumber += currentLine[y][x]
            }
            if((isNaN(currentLine[y][x]) || x == (currentLine[y].length-1)) && isAPartNumber){
                currentLine = removeNumber(y,x,currentLine,partNumber);
                
                gearsLocation[currentGearCoords[0]][currentGearCoords[1]].push(parseInt(partNumber));
                isAPartNumber = false;
                partNumber = "";
            }
            if(isNaN(currentLine[y][x]) && !isAPartNumber){
                partNumber = "";
                isAPartNumber = false;
            }
        }
    }

    var total = 0;
    for (var y = 0; y < gearsLocation.length; y++){
        for (var x = 0; x < gearsLocation[y].length; x++){
            if (gearsLocation[y][x].length == 2){
                total += parseInt(gearsLocation[y][x][0])*parseInt(gearsLocation[y][x][1]);
            }
        }
    }
    console.log(total);
}


function checkIfAdjacentToGear(y,x,currentLine){
    for(var y2 = y-1; y2 <= y+1; y2++){
        for(var x2 = x-1; x2 <= x+1; x2++){
            if(currentLine[y2] !== undefined && currentLine[y2][x2] !== undefined){
                if(currentLine[y2][x2] == "*"){
                    return [y2, x2];
                }
            }
        }
    }
    return false;
}

window.onload = function(){
    partOne();
    partTwo();
}
