function newTest() {
    // ensure there are doses for constant stimuli
    if (localStorage.getItem("test") === null) {
        myApp.alert("You don't have any test set up yet! Go to Settings and set one.", "Osmi");
    }
    
    if (JSON.parse(localStorage.getItem("test")).doses === []) {
        myApp.alert("No dilutions selected for constant stimuli. You can change this in Settings.", "Osmi");
    }

     else {
          localStorage.setItem('subjectInfo', JSON.stringify({id:document.getElementById("id").value, gender:document.getElementById("gender").value, age:document.getElementById("age").value}));
          window.location.href = "test.html";
     }
}
