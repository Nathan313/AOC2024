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
    let fileData = readTextFile("../2023_inputFiles/dayfiveinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var seed_to_soil = [];
    var soil_to_fertilizer = [];
    var fertilizer_to_water = [];
    var water_to_light = [];
    var light_to_temperature = [];
    var temperature_to_humidity = [];
    var humidity_to_location = [];
    var allMaps = [seed_to_soil, soil_to_fertilizer, fertilizer_to_water, water_to_light, light_to_temperature, temperature_to_humidity, humidity_to_location];


    for(var z = 0; z < currentLine.length; z++){
        //console.log(currentLine[z]);
        if(currentLine[z] == 'seed-to-soil map:'){
            [seed_to_soil, z] = createMap(seed_to_soil, z, currentLine);
        }
        else if(currentLine[z] == 'soil-to-fertilizer map:'){
            [soil_to_fertilizer, z] = createMap(soil_to_fertilizer, z, currentLine);
        }
        else if(currentLine[z] == 'fertilizer-to-water map:'){
            [fertilizer_to_water, z] = createMap(fertilizer_to_water, z, currentLine);
        }
        else if(currentLine[z] == 'water-to-light map:'){
            [water_to_light, z] = createMap(water_to_light, z, currentLine);
        }
        else if(currentLine[z] == 'light-to-temperature map:'){
            [light_to_temperature, z] = createMap(light_to_temperature, z, currentLine);
        }
        else if(currentLine[z] == 'temperature-to-humidity map:'){
            [temperature_to_humidity, z] = createMap(temperature_to_humidity, z, currentLine);
        }
        else if(currentLine[z] == 'humidity-to-location map:'){
            [humidity_to_location, z] = createMap(humidity_to_location, z, currentLine);
        }
    }
    var lowestLocationNumber = [];
    var seeds = currentLine[0].split(':')[1].trim().split(" ");
    //console.log(seeds);
    for (const seed of seeds){
        var currentDestination = parseInt(seed);
        //console.log("Start Seed: " + currentDestination);
        for(var z = 0; z < allMaps.length; z++){
            var currnetMap = allMaps[z];
            var boundFound = false;
            for(var i = 0; i < currnetMap.length; i++){
                if(isNumberWithinBounds(currentDestination, currnetMap[i][0])){
                    boundFound = true;
                    currentDestination = parseInt(currentDestination + currnetMap[i][1]);
                    //console.log(currentDestination + "    z: " + z);
                    if(z == allMaps.length-1){
                        lowestLocationNumber.push(parseInt(currentDestination));
                    }
                    break;
                    
                }
            }
            if(!boundFound){
                //console.log(currentDestination + "    z: " + z);
            }
            if(!boundFound && z == allMaps.length-1){
                lowestLocationNumber.push(parseInt(currentDestination));
            }
        }
    }
    console.log("Lowest Location: " + Math.min(...lowestLocationNumber));
    var dotproduct = allMaps[0].length*allMaps[1].length*allMaps[2].length*allMaps[3].length*allMaps[4].length*allMaps[5].length*allMaps[6].length;
    
    console.log("product of length of all maps " + dotproduct);
    


}

function isNumberWithinBounds(number, bounds) {
    //console.log("checking if this is between these 2: " + number + "   between: " + bounds[0] + "   " + bounds[1]);
    return number >= bounds[0] && number <= bounds[1];
}


function createMap(mapType, z, currentLine){
    var doneParsing = false;
    while(!doneParsing){
        z++;
        var mapItem = currentLine[z].split(" ");
        var source = [parseInt(mapItem[1]), parseInt(parseInt(mapItem[1])+parseInt(mapItem[2]-1))];
        var range = parseInt(mapItem[0]-mapItem[1]);
        mapType.push([source, range]);
        //console.log(currentLine[z+1]);
        if(currentLine[z+1] == undefined || currentLine[z+1] == ""){
            doneParsing = true;
        }
    }
    return [mapType, z];
}


function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/dayfiveinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var seed_to_soil = [];
    var soil_to_fertilizer = [];
    var fertilizer_to_water = [];
    var water_to_light = [];
    var light_to_temperature = [];
    var temperature_to_humidity = [];
    var humidity_to_location = [];
    var allMaps = [seed_to_soil, soil_to_fertilizer, fertilizer_to_water, water_to_light, light_to_temperature, temperature_to_humidity, humidity_to_location];
    var possibleSeeds = [];
    var ANSWER = 0;
    var firstLine = currentLine[0].split(":")[1].trim().split(" ");
    for(var z = 0; z < firstLine.length; z = z+2){
        possibleSeeds.push([parseInt(firstLine[z]), parseInt(firstLine[z])+parseInt(firstLine[z+1])-1]);
    }
    //console.log(possibleSeeds);

    for(var z = 0; z < currentLine.length; z++){
        if(currentLine[z] == 'seed-to-soil map:'){
            [seed_to_soil, z] = createMap(seed_to_soil, z, currentLine);
            //console.log(seed_to_soil);
        }
        else if(currentLine[z] == 'soil-to-fertilizer map:'){
            [soil_to_fertilizer, z] = createMap(soil_to_fertilizer, z, currentLine);
        }
        else if(currentLine[z] == 'fertilizer-to-water map:'){
            [fertilizer_to_water, z] = createMap(fertilizer_to_water, z, currentLine);
        }
        else if(currentLine[z] == 'water-to-light map:'){
            [water_to_light, z] = createMap(water_to_light, z, currentLine);
        }
        else if(currentLine[z] == 'light-to-temperature map:'){
            [light_to_temperature, z] = createMap(light_to_temperature, z, currentLine);
        }
        else if(currentLine[z] == 'temperature-to-humidity map:'){
            [temperature_to_humidity, z] = createMap(temperature_to_humidity, z, currentLine);
        }
        else if(currentLine[z] == 'humidity-to-location map:'){
            [humidity_to_location, z] = createMap(humidity_to_location, z, currentLine);
        }
    }
    outerLoop: for(var y = 0; y < 1000000000; y++){
        var currentDestination = y;
        if(y % 10000 === 0){
            console.log("Current value of y:", y);
        }
        for(var z = allMaps.length-1; z >= 0; z--){
            var currnetMap = allMaps[z];
            var boundFound = false;
            for(var i = 0; i < currnetMap.length; i++){
                if(isNumberWithinBounds(parseInt(currentDestination-currnetMap[i][1]), currnetMap[i][0])){
                    boundFound = true;
                    currentDestination = parseInt(currentDestination - currnetMap[i][1]);
                    break;
                }
            }
            if(z == 0){
                if(checkIfNumberIsASeed(currentDestination, possibleSeeds, y)){
                    break outerLoop;
                }
            }
        }
    }
}
function checkIfNumberIsASeed(seed, possibleSeeds, y){
    var found = false;
    for(var u = 0; u < possibleSeeds.length; u++){
        if(isNumberWithinBounds(seed, possibleSeeds[u])){
            found = true;
            console.log("Found: " + seed);
            ANSWER = y;
            console.log("Lowest location is: " + ANSWER);
            break;
        }
    }
    return found;
}

window.onload = function(){
    //partOne();
    partTwo();
}
