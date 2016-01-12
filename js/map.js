$(function() {
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(45.248499, 5.827002), // St Ismier
		styles: [{
			featureType: "poi",
			elementType: "labels",
			stylers: [
				  { visibility: "off" }
			]
		}],
	};
	
	var infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});
	
	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//Retrieve markers and place them on map
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "data.json",
		dataType: 'json',
		success: function (markersData) {
			$.each(markersData, function(index, data) {
				myLatlng = new google.maps.LatLng(data["lat"], data["long"]);

				marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: data['titre'],
					html: 
							'<div class="markerPop">' +
							'<h1>' + data['titre'] + '</h1>' +
							'<h2>' + data['adresse'] + '</h2>' +
							'<p>' + data['description'] + '</p>' +
							'</div>'
				});

				google.maps.event.addListener(marker, 'click', function () {
					infowindow.setContent(this.html);
					infowindow.open(map, this);
				});
			});
		},
		error: function(o, name, desc) {
			console.log("Error loading markers: ");
			console.log(name);
			console.log(desc);
		}
	});
});

