window.addEventListener('load', function(e) {
	init();
});

function init() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/runs', true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {

			var data = JSON.parse(xhr.responseText);

			var body = document.getElementsByTagName('body')[0];

			for (let i = 0; i < data.length; i++) {

				let div = document.createElement('div');
				body.appendChild(div);

				let p = document.createElement('p');
				p.size = "7";
				p.style = "font-family:verdana;";
				p.textContent = "Run #" + data[i].id + " -- " + "Distance: "
						+ data[i].distance + " -- " + "Duration: "
						+ data[i].duration + " -- " + "Date: " + data[i].date;
				
				div.appendChild(p);

				p.addEventListener('click', function(e){
					
					e.preventDefault();
				
					let uDist = data[i].distance;
					let uDur = data[i].duration;
					
					var createForm = document.createElement('form');
					createForm.setAttribute("name", "updateForm");
					div.appendChild(createForm);

					var heading = document.createElement('h4');
					heading.innerHTML = "Update Run Info ";
					createForm.appendChild(heading);

					var lineBreak = document.createElement('br');
					createForm.appendChild(lineBreak);

					var distanceElement = document.createElement('input');
					distanceElement.setAttribute("type", "text");
					distanceElement.setAttribute("name", "uDistance");
					distanceElement.setAttribute("value", uDist);
					createForm.appendChild(distanceElement);

					var lineBreak = document.createElement('br');
					createForm.appendChild(lineBreak);

					var durationElement = document.createElement('input');
					durationElement.setAttribute("type", "text");
					durationElement.setAttribute("name", "uDuration");
					durationElement.setAttribute("value", uDur);
					createForm.appendChild(durationElement);

					var lineBreak = document.createElement('br');
					createForm.appendChild(lineBreak);

					var dateElement = document.createElement('input');
					dateElement.setAttribute("type", "date");
					dateElement.setAttribute("name", "uDate");
					createForm.appendChild(dateElement);

					var lineBreak = document.createElement('br');
					createForm.appendChild(lineBreak);

					var submitElement = document.createElement('input');
					submitElement.setAttribute("type", "submit");
					submitElement.setAttribute("name", "uSubmit");
					submitElement.setAttribute("value", "Update");
					createForm.appendChild(submitElement);

					div.appendChild(createForm);

					let uDur1 = updateForm.uDuration.value;
					let uDist1 = updateForm.uDistance.value;
					let uDte1 = updateForm.uDate.value;
					document.updateForm.uSubmit.addEventListener('click', updateRun(data[i].id,
							uDist1, uDur1, uDte1));

					var lineBreak = document.createElement('br');
					div.appendChild(lineBreak);

					var createDeleteBtn = document.createElement('button');

					createDeleteBtn.name = "deleteButton";
					createDeleteBtn.innerHTML = "Delete This Run";
					div.appendChild(createDeleteBtn);
					createDeleteBtn.addEventListener('click', deleteRun(data[i].id));
					
				});
			}
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
		
		xhr.send(null);

		document.runLogForm.submit.addEventListener('click', createRun(runLogForm.duration.value, runLogForm.distance.value, runLogForm.date.value, e))
							
	}
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

	return errorArray;
}

function deleteRun(runId, e){

	e.preventDefault();

	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', 'api/runs/' + runId);

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

}

function updateRun(runId, distance, duration, date, e) {

	e.preventDefault();

	var data = {};
	data.distance = distance;
	data.duration = duration;
	data.date = date;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();

	xhr.open('PUT', 'api/runs/' + runId);

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

		xhr.send(json);

	}
}

function createRun(newDist, newDur, newDate, e){

	e.preventDefault();

	var errors = verifyFormData(newDur, newDist, newDate);

	if (errors.length > 0) {
		alert("errors in your input fields.")
		// TODO -- FLESH OUT ERROR MSGS
	}

	if (errors.length === 0) {

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/runs', true);

		xhr.setRequestHeader("Content-type", "application/json");

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status == 200 || xhr.status == 201) {
					var data = JSON.parse(xhr.responseText);
					console.log(data);
					alert("Success! Your new run has been logged.");
					document.runLogForm.reset();
					location.reload();
				} else {
					console.log("POST request failed.");
					console.error(xhr.status + ': ' + xhr.responseText);
				}
			}
		};

		var userObject = {
			distance : newDist,
			duration : newDur,
			date : newDate
		};

		var userObjectJson = JSON.stringify(userObject);

		xhr.send(userObjectJson);
	}
}