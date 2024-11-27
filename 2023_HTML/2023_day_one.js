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
    let fileData = readTextFile("../2023_inputFiles/dayoneinput.txt");
    newArray = fileData.split("\n");
    var firstFound = false;
    var runningtotal = 0;
    var firstNumber = "";
    var lastNumber = "";
    var linenumber = "";
    for(var i = 0; i < newArray.length; i++){
        var currentLine = newArray[i].trim();
        firstFound = false;
        for(var z = 0; z < currentLine.length; z++){
            //if its not a number
            if(!isNaN(currentLine[z])){
                if(!firstFound){
                    firstNumber = currentLine[z];
                    firstFound = true;
                }
                lastNumber = currentLine[z];
            }
        }
        linenumber = firstNumber + lastNumber;
        runningtotal += parseInt(linenumber);
    }
    console.log(runningtotal);
}


var numbers = new Map([
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"]
  ]);

function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/dayoneinput.txt");
    newArray = fileData.split("\n");
    
    var firstFound = false;
    var runningtotal = 0;
    var firstNumber = "";
    var lastNumber = "";
    var linenumber = "";
    for(var i = 0; i < newArray.length; i++){
        var currentLine = newArray[i].trim();
        var currentString = [];
        firstFound = false;
        for(var z = 0; z < currentLine.length; z++){
            //if its not a number
            if(!isNaN(currentLine[z])){
                if(!firstFound){
                    firstNumber = currentLine[z];
                    firstFound = true;
                }
                lastNumber = currentLine[z];
                currentString = "";
            }
            else{
                currentString += currentLine[z];
                if (readLastNumber(currentString) != ""){
                    if(!firstFound){
                        firstNumber = readLastNumber(currentString);
                        firstFound = true;
                    }
                    lastNumber = readLastNumber(currentString);
                }
            }
        }
        linenumber = firstNumber + lastNumber;
        runningtotal += parseInt(linenumber);
    }
    console.log(runningtotal);
}
function readLastNumber(inputString){
    var lastNumber = "";
        //for each map entry
        for (const [word, value] of numbers){
            if (inputString.endsWith(word)){
                lastNumber = value;
                break;
            }
        }
    return lastNumber;
}

window.onload = function(){
    partOne();
    partTwo();
}
