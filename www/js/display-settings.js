function updateSettingsInfo() {
    var currentSettings = window.localStorage.getItem("test");
    var settingsString = document.getElementById("settings").innerHTML;
    
    if (currentSettings != null) {
	settingsString  = "Currently, you are set to a {{testType}} assessment{{options}}.";
	currentSettings = JSON.parse(currentSettings);


	var testType = "";
	var options  = "";

	switch(currentSettings.type) {
	case 0:
            testType = "constant stimuli";
            options = " with" + (currentSettings.random ? " randomized" : "") + " doses " + String(currentSettings.doses);
            break;
	case 1:
            testType = "staircase";
            break;
	case 2:
            testType = "server";
            break;
	}

	settingsString = settingsString.replace("{{testType}}",testType).replace("{{options}}",options);
    }

    document.getElementById("settings").innerHTML = settingsString;
}
