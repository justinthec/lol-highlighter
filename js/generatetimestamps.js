function getTimestamps(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );

    var startEndPair = new Array();
    var seperateKillLength = new Array();
    var combinedKillLength = new Array();
    var combinedStart;
    var combinedEnd;
    var killCounter = 1;
    var allKills = "";
    var 
    var start;
    var end;
    var gameData = JSON.parse(xmlHttp.responseText);
    console.log(gameData);

    for (var i=0;i<gameData.frames.length;i++){
        for (var j=0;j<gameData.frames[i].events.length;j++) {
            if (gameData.frames[i].events[j].type=="CHAMPION_KILL") {
                startEndPair = [];
                start = Math.round((gameData.frames[i].events[j].timestamp - 10000)/1000);
                end = Math.round((gameData.frames[i].events[j].timestamp+5000)/1000);
                startEndPair.push(start, end);
                seperateKillLength.push(startEndPair);
            }
        }
    }
    for (var i=0;i<seperateKillLength.length;i++) {


         for (var j=0;j<2;j++) {
            startEndPair = [];

            allKills += seperateKillLength[i][j] + "&nbsp&nbsp";
        }
        allKills += "Kills: " + killCounter + "<br>"; 
    }



    document.getElementById("JSON").innerHTML = allKills;
}


