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
    let fileData = readTextFile("../2023_inputFiles/dayfourinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var totalScore = 0;
    for(var z = 0; z < currentLine.length; z++){
        var currentTicket = currentLine[z].split(':')[1].split('|');
        var winningNumbers = currentTicket[0].trim().split(" ");
        var myCardNumbers = currentTicket[1].trim().split(" ");
        var totalWinningNumbers = checkAmountMatched(myCardNumbers, winningNumbers);
        if(totalWinningNumbers >= 1){
            totalScore += Math.pow(2, totalWinningNumbers-1);
        }
    }
    console.log(totalScore);
}




function partTwo(){
    let fileData = readTextFile("../2023_inputFiles/dayfourinput.txt");
    newArray = fileData.split("\n");
    var currentLine = fileData.split("\n").map(line => line.trim());
    var cardValue = [];
    //we start with 1 of each card.
    for(var z = 0; z < currentLine.length; z++){
        cardValue[z] = 1;
    }
    //we start at the second last card as the last one cant match any.
    for(var z = currentLine.length-1; z >= 0; z--){
        var currentTicket = currentLine[z].split(':')[1].split('|');
        var winningNumbers = currentTicket[0].trim().split(" ");
        var myCardNumbers = currentTicket[1].trim().split(" ");
        var totalMatches = checkAmountMatched(myCardNumbers, winningNumbers);
        if(totalMatches > 0){
            for(var x = 1; x <= totalMatches; x++){
                cardValue[z] += cardValue[z+x];
            }
        }
    }
    total = 0;
    for (const value of cardValue){
        total += value;
    }
    console.log("Total: " + total);
}

function checkAmountMatched(myCardNumbers, winningNumbers){
    var totalWinningNumbers = 0;
    for (const cardNumber of myCardNumbers){
        if(winningNumbers.includes(cardNumber) && cardNumber != ""){
            totalWinningNumbers++
        }
    }
    return totalWinningNumbers;
}


window.onload = function(){
    partOne();
    partTwo();
}
