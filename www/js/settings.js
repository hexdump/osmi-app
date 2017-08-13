var mode = 0;

function setMode() {
    doses = []
    var options;
    switch (mode) {

    case 3:
	localStorage.setItem("test", JSON.stringify({
	    type:2
	}));
	break;
    case 2:
        localStorage.setItem("test", JSON.stringify({
            type: 1,
        }));
        break;
    case 1:
        options = {
            type: 0,
            doses: [],
            random: true
        };
        for (var i = 1; i < 17; i++) {
            if (document.getElementById(String(i)).checked) {
                options.doses.push(i);
            }
        }
        break;
    case 0:
        options = {
            type: 0,
            doses: [],
            random: false
        };
        for (var i = 1; i < 17; i++) {
            if (document.getElementById(String(i)).checked) {
                options.doses.push(i);
            }
        }
    }
    if (options != null) {
        window.localStorage.setItem("test", JSON.stringify(options))
        updateSettingsInfo();
    }

    if (document.getElementById("csv-separator").value === "tabs") {
		localStorage.setItem("use-tabs", true);
    }
    else {
	localStorage.setItem("use-tabs", false);
    }
    
    localStorage.setItem("dont-show-marker-indices", document.getElementById("dont-show-marker-indices").checked);

}

mode = 0;

function updateForm() {
    mode = parseInt(document.getElementById("testtype").value);
    switch (mode) {
    case 0:
        document.getElementById('fixed-only').style.display = '';
        break;
    case 1:
        document.getElementById('fixed-only').style.display = '';
        break;
    case 2:
        document.getElementById('fixed-only').style.display = 'none';
        break;
    case 3:
	document.getElementById('fixed-only').style.display = 'none';
	break;
    }
    setMode();
    updateSettingsInfo();
}
// update doses
