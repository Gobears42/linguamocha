// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery-custom	
//= require jquery_nested_form
//= require timepicker

$(function() {
    
	$(document).on("focus",".skill", function() {
		$.ajax({
		    url: "/allskills",
	        dataType:'json',
	 		type: 'GET',
		    success: function(data){
				$(".skill").autocomplete({
					minLength: 2,
					source: function( request, response ) {
					    	var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
			            	response( $.grep( data, function( item ){
			                	return matcher.test( item );
			            	}) );
			        	}	
			    });
		    },
		    error: function(){
		        alert('error');
		    }
		});
	});
	
	$(document).on("focus",".interest", function() {
		$.ajax({
		    url: "/allskills",
	        dataType:'json',
	 		type: 'GET',
		    success: function(data){
				$(".interest").autocomplete({
					minLength: 2,
					source: function( request, response ) {
					    	var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
			            	response( $.grep( data, function( item ){
			                	return matcher.test( item );
			            	}) );
			        	}	
			    });
		    },
		    error: function(){
		        alert('error');
		    }
		});
	});
	
	$("a.find").on("click", function() {
		var loc = [];
		var names = [];
		var counts = [];
		var urls = [];
		$.ajax({
		    url: "/nearby",
	        dataType:'json',
			data: {'current_location': $("input#find").val()},
	 		type: 'GET',
		    success: function(data){
				$.each(data, function(key, value) {
					loc.push(value.address);
					names.push(value.name);
					counts.push(value.review_count);
					urls.push(value.rating_url);
	        	});
	
				$('div.locations').html('');
				$.each(loc,function(i,o){
					var c = String.fromCharCode(i + 65);
					$('<p>' + c + '</p>').appendTo('div.locations');
					$('<input type="radio" name=location value="' + o + '">' + names[i] +": " + '<br />').appendTo('div.locations');
					$('<p>' + o + '</p><br />').appendTo('div.locations');
					var img = new Image();
					img.src = urls[i]; 
					img.style.height = "15px";
					img.style.width = "90px";
					$(img).appendTo('div.locations');
					$('<p>' + counts[i] + ' reviews</p><br /><br />').appendTo('div.locations');
				});
		    },
		    error: function(){
		        alert('error');
		    }
		});
		
		$.ajax({
		    url: "/mycoordinates",
	        dataType:'json',
			data: {'current_location': $("input#find").val()},
	 		type: 'GET',
		    success: function(data){
				var latitude = data.latitude;
				var longitude = data.longitude;
				var mapOptions = {
				    zoom: 8,
				    center: new google.maps.LatLng(latitude, longitude),
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				}
				var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
						// alert(document.getElementById("map_canvas"));
						
				// var myLatlng = new google.maps.LatLng(latitude,longitude);
				// 
				// var marker = new google.maps.Marker({
				//     position: myLatlng
				// });
				
				// var label = new Label({
				//     map: map
				// 			    });
				// 
				// marker.setMap(map);
				// 
				// label.set('zIndex', 1234);
				// 	            label.bindTo('position', marker, 'position');
				// 	            label.set('text', "A");
		    },
		    error: function(){
		        alert('error');
		    }
		});
		
		$("#yelp").delay(1500).show(0);
		
			
	});
	
	
	$("input#request_date").datepicker();
	$('input#request_start_time').timepicker({ 'step': 15 });
	$('input#request_end_time').timepicker({ 'step': 15 });

});




