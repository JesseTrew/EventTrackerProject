window.addEventListener('load', function(e) {
	init();
});

function init() {

	document.createRunForm.submit.addEventListener('click', function(e){
		
		var newDist = document.createRunForm.distance.value;
		var newDur = document.createRunForm.duration.value;
		var newDate = document.createRunForm.date.value;
		
		var errors = verifyFormData(newDur, newDist, newDate);

		if (errors.length > 0) {
			console.log(errors);
			alert("errors in your input fields.")
			// TODO -- FLESH OUT ERROR MSGS
		}

		if (errors.length === 0) {

			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'api/runs', true);

			xhr.setRequestHeader("Content-type", "application/json");

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status < 400) {
						
					let data1 = JSON.parse(xhr.responseText);
					console.log(data1);
					alert("Success! Your new run has been logged.");
					document.runLogForm.reset();
					location.reload();
					
				} else {
						console.log("POST request failed.");
						console.error(xhr.status + ': ' + xhr.responseText);
				}
			
			};
		
			var runObject = {
					
					distance : newDist,
					duration : newDur,
					date : newDate
					
			};
			
			var runObjectJson = JSON.stringify(runObject);
			xhr.send(runObjectJson);
		}
	});
	
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/runs', true);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {

			var data = JSON.parse(xhr.responseText);
			
			var totalMilesRun = 0;
			
			for (let i = 0; i < data.length; i++) {
				
				totalMilesRun += data[i].distance;
				
				let eventDiv = document.createElement('div');
				document.body.appendChild(eventDiv);

				let eventDivDeleteBtn = document.createElement('div');
				document.body.appendChild(eventDivDeleteBtn);
				
				let eventP = document.createElement('p');
				eventP.size = "7";
				eventP.style = "font-family:verdana;";
				eventP.textContent = "Run #" + data[i].id + " -- "
						+ "Distance: " + data[i].distance + " miles -- "
						+ "Duration: " + data[i].duration + " mins -- " 
						+ "Date: " + data[i].date;

				eventDiv.appendChild(eventP);

				eventP.addEventListener('click', function(e) {

					e.preventDefault();

					let uDist = data[i].distance;
					let uDur = data[i].duration;

					var updateForm = document.createElement('form');
					updateForm.setAttribute("name", "uForm");
					eventDiv.appendChild(updateForm);

					var heading = document.createElement('h4');
					heading.innerHTML = "Update Run Info ";
					updateForm.appendChild(heading);

					var lineBreak = document.createElement('br');
					updateForm.appendChild(lineBreak);

					var distanceInput = document.createElement('input');
					distanceInput.setAttribute("type", "text");
					distanceInput.setAttribute("name", "uDistance");
					distanceInput.setAttribute("value", uDist);
					updateForm.appendChild(distanceInput);

					var lineBreak = document.createElement('br');
					updateForm.appendChild(lineBreak);

					var durationInput = document.createElement('input');
					durationInput.setAttribute("type", "text");
					durationInput.setAttribute("name", "uDuration");
					durationInput.setAttribute("value", uDur);
					updateForm.appendChild(durationInput);

					var lineBreak = document.createElement('br');
					updateForm.appendChild(lineBreak);

					var dateInput = document.createElement('input');
					dateInput.setAttribute("type", "date");
					dateInput.setAttribute("name", "uDate");
					updateForm.appendChild(dateInput);

					var lineBreak = document.createElement('br');
					updateForm.appendChild(lineBreak);
					
					var submitElement = document.createElement('input');
					submitElement.setAttribute("type", "submit");
					submitElement.setAttribute("name", "uSubmit");
					submitElement.setAttribute("value", "Update");
					updateForm.appendChild(submitElement);
					
					var lineBreak = document.createElement('br');
					updateForm.appendChild(lineBreak);
					
					var deleteBtn = document.createElement('button');
					deleteBtn.setAttribute("id", "delBtn");
					deleteBtn.innerHTML = "Delete This Run";
					eventDiv.appendChild(deleteBtn);

				    document.getElementById("delBtn").addEventListener("click", function(e){ 
				    	
						e.preventDefault();
						
						console.log(data[i].id);
				    	
				    	var xhr = new XMLHttpRequest();

				    	xhr.open('DELETE', 'api/run/' + data[i].id);

				    	xhr.setRequestHeader("Content-type", "application/json");

				    	xhr.onreadystatechange = function() {

				    		if (xhr.readyState === 4 && xhr.status < 400) {
				    			alert("Success! Your run has been deleted.");
				    			location.reload();
				    		}

				    		if (xhr.readyState === 4 && xhr.status >= 400) {
				    			console.error(xhr.status + ': ' + xhr.responseText);
				    			alert("Failed! There has been a problem deleting run. Please try again.");
				    		}
				    	};

				    	xhr.send();
				    });

					var line = document.createElement('hr');
					eventDiv.appendChild(line);
					
					submitElement.addEventListener('click', function(e){

						e.preventDefault();

						var xhr = new XMLHttpRequest();
						
						xhr.open('PUT', 'api/runs/' + data[i].id, true);
						
						xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
						
						xhr.onreadystatechange = function() {

							if (xhr.readyState === 4 && xhr.status < 400) {
								alert("Success! Your run has been updated.");
								location.reload();
							}

							if (xhr.readyState === 4 && xhr.status >= 400) {
								console.error(xhr.status + ': ' + xhr.responseText);
								alert("Failed! There has been a problem updating this run. Please try again.");
							}
							
						};
						
						var dataObject = {
								
								distance: document.uForm.uDistance.value,
								duration: document.uForm.uDuration.value,
								date: document.uForm.uDate.value
								
						};
						
						var json = JSON.stringify(dataObject);
						xhr.send(json);
					});
					
				});
			}
			
			let totalMilesP = document.createElement('p');
			totalMilesP.innerHTML = "Your total miles run: " + totalMilesRun;
			document.body.appendChild(totalMilesP);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

function verifyFormData(duration, distance, date) {

	var errorArray = [];

	if (isNaN(duration)) {
		errorArray.push("Duration field must be numeric.")
	}

	if (duration.length == 0) {
		errorArray.push("Duration field cannot be empty.")
	}

	if (isNaN(distance)) {
		errorArray.push("Distance field must be numeric.")
	}

	if (distance.length == 0) {
		errorArray.push("Distance field cannot be empty.")
	}

	if (date.length == 0) {
		errorArray.push("Date field cannot be empty.")
	}
	console.log(errorArray);
	return errorArray;
	
}