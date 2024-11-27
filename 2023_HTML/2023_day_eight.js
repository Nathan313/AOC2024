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

var leftMap = new Map();
var rightMap = new Map();
//answer is not 293
function partOne(){
    let fileData = readTextFile("../2023_inputFiles/dayeightinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var instructions = currentLine[0].split("");
    var currentKey = "AAA";
    var ExitFound = false;
    for(var y = 2; y < currentLine.length; y++){
        var mapID = currentLine[y].split("=")[0].trim();
        var LeftmapResult = currentLine[y].split("=")[1].split(",")[0].replace(/[()]/g, '').trim();
        var RightmapResult = currentLine[y].split("=")[1].split(",")[1].replace(/[()]/g, '').trim();
        leftMap.set(mapID, LeftmapResult)
        rightMap.set(mapID, RightmapResult);
        
    }
    var count = 0;
    var totalcount = 0;
    while(!ExitFound){
        count = count % instructions.length;
        var currentDirection = instructions[count];
        count++;
        totalcount++;
        if(currentDirection == "L"){
            currentKey = leftMap.get(currentKey);
        }
        else if(currentDirection == "R"){
            currentKey = rightMap.get(currentKey);
        }
        console.log(currentKey);
        if(currentKey == "ZZZ"){
            ExitFound = true;
        }
    }
    console.log(totalcount);

}



function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/dayeightinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var instructions = currentLine[0].split("");
    for(var y = 2; y < currentLine.length; y++){
        var mapID = currentLine[y].split("=")[0].trim();
        var LeftmapResult = currentLine[y].split("=")[1].split(",")[0].replace(/[()]/g, '').trim();
        var RightmapResult = currentLine[y].split("=")[1].split(",")[1].replace(/[()]/g, '').trim();
        leftMap.set(mapID, LeftmapResult)
        rightMap.set(mapID, RightmapResult); 
    }

    var stepsforEach = [];
    var currentAllNodes = getAllStartingNodes();
    for(var z = 0; z < currentAllNodes.length; z++){
        var count = 0;
        var totalcount = 0;
        while(!testifAllEndwithZ(currentAllNodes[z])){
            count = count % instructions.length;
            var currentDirection = instructions[count];
            count++;
            totalcount++;
            if(totalcount % 10000 === 0){
                console.log(totalcount);
                console.log(currentAllNodes);
            }
            if(currentDirection == "L"){
                var id = currentAllNodes[z];
                currentAllNodes[z] = leftMap.get(id);
            }  
            else if(currentDirection == "R"){
                var id = currentAllNodes[z];
                currentAllNodes[z] = rightMap.get(id);
            }
        }
        stepsforEach.push(totalcount);
    }
    lowestCommonMultipleOfArray(stepsforEach);
}

function getAllStartingNodes(){
    let MapToArrayWithA = Array.from(leftMap).filter(([key]) => key.endsWith('A'));
    let resultArray = MapToArrayWithA.map(([firstElement]) => firstElement);
    return resultArray;
}

function lowestCommonMultipleOfArray(numbers){
    var lcm = numbers[0];
    for(var i = 1; i < numbers.length; i++){
        const currentNumber = numbers[i];
        const currentGCD = greatestCommonDivisor(lcm, currentNumber);
        lcm = (lcm * currentNumber) / currentGCD;
    }
    console.log(Math.abs(lcm));
  }
  function greatestCommonDivisor(a, b){
    if(b == 0){
        return a;
    } 
    else{
        var remainder = a % b;
        return greatestCommonDivisor(b, remainder);
    }
  }


function testifAllEndwithZ(string){
    if(string[2] == "Z"){
        return true;
    }
    else{
        return false;
    }

}


window.onload = function(){
    //partOne();
    partTwo();
}
