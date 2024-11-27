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
    return text;
    
}

function partOne(){
    let fileData = readTextFile("../2023_inputFiles/daytwoinput.txt");
    newArray = fileData.split("\n");
    var maxCubes = {
        'red': 12,
        'green': 13,
        'blue': 14 
    };
    var runningTotal = 0;
    for(var i = 0; i < newArray.length; i++){
        var currentValid = true;
        var currentLine = newArray[i].trim().split(':');
        var currentLine = currentLine[1].split(';');
        for(var z = 0; z < currentLine.length; z++){
            var currentGame = currentLine[z];
            currentGame = currentGame.split(',');
            for(var y = 0; y < currentGame.length; y++){
                var currentCube = currentGame[y].trim().split(' ');
                if(maxCubes[currentCube[1]] < currentCube[0]){
                    currentValid = false;
                    break;
                }
            }
            if(!currentValid){
                break;
            }
        }
        if(currentValid){
            runningTotal += parseInt(i+1);
        }
    }
        
    console.log(runningTotal);
}









function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/daytwoinput.txt");
    newArray = fileData.split("\n");
    var runningTotal = 0;
    for(var i = 0; i < newArray.length; i++){
        var minRequired = {
            'red': 0,
            'green': 0,
            'blue': 0 
        }
        var powerSet = 0;
        var currentLine = newArray[i].trim().split(':');  
        var currentLine = currentLine[1].split(';');
        for(var z = 0; z < currentLine.length; z++){
            var currentGame = currentLine[z];
            currentGame = currentGame.split(',');
            for(var y = 0; y < currentGame.length; y++){
                var currentCube = currentGame[y].trim().split(' ');
                if(parseInt(minRequired[currentCube[1]]) < parseInt(currentCube[0])){
                    minRequired[currentCube[1]] = currentCube[0];
                }
            }
        }
        powerSet = parseInt(minRequired['red']*minRequired['green']*minRequired['blue']);
        runningTotal += powerSet;
    }
    console.log(runningTotal); 
}


window.onload = function(){
partOne();
partTwo();
}
