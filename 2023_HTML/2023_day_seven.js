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
    let fileData = readTextFile("../2023_inputFiles/dayseveninput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    //["HighCard", "OnePair", "TwoPair", "ThreeOfAKind", "FullHouse", "FourOfAKind", "FiveOfAKind"];
    var cardHands = [[],[],[],[],[],[],[]];
    for(var y = 0; y < currentLine.length; y++){
        var hand = currentLine[y].split(" ");
        var handType = returnHandType(hand[0]);
        cardHands[handType].push([returnArrayValue(hand[0]), hand[1]]);
    }
    for(var y = 0; y < cardHands.length; y++){
        cardHands[y] = sortHandType(cardHands[y]);
    }
    calculateTotalWinnings(cardHands);
}

function calculateTotalWinnings(cardHands){
    var totalWinnings = 0;
    var runningCount = 0;
    for(var y = 0; y < cardHands.length; y++){
        if(cardHands[y] != []){
            for(var z = 0; z < cardHands[y].length; z++){
                runningCount++;
                var handValue = runningCount*parseInt(cardHands[y][z][1]);
                totalWinnings += handValue;
            }
        }
    }
    console.log(totalWinnings);
}

function sortHandType(handArray){
    var sortedArray = handArray.sort((entryA, entryB) => {
        for (let i = 0; i < entryA[0].length; i++){
          if (entryA[0][i] !== entryB[0][i]){
            return entryA[0][i] - entryB[0][i];
          }
        }
        return 0; // If all corresponding elements are equal, return 0
      });
      return sortedArray;
}

function returnHandType(Hand){
    var array = [Hand[0], Hand[1], Hand[2], Hand[3], Hand[4]];
    var currentHandMap = countDuplicates(array);
    var countArray = [];
    var result;
    currentHandMap.forEach((count, card) => {
        countArray.push(count);
        if(count == 5){
            result = 6;
        }
        else if(count == 4){
            result = 5;
        }
        else if(countArray[0] == 3 && countArray[1] == 2){
            result = 4;
        }
        else if(countArray[0] == 3 && countArray[1] == 1){
            result = 3;
        }
        else if(countArray[0] == 2 && countArray[1] == 2){
            result = 2;
        }
        else if(countArray[0] == 2 && countArray[1] == 1){
            result = 1;
        }
        else if(countArray[0] == 1){
            result = 0;
        }
    });

    return result;
}

function returnArrayValue(hand){
    var handArray = hand.split("");
    var handValue = [];
    for (const element of handArray){
        handValue.push(cardValue.get(element));
    }
    return handValue;
}

function countDuplicates(handArray){
    const HandCountMap = new Map();
    for (const element of handArray){
      if (HandCountMap.has(element)){
        HandCountMap.set(element, HandCountMap.get(element) + 1);
      } 
      else{
        HandCountMap.set(element, 1);
      }
    }
    const sortedHandArray = Array.from(HandCountMap).sort(([, keyA], [, keyB]) => keyB - keyA);
    var sortedMapTwo = sortedHandArray.sort((entryA, entryB) => {
        if (entryA[1] == entryB[1]){
          return cardValue.get(entryB[0]) - cardValue.get(entryA[0]);
        }
        return 0;
    });
    const sortedMap = new Map(sortedMapTwo);
    return sortedMap;
  }

 


function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/dayseveninput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    //["HighCard", "OnePair", "TwoPair", "ThreeOfAKind", "FullHouse", "FourOfAKind", "FiveOfAKind"];
    var cardHands = [[],[],[],[],[],[],[]];
    for(var y = 0; y < currentLine.length; y++){
        var hand = currentLine[y].split(" ");
        var handType = returnHandTypeTwo(hand[0]);
        cardHands[handType].push([returnArrayValueTwo(hand[0]), hand[1]]);
    }
    for(var y = 0; y < cardHands.length; y++){
        cardHands[y] = sortHandType(cardHands[y]);
    }
    calculateTotalWinnings(cardHands);
}

function countDuplicatesTwo(handArray){
    const HandCountMap = new Map();
    var jokerCount = 0;
    for (const element of handArray){
        if(element == "J"){
            jokerCount++;
        }
        else{
            if (HandCountMap.has(element)){
                HandCountMap.set(element, HandCountMap.get(element) + 1);
            } 
            else{
                HandCountMap.set(element, 1);
            }
        }
    }
    const sortedHandArray = Array.from(HandCountMap).sort(([, keyA], [, keyB]) => keyB - keyA);
    var sortedMapTwo = sortedHandArray.sort((entryA, entryB) => {
        if (entryA[1] == entryB[1]){
          return cardValuePartTwo.get(entryB[0]) - cardValuePartTwo.get(entryA[0]);
        }
        return 0;
    });
    if(jokerCount == 5){
        sortedMapTwo = [['J', 5]];
    }
    else{
        sortedMapTwo[0][1] += jokerCount;
    }
    
    const sortedMap = new Map(sortedMapTwo);
    return sortedMap;
  }

function returnHandTypeTwo(Hand){
    var array = [Hand[0], Hand[1], Hand[2], Hand[3], Hand[4]];

    var currentHandMap = countDuplicatesTwo(array);
    var countArray = [];
    var result;
    currentHandMap.forEach((count, card) => {
        countArray.push(count);
        if(count == 5){
            result = 6;
        }
        else if(count == 4){
            result = 5;
        }
        else if(countArray[0] == 3 && countArray[1] == 2){
            result = 4;
        }
        else if(countArray[0] == 3 && countArray[1] == 1){
            result = 3;
        }
        else if(countArray[0] == 2 && countArray[1] == 2){
            result = 2;
        }
        else if(countArray[0] == 2 && countArray[1] == 1){
            result = 1;
        }
        else if(countArray[0] == 1){
            result = 0;
        }
    });

    return result;
}

function returnArrayValueTwo(hand){
    var handArray = hand.split("");
    var handValue = [];
    for (const element of handArray){
        handValue.push(cardValuePartTwo.get(element));
    }
    return handValue;
}

const cardValue = new Map([
    ['2', 1],
    ['3', 2],
    ['4', 3],
    ['5', 4],
    ['6', 5],
    ['7', 6],
    ['8', 7],
    ['9', 8],
    ['T', 9],
    ['J', 10],
    ['Q', 11],
    ['K', 12],
    ['A', 13]
]);

const cardValuePartTwo = new Map([
    ['J', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['T', 10],
    ['Q', 11],
    ['K', 12],
    ['A', 13]
]);


window.onload = function(){
    partOne();
    partTwo();
}
