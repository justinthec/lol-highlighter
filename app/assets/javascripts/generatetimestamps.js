function getTimestamps(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );

    var seperateKillLength = new Array();
    var killCounter = 1;
    var allKills = "";
    var end;
    var gameData = JSON.parse(xmlHttp.responseText);

    for (var i=0;i<gameData.frames.length;i++){
        for (var j=0;j<gameData.frames[i].events.length;j++) {
            if (gameData.frames[i].events[j].type=="CHAMPION_KILL") {
                var startEndPair = {};
                startEndPair.start = Math.round((gameData.frames[i].events[j].timestamp - 10000)/1000);
                startEndPair.end = Math.round((gameData.frames[i].events[j].timestamp+5000)/1000);
                seperateKillLength.push(startEndPair);
            }
        }
    }
    for (var i=0;i<seperateKillLength.length;i++) {
                allKills += seperateKillLength[i].start + "&nbsp&nbsp" +  seperateKillLength[i].end + "&nbsp&nbsp";
                allKills += "Kills: " + killCounter + "<br>"; 
    }

    console.log(mergeTimestamps(seperateKillLength));
    document.getElementById("JSON").innerHTML = allKills;
}

function mergeTimestamps(timestamps) {
    for (var i=0;i<timestamps.length-1;) {
        if (timestamps[i].end >= timestamps[i+1].end) {
            timestamps.splice(i+1,1);
        }

        else if (timestamps[i].end >= timestamps[i+1].start) {
            var newStart = timestamps[i].start;
            timestamps.splice(i,1);
            timestamps[i].start = newStart;
        }

        else {
            i++;
        }
    }
    return timestamps;
}