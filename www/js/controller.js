testOptions = JSON.parse(localStorage.getItem("test"));

switch (testOptions.type) {
case 0:
    test = new fixedDoseAssessment(testOptions.doses, testOptions.rand);
    break;
case 1:
    test = new stepAssessment;
    break;
case 2:
    test = new superAssessment(testOptions.gender, testOptions.age);
    break;
}


var showMarkerIndices;
if (localStorage.getItem("dont-show-marker-indices") == "true") {
	showMarkerIndices = false;
} else {
	showMarkerIndices = true;
}

function shadeOtherPens() {
    pensToShade = document.getElementsByClassName("notSelected");
    for (var i = 0; i < pensToShade.length; i++) {
	if (pensToShade[i].class != "selected") {
	    pensToShade[i].style.opacity = "0.4"
	}
    }
}

var pens = ['<img id="green" class="notSelected" src="img/green.png" width="20%" hspace="1%" onclick="this.class=\'selected\'; shadeOtherPens(); setTimeout(function(){ update(\'green\');},300); this.class=\'notSelected\';" />',
            '<img id="blue"  class="notSelected" src="img/blue.png"   width="20%" hspace="1%" onclick="this.class=\'selected\'; shadeOtherPens(); setTimeout(function(){ update(\'red\');  },300); this.class=\'notSelected\';" />',
            '<img id="red"   class="notSelected" src="img/red.png"  width="20%" hspace="1%" onclick="this.class=\'selected\'; shadeOtherPens(); setTimeout(function(){ update(\'blue\'); },300); this.class=\'notSelected\';" />'];

var markers;

// infinitely useful
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function avg(arr) {
    return arr.reduce(function (p, c) {return p + c;}) / arr.length;
}

function presentPens() {
    document.getElementById("markerNumber").innerHTML = String(test.currentNumber);
    shuffledPens = shuffle(pens);
	console.log(shuffledPens);
    markers = [];
    for (var i = 0; i < 3; i++) {
		markers[i] = shuffledPens[i].split("id=")[1].split(" class")[0].replace('"','').replace('"','').replaceAll(" ","");
		if (showMarkerIndices) {
			var color = shuffledPens[i].match(/red|green|blue/)[0];
			console.log(color)
			shuffledPens[i] = shuffledPens[i].replace(/src="img\/(red|green|blue).*?"/, 'src="img/' + color + '_' + (i + 1) + '.png"')
			//shuffledPens[i] = shuffledPens[i].replace(".png", "_" + (i + 1) + ".png")
		}
    }
	
	console.log(shuffledPens)
    document.getElementById("markerView").innerHTML = shuffledPens.join("");
}

function back() {
    test.back();
    if (test.record.length == 1) {
	document.getElementById("backButton").disabled = true;
    }
    else {
	document.getElementById("backButton").disabled = false;
    }
    // update progress bar
    myApp.setProgressbar(document.getElementById("progress-bar"), test.progress(), 300)

    // present new pens
    presentPens();
}

function returnToMainPage() {
    location = "index.html"
}

function end() {
    // format page for results
    document.getElementById("container").innerHTML = "<br><center>Score<h1>" + Math.round(test.score * 10) / 10 + "</h1></center>"

    // remove undo button
    document.getElementById("backButton").parentElement.removeChild(document.getElementById("backButton"));

    // submit result to database
    var subjectInfo = JSON.parse(window.localStorage.getItem("subjectInfo"));

    var testType    = ["Constant Stimuli", "Staircase", "Server"][testOptions.type];

    result = {id:subjectInfo.id, testType: testType, score:test.score, gender: subjectInfo.gender, age: subjectInfo.age, record:test.record.join(" ")};
    if (window.localStorage.getItem("data") != null) {
    	data = JSON.parse(window.localStorage.getItem("data"));
    	data.push(result);
    	window.localStorage.setItem("data", JSON.stringify(data));
    } else {
	    window.localStorage.setItem("data", JSON.stringify([result]));
    }
}

function update(color) {
    // now we have a non-zero record, allow undo
    document.getElementById("backButton").disabled = false;

    // feed algorithm latest input
    test.update(color, markers);

    if (test.isDone) {
        end();
    }
else {
    // update progress bar
    myApp.setProgressbar(document.getElementById("progress-bar"), test.progress(), 300);

    // present new pens
    presentPens();
}
}

presentPens();
