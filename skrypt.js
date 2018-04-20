function drawFigure(){
    var c = document.getElementById("wykres");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 800, 400);

    var x = 30;
    var maxY = 400;
    var width = 35;
    
    ctx.fillStyle = "orange";
    var maxValHMT = 0;
    Object.keys(client.howManyTransactions).forEach(function(key) {
        if(client.howManyTransactions[key] > maxValHMT) maxValHMT = client.howManyTransactions[key];
    });
    Object.keys(client.howManyTransactions).forEach(function(key) {
        var height = client.howManyTransactions[key]/maxValHMT * (maxY-50);
        ctx.fillRect(x, maxY-height, width, height);
        x+=64;
    });

    x = 30;
    ctx.beginPath();
    
    ctx.strokeStyle = 'teal';
    ctx.lineWidth = 4;
    
    var maxValHMS = 0;
    Object.keys(client.howMuchSpent).forEach(function(key) {
        if(client.howMuchSpent[key] > maxValHMS) maxValHMS = client.howMuchSpent[key];
    });
    var i = 0;
    Object.keys(client.howMuchSpent).forEach(function(key) {
        var y = maxY - client.howMuchSpent[key]/maxValHMS * (maxY-50);
        if (i == 0) {
            ctx.moveTo(x+width/2, y);
            x += width/2;
            i++;
        } else {
            x+=64;
            ctx.lineTo(x, y);
            ctx.stroke();
            i++;
        }
    });
    ctx.fillStyle = "#343434";
    ctx.font = "500 16px Arial";
    x = 33;
    Object.keys(client.howManyTransactions).forEach(function(key) {
        //if(client.howManyTransactions[key] > maxVal) maxVal = client.howManyTransactions[key];
        ctx.fillText(key,x,maxY-10);
        x+=64;
    });

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    //ctx.fillText("0",12,maxY);

    var step = 35;
    for (var i=0; i<11; i++) {
        ctx.moveTo(0, maxY-step*i);
        ctx.lineTo(10, maxY-step*i);
        ctx.stroke();

        ctx.moveTo(800-10, maxY-step*i);
        ctx.lineTo(800, maxY-step*i);
        ctx.stroke();
    }
    
    ctx.fillStyle = "orange";
    ctx.fillText("HMT",12,maxY-11*step);
    ctx.fillText("0",12,maxY);
    ctx.fillText(maxValHMT,12,maxY-10*step);

    ctx.fillStyle = "teal";
    ctx.fillText("HMS",800-40,maxY-11*step);
    ctx.fillText(maxValHMS,800-40,maxY-10*step);
    ctx.fillText("0",800-20,maxY);
}



function updateClientData() {
    document.querySelector("#clientData").innerHTML = JSON.stringify(client, null, 4);
};

function editClientData() {
    var amount = document.forms[0].amount.value;
    if (amount < 0) {
        alert("Wartość musi być większa od 0.");
        return;
    }
    var whatToEdit = document.forms[0].whatToEdit.value;
    var month = document.forms[0].month.value;

    (client[whatToEdit])[month] = Number(amount);
    updateClientData();
    drawFigure();
    
};

var client = {
    id: "Janusz",
    howManyTransactions: {
        "Jan": 4,
        "Feb": 6,
        "Mar": 12,
        "Apr": 18,
        "May": 7,
        "Jun": 29,
        "Jul": 12,
        "Aug": 15,
        "Sep": 14,
        "Oct": 18,
        "Nov": 16,
        "Dec": 24
    },
    howMuchSpent: {
        "Jan": 125,
        "Feb": 213,
        "Mar": 123,
        "Apr": 94,
        "May": 99,
        "Jun": 64,
        "Jul": 740,
        "Aug": 403,
        "Sep": 350,
        "Oct": 240,
        "Nov": 604,
        "Dec": 834
    }
};

updateClientData();
drawFigure();