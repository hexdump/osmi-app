function clearResults() {
    if (confirm("Are you sure you want to delete ALL test data?")) {
        window.localStorage.removeItem("data");
        location.reload();
    }
}

function downloadData(filename, text) {

  if(onMobileDevice()) {
		
	
	  var fileTransfer = new FileTransfer();
	  var uri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
	  var fileURL = "cdvfile://localhost/persistent/" + filename;
	  fileTransfer.download(
	              uri,
	              fileURL,
	              function(entry) {
	                 window.plugins.socialsharing.share(null, null, entry.toURL(), null);
	              },
	              function(error) {
	                  console.log("download error source " + error.source);
	                  console.log("download error target " + error.target);
	                  console.log("upload error code" + error.code);
	              },
	              false,
	              {
	                  headers: {
	                      "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
	                  }
	              }
	   );
  }
    else {
	desktopDownloadText(filename, text);
    }
}

function makecsv() {
    // return results as CSV
    results = JSON.parse(window.localStorage.getItem("data"));
    if (localStorage.getItem("use-tabs") == "true") {
	separator = "\t";
    }
    else {
	separator = ",";
    }
    
    csv     = "id,testType,score,gender,age\n".replace(/,/g, separator);

    for (var i = 0; i < results.length; i++) {
        for (var propertyName in results[i]) {
            csv += String(results[i][propertyName]) + separator
        }
        csv += "\n"
    }

    return csv;
}

function updateResults() {
    if (window.localStorage.getItem("data") === null) {
	document.getElementById("accordion-list").remove()
    }    
    else {    
	data = JSON.parse(window.localStorage.getItem("data"));
	for (var i = 0; i < data.length; i++) {
            document.getElementById("accordion-list").innerHTML += `
<li class="accordion-item">
  <div class="accordion-item-toggle">
     <a href="#" class="item-content item-link">
        <div class="item-inner">
           <div class="item-title">${data[i].id}</div>
           <div class="accordion-item-content">
           <div class="content-block"><b>Test Type:<b/> ${data[i].testType}<br />
                           <b>Gender:<b/> ${data[i].gender}<br />
                           <b>Age:<b/> ${data[i].age}<br />
                           <b>Score:<b/> ${data[i].score}
           </div>
  </div>
</div>
</li>`
	}
    }
}

function onMobileDevice() {
    //
    // return true if we're on a mobile device (and have contextual sharing capabilities); false if we're on a desktop
    //
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	return true;
    }
    else {
	return false;
    }
}

function desktopDownloadText(filename, text) {
  //
  // create a file download (will appear the same as a file fetched from a server) from text
  //
    
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
    
  document.body.removeChild(element);
}
