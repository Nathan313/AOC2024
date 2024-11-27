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
    let fileData = readTextFile("../2023_inputFiles/daysixinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var time = currentLine[0].split(":")[1].trim().split(" ");
    time = time.filter(value => value !== '');
    var Distance = currentLine[1].split(":")[1].trim().split(" ");
    Distance = Distance.filter(value => value !== '');
    var waysToBeatEachRace = [];
    for(var y = 0; y < time.length; y++){
        //console.log(Distance[y] + "   " +  time[y]);
        waysToBeatEachRace.push(calculateWaysToBeatRecord(parseInt(Distance[y]), parseInt(time[y])));
    }
    var result = waysToBeatEachRace[0];
    for(var y = 1; y < waysToBeatEachRace.length; y++){
        result = result*waysToBeatEachRace[y]
    }
    console.log(result);
}



function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/daysixinputtwo.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var time = currentLine[0].split(":")[1].trim();
    var Distance = currentLine[1].split(":")[1].trim();
    console.log(time);
    console.log(Distance);
    var waysToBeatEachRace = calculateWaysToBeatRecordOneRace(parseInt(Distance), parseInt(time));

    console.log(waysToBeatEachRace);

}
function calculateWaysToBeatRecord(Distance, time){
    var differentWaysToBeat = 0;
    //y is how long we hold down the button
    for(var y = 0; y < time; y++){
        //console.log((time - y)*y);
        var distanceReached = (time - y)*y
        if(distanceReached > Distance){
            differentWaysToBeat++;
        }
    }
    return differentWaysToBeat;
}

function calculateWaysToBeatRecordOneRace(Distance, time){
    var lowerBound = 0;
    var higherBound = time;
    var differentWaysToBeat = 0;
    //y is how long we hold down the button
    for(var y = 0; y < time; y++){
        var distanceReached = (time - y)*y
        if(distanceReached > Distance){
            lowerBound = y;
            break;
        }
    }
    for(var y = time; y >= 0; y--){
        var distanceReached = (time - y)*y
        if(distanceReached > Distance){
            higherBound = y;
            break;
        }
    }
    differentWaysToBeat = higherBound - lowerBound+1;
    return differentWaysToBeat;
}

window.onload = function(){
    //partOne();
    partTwo();
}
