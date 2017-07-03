function shuffle(array) {
    // all hail king Knuth
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// for stepassessment
function removeElement(arr, arrayElement) {
    temp = arr;
    for(var i=0; i<arr.length;i++ )
    {
	if(temp[i]==arrayElement)
	    temp.splice(i,1);
    }
    return temp;
}

// for parsing marker number
function hexMinusOne(i) {
    return String((i-1).toString(16));
}

function decPlusOne(s) {
    return parseInt(s, 16) + 1;
}

function Assessment() {
    this.record = [];
    this.currentNumber = 0; // 15 or 16 (random)
    this.score = 0;
    this.isDone = false;

    this.makeRecordElement = function() {}
    this.parseRecordElement = function() {}
}

function fixedDoseAssessment(doses, rand) {

    this.doses = doses
    if (rand) {
        this.doses = shuffle(doses);
    }

    this.record = [];
    this.index = this.doses.length - 1;
    this.isDone = false;
    this._progress = 0; // actual progress
    this.score = 0;
    this.currentNumber = this.doses[this.index];

    this.back = function() {
    	this.index += 1;
    	this.currentNumber = this.doses[this.index];
    	this.record.pop();
    	this._progress -= 100 / doses.length
    }

    // function to return progress
    this.progress = function() {
        return this._progress;
    }

    this.update = function(color, markers) {
        this.record.push(hexMinusOne(doses[this.index]) + markers.indexOf("red") + markers.indexOf(color) + Date.now());
	if (markers.indexOf(color) === markers.indexOf("red")) {
	    this.score += 1;
	}

	this._progress += 100 / doses.length;
        this.index -= 1;
        this.currentNumber = doses[this.index];

        if (this.index === -1) {
            this.isDone = true;
        }

    }
}

fixedDoseAssessment.prototype = new Assessment;

function stepAssessment(type) {
    this.currentNumber = 15 + Math.round(Math.random()); // 15 or 16 (random)
    this.lastNumber    = this.currentNumber;
    this.record        = [hexMinusOne(this.currentNumber)]; // list of tuples (number, colour, is reversal)
    this.stepSize      = 2;
    this.direction     = -1; // last direction
    this.lastCorrect   = false;
    this.reversals     = [];
    this.last16s       = 0;
    this.last1s        = 0;

    this.back = function() {
        this.currentNumber = decPlusOne(this.record[this.record.length - 1][0]);

        // ensure correct step size
        this.stepSize = 2;
        for (var i = 0; i < this.record.length - 1; i++){
            try {
                if (this.record[i][1] == this.record[i][2]) {

                    // check if the values are undefined
                    this.record[i][1].length;this.record[i][2].length
                    this.stepSize = 1;
                    break;
                }
            }
            catch (err) {};
        }
        this.record.pop();
	this.reversals.pop();
    }

    this.progress = function() {
	return (removeElement(this.reversals,0).length * 100 / 7).toFixed();
    }

    this.update = function(color, markers) {
        // record direction
        lastDirection = this.direction;

        // record choice
        this.record.push(hexMinusOne(this.currentNumber) + markers.indexOf("red") + markers.indexOf(color) + Date.now());

        // end state
        if (this.reversals.length == 7) {
            return -1;
        }

        //  If you get 5 16's in a row, return a score of 16
        if (this.currentNumber === 16 && color === "red") {
            this.last16s += 1;
            if (this.last16s === 5){
                myApp.alert("5 16's exceeded. Perfect score.", "Osmi");
                this.isDone = true;
                return;
            }
        }

        // If you get 7 1's in a row, return a message that the test's most likely bad
        else if (this.currentNumber === 1 && color != "red") {
            this.last1s += 1;
            if (this.last1s === 7){
                myApp.alert("7 1's exceeded. Test most likely bad", "Osmi");
                this.score = "NA";
                this.isDone = true;
                return;
            }
        }
        
        // step 2
        else if (color === "red") {
            if (this.lastCorrect) {
                this.lastCorrect = false;
                this.direction = 1;
                this.currentNumber += 1;
            } else {
                this.lastCorrect = true;
            }
        } else {
            this.direction = -1;
            // put a bottom limit on the marker number
            this.currentNumber = this.stepSize === this.currentNumber ? 1 : this.currentNumber - this.stepSize;
        }

        // if there's a direction change, it's a reversal
        if (lastDirection != this.direction) {
	    this.reversals.push(this.currentNumber);
        } else {
	    this.reversals.push(0);
	}

        if (removeElement(this.reversals,0).length == 7) {
            this.score = avg(removeElement(this.reversals,0)).toFixed(3);
            this.isDone = true;
        }

        this.lastNumber = this.currentNumber;
    }
}

fixedDoseAssessment.prototype = new Assessment;

function superAssessment(type, gender, age) {
    var _self = this;
    this.gender = gender;
    this.age = age;
    this.record = [];
    this.isDone = false;
    this._progress = 0;
    this.score = 0;
    this.currentNumber = 16;

    this.progress = function () {
        return this._progress;
    }

    this.update = function(color, markers) {
        this.record.push(hexMinusOne(this.currentNumber) + markers.indexOf("red") + markers.indexOf(color) + Date.now());

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://mighty-mountain-72591.herokuapp.com/", true);
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr.setRequestHeader('Content-type', 'application/ecmascript');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Pragma", "no-cache");
        xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
        xhr.send(this.record.join(",")+"[SEP]"+this.gender+","+this.age);
        var num;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 || xhr.readyState == "complete") {
                try {
                    _self.currentNumber = parseInt(xhr.responseText.split(",")[0]);
                    _self._progress = parseInt(xhr.responseText.split(",")[1]);
                    if (xhr.responseText == "END") {
                        _self.isDone = true;
                    }
                } catch (e) {
                }

            }
        }
    }
}

superAssessment.prototype = Assessment;
