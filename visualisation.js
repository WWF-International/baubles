// Set up some variables and constants
PI=Math.PI;
TAU=2*PI; //google 'pi is wrong for details'
FRAME_RATE=24;

//CREATE THE CANVAS


//var canvas = document.createElement('canvas');
//document.body.appendChild(canvas);

//CREATE THE CANVAS
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'),
    visitors = [],
    colour = "white",
    backgroundColour = "hsl(0,0%,0%)",
    radius = 6,
    datePos = 50;
    dateInc = ((canvas.width-100)/365)/24;

//document.body.style.background = backgroundColour;

//setInterval(draw, 1000/12);
var visitData = new Uint16Array(arr.length);
visitData.set(arr); // creating then filling a typed array for extra performance

var hour = 0;
var lastVisitorNo = 0;


function whichMonth(mm) {
    var whatMonth=new Array();
        whatMonth[0]="Jan";
        whatMonth[1]="Feb";
        whatMonth[2]="Mar";
        whatMonth[3]="Apr";
        whatMonth[4]="May";
        whatMonth[5]="Jun";
        whatMonth[6]="Jul";
        whatMonth[7]="Aug";
        whatMonth[8]="Sept";
        whatMonth[9]="Oct";
        whatMonth[10]="Nov";
        whatMonth[11]="Dec";
    
    return whatMonth[mm];
}



//LET'S INPUT SOME CODE HERE:

function draw(){
    var drawStart=new Date()
    c.clearRect(0,0,canvas.width,canvas.height);
        
    var visits = visitData[hour];
    var visitTime = new Date(1351987200000 + (hour * 60 * 60 * 1000));//create date object with milliseconds date of first hour plus milliseconds in an hour * hour index
    doTheAwesome(visits, visitTime);
    
    hour = hour + 1;
    var drawEnd=new Date();
    var timeTaken = drawEnd.valueOf() - drawStart.valueOf() ;
    var nextDraw= timeTaken < (1000/FRAME_RATE) ? (1000/FRAME_RATE) - timeTaken : 0;
    setTimeout(draw,nextDraw);
    console.log(nextDraw>0 ? "coping" : "lagging");
}

function Visitor() {
    this.posX = random(radius/2,(canvas.height-radius/2));
    this.posY = random(radius/2,canvas.width-radius/2);
    this.radius = random(radius-3,radius);
    //this.xVel = random(-0.7,0.7);
   // this.yVel = random(-0.7,0.7);
    this.colour = random(0,360);
}


function doTheAwesome(visits, visitTime) {
    //elemVisits.textContent = visits;
    
    if(visits>lastVisitorNo){
        for(var i=0;i<visits-lastVisitorNo;i++){
            var v = new Visitor();
            visitors.push(v);
            //console.log("pushing");
        }
    } else {
        for(var k=0;k<lastVisitorNo-visits;k++){
            visitors.shift();
            //console.log("shifting");
        }
    }
    
    for(var j=0;j<visitors.length;j++){
        v = visitors[j];
        
        c.save();
        c.translate(v.posY,v.posX);
            c.beginPath();
            c.arc(0,0,v.radius,0,TAU,true); // much easier TAU is a whole turn
            c.closePath();
            colour = 'hsl(' + v.colour + ',100%,60%)';
            myColour = 'hsl(' + v.colour + ',100%,65%)',
            myColour2 = 'hsl(' + v.colour + ',100%,40%)';
            var g = c.createRadialGradient(0,0,0,0,0,v.radius);
                g.addColorStop(0, myColour);
                g.addColorStop(1, myColour2);
            c.fillStyle = g;
            //c.fillStyle = colour;
            //c.lineWidth = 1;
            //c.strokeStyle = backgroundColour;
            //c.stroke();
            c.shadowColor = 'hsl('+v.colour+',100%,70%)';
            //c.shadowColor = 'black';
            c.shadowBlur = 3;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;  
            c.fill();
            //c.stroke();  
        c.restore();
        
        //v.posY += v.yVel;
        //v.posX += v.xVel;
        
    }
    
    
    lastVisitorNo = visits;

    var day = visitTime.getDate();
    var month = visitTime.getMonth(),
        month = whichMonth(month);
    var hours = visitTime.getHours() + 1;
    //elemDateDiv.textContent = day + "/" + month + " " + hours + ":00";
    
    
    c.save();
    c.translate(datePos, canvas.height-65);
    c.rotate(-0.25*TAU); // anticlockwise by a quarter turn Tau FTW
        c.fillStyle = "white";
        c.font = "bold 40px Arial";
        c.fillText( day + " " + month + " " + " " + hours + ":00", 0,0);
    c.restore();
    
    c.beginPath();
    c.moveTo(datePos-30, canvas.height-60);
    c.lineTo(datePos, canvas.height-60);
    c.lineTo(datePos-15, canvas.height-15);
    c.lineTo(datePos-30, canvas.height-60);
    c.closePath();
    c.fillStyle = 'white';
    c.fill();
    
    datePos += dateInc;
    
    
    
    
}

//CREATE RANDOM FUNCTION
function random(min, max) {
    return Math.random() * (max - min) + min;
}           

draw();