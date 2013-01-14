//Types category wise
var types_cat=[
	{
		name:"Daily",
		type:['atm','bank','establishment','general_contractor','grocery_or_supermarket','gym','hair_care','laundry']
	},
	{
		name:"Eatery",
		type:['bakery','bar','cafe','food','meal_delivery','meal_takeaway','restaurant']
	},
	{
		name:"Emergency",
		type:['fire_station','gas_station','hospital','police']
	},
	{
		name:"Entertainment",
		type:['amusement_park','aquarium','bowling_alley','casino','movie_theater','night_club','park','shopping_mall','stadium']
	},
	{
		name:"Health",
		type:['dentist','doctor','health','pharmacy','physiotherapist']
	},
	{
		name:"Misc",
		type:['art_gallery','campground','cemetery','city_hall','courthouse','embassy','funeral_home','library','local_government_office','museum','parking','post_office','rv_park','school','storage']
	},
	{
		name:"Services",
		type:['accounting','beauty_salon','car_dealer','electrician','electronics_store','finance','florist','funeral_home','hair_care','insurance_agency','laundry','lawyer','locksmith','lodging','movie_rental','moving_company','painter','plumber','real_estate_agency','roofing_contractor','spa','travel_agency']
	},
	{
		name:"Stores",
		type:['bicycle_store','book_store','clothing_store','convenience_store','department_store','electronics_store','establishment','furniture_store','hardware_store','home_goods_store','jewelry_store','liquor_store','pet_store','shoe_store','store']
	},
	{
		name:"Transportation",
		type:['airport','bus_station','car_dealer','car_rental','subway_station','taxi_stand','train_station']
	},
	{
		name:"Worship",
		type:['church','hindu_temple','mosque','place_of_worship','synagogue']
	}
];

//Under Category Radio Button
//To create Category Button and checkbox of these category

//To create check and uncheck button
var check_uncheck='<div class="row-fluid"><div class="span12">';
check_uncheck+='<div class="span1"><input class="btn btn-small btn-info checkall" type="submit" name="checkall" value="Check All"></div>';
check_uncheck+=	'<div class="span1"><input class="btn btn-small btn-info uncheckall" type="submit" name="uncheckall" value="Uncheck All"></div>';
check_uncheck+=	'</div></div>';

//To create types checkbox
var types_data="";
var types_button='<div id="types_button" style="display:none" class="row-fluid"><div class="span12">';
//Loop through each category
for(x in types_cat){
	
	//Grab category name
	name_div=types_cat[x].name;
	//To garb array of types of place under a category
	type_default=types_cat[x].type;
	
	var place_type="";
	var data_int="";
	var y=1;
	
	//Sort types of place array
	type_default=type_default.sort(); 
	for(x in type_default){

		/*
		  * To remove '_' from type of place and chnage a leter to capital
		  * For e.g if type is grocery_or_supermarket.Split is using _ as dilimter to get array containing [grocery,or,supermarket]
		  * then loop through each element of array and grab 1st letter and make it uppercase and concate it back to remaining string.
		  * Then use join() to get back whole string from array.
		*/
		value=type_default[x];
		name=type_default[x];
		name_arr=name.split("_");
		for(z in name_arr){
			name_arr[z]=name_arr[z].charAt(0).toUpperCase() + name_arr[z].slice(1);
		}
		name=name_arr.join(" ");
		
		/*
		 * As in Bootstarp we can have max of 12 span in row,hence following code add new row code after 12th span
		 * */
		if(x%12!=0){
			place_type=place_type+'<div class="span1"><label class="checkbox inline"><input type="checkbox" name="types" value="'+value+'">'+name+'</label></div>';
			
		}else{
			if(x==0)
				place_type=place_type+'<div class="row-fluid"><div class="span12"><div class="span1"><label class="checkbox inline"><input type="checkbox" name="types" value="'+value+'">'+name+'</label></div>';
			else
				place_type=place_type+'</div></div><div class="row-fluid"><div class="span12"><div class="span1"><label class="checkbox inline"><input type="checkbox" name="types" value="'+value+'">'+name+'</label></div>';
		}
		if(x==type_default.length-1)
				place_type=place_type+'</div></div>';
	}
	//Adding check_uncheck and type of places to a string
	types_data+='<div style="display:none" id="'+name_div+'">'+check_uncheck+place_type+'</div>';
	//To Create Category Button
	types_button+='<div class="span1"><input class="btn btn-small btn-danger" type="submit" value="'+name_div+'"></div>';
}
types_button+='</div></div>';

//Radio Button (Search and Choose)
var radio_button='<div class="row-fluid">';
radio_button+='<div class="span1"><label class="radio"><input type="radio" name="optionsRadios" value="s">Search</label></div>';
radio_button+='<div class="span1"><label class="radio"><input type="radio" name="optionsRadios" value="c">Choose</label></div>';
radio_button+='</div>';

//Search Div
//To create Clear,Checkall,Uncheckall button,Type Search Text bar,Div to display type suggestion,Div to add category
var sh_div='<div style="display:none" id="search"><div class="row-fluid">';
sh_div+='<div class="span3"><input type="text" class="input-large" id="search_type" placeholder="Search Type"></div>';
sh_div+='<div class="span1"><input class="btn btn-small btn-info" type="submit" id="clear" name="clear" value="Clear"></div>';
sh_div+='<div class="span1"><input class="btn btn-small btn-info" type="submit" id="checkall-search" name="checkall" value="Checkall"></div>';
sh_div+='<div class="span1"><input class="btn btn-small btn-info" type="submit" id="uncheckall-search" name="uncheckall" value="Uncheckall"></div>';
sh_div+='</div>';
sh_div+='<div class="row-fluid"><div id="search_type_display" class="search_type span3"></div><div class="search_type span9" id="search_type_choose"></div>';
sh_div+='</div></div>';
sh_div+='</div>';

//Adding all data i.e Search and Choose to types_div
types_div_content=radio_button+types_button+'<div id="types">'+types_data+'</div>'+sh_div;
$('#types_div').html(types_div_content);

/*
 * When user choose search radio button
 * Following code suggest type as user type in Search Type text box
 * */
 
//Array containg all type supported by Google Places Api
var types_all=['shopping_mall','art_gallery','campground','cemetery','city_hall','courthouse','embassy','funeral_home','library','local_government_office','museum','parking','post_office','rv_park','school','storage','atm','bank','establishment','general_contractor','grocery_or_supermarket','gym','hair_care','laundry','fire_station','gas_station','hospital','police','amusement_park','aquarium','bowling_alley','casino','movie_theater','night_club','park','stadium','dentist','doctor','health','pharmacy','physiotherapist','accounting','beauty_salon','car_dealer','electrician','electronics_store','finance','florist','funeral_home','hair_care','insurance_agency','laundry','lawyer','locksmith','lodging','movie_rental','moving_company','painter','plumber','real_estate_agency','roofing_contractor','spa','travel_agency','bicycle_store','book_store','clothing_store','convenience_store','department_store','electronics_store','establishment','furniture_store','hardware_store','home_goods_store','jewelry_store','liquor_store','pet_store','shoe_store','store','airport','bus_station','car_dealer','car_rental','subway_station','taxi_stand','train_station','church','hindu_temple','mosque','place_of_worship','synagogue','bakery','bar','cafe','food','meal_delivery','meal_takeaway','restaurant'];
var types_all_temp=types_all.sort();

//As user type in search type input display him suggestion
$('#search_type').on("keyup",function(){
	//Text area where suggestions will be generated
	txt_area_data='<div class="row-fluid">';
	//Grab what user types in Search text box
	val=$(this).val();
	for(x in types_all_temp){
		sub_str=types_all_temp[x].substr(0,val.length);
		if(val.toUpperCase()==sub_str.toUpperCase()){
			//Converting 1st letter to Uppercase
			name_arr=types_all_temp[x].split("_");
			for(z in name_arr){
				name_arr[z]=name_arr[z].charAt(0).toUpperCase() + name_arr[z].slice(1);
			}
			name=name_arr.join(" ");
			
			//Add matching types so as to display them in text area
			txt_area_data+='<div class="span10"><button name="'+types_all_temp[x]+'" class="btn btn-mini" type="button">'+name+'</button></div>';
		}
	}
	txt_area_data+='</div>';
	$('#search_type_display').html(txt_area_data);
});

//When user click on any type in Suggestion Text Box,remove it from text area,types array and paste it in type selection div
$('#search_type_display').on('click','button',function(){
	button=$(this);
	value=button.attr('name');
	name=button.text();
	chk_bx='<div class="span2"><label class="checkbox inline"><input type="checkbox" name="types" value="'+value+'" checked>'+name+'</label></div>';
	//paste clciked type in selection div
	$('#search_type_choose').append(chk_bx);
	
	//remove this label from text area nad types array
	button.parent('div').remove();
	index=types_all_temp.indexOf(value);
	types_all_temp.splice(index,1);
});

//Clear button action
//Remove all type from Choose div and add those types back in types_all array and clear search text box.
$('#clear').on('click',function(){
	var chk_box_arr=$('#search_type_choose').find('input:checkbox');
	//add types [those were present in choose div] back in types_all array
	chk_box_arr.each(function(){
		types_all_temp.push($(this).attr('value'));
	});
	types_all_temp.sort();
	
	//clear search text box and fire keyup action which will display all types in suggestion text box
	$('#search_type').val("");
	$('#search_type').keyup();
	//Remove all type from Choose div 
	$('#search_type_choose').html("");
})

//CheckAll and Uncheck All for search options
$('#checkall-search').on('click',function(){
	$('#search_type_choose').find("input:checkbox").attr('checked', true);
});
$('#uncheckall-search').on('click',function(){
	$('#search_type_choose').find("input:checkbox").attr('checked', false);
});

//To enlarge image when they are clicked from info window
function enlargeImage(obj){
	console.log(obj.src);
}

//When Current location's check box is checked then location text box should be disabled
$('#cl').change(function(){
	if($(this).is(':checked')){
		$('#location').attr('readonly','readonly');
	}else{
		$('#location').removeAttr('readonly');
	}
});

//Check which Radio button is checked and acc load either search form or category
$('input[type=radio]').change(function(){
	checked_radio=$(this);
	if(checked_radio.attr('value')=='s'){
		$('#search').show('slow');
		$('#types_button').hide("slow");
		$('#types').find('input:checkbox').attr('checked', false);
	}
	if(checked_radio.attr('value')=='c'){
		//checked_radio.parents('div[class="row-fluid"]').hide("slow");
		$('#types_button').show("slow");
		$('#search').hide('slow');
		$('#search_type_choose').find("input:checkbox").attr('checked', false);
	}
});

//Check all and Uncheck all types for choose radio button
$('.checkall').on('click',function(){
	//console.log($(this).parents('div[class="row-fluid"]').siblings('div'));
	$(this).parents('div[class="row-fluid"]').siblings('div').find("input:checkbox").attr('checked', true);
	//$('#types input:checkbox').attr('checked', true);
});

$('.uncheckall').on('click',function(){
	$(this).parents('div[class="row-fluid"]').siblings('div').find("input:checkbox").attr('checked', false);
});

//Hide and Unhide types when clciked on Types button
$('#type').on('click',function(){
	var types_div=$('#types_div');
	if(types_div.css('display')=='block'){
		types_div.hide("slow");
	}else{
		types_div.show("slow");
		//types_div.children('div').hide("slow");
		types_div.children('div').eq(0).show("slow");;
	}
});

//When user click on + icon on sidebar display extra info like phone,address and change icon to minus
//When user click on minus icon hide extra info and chnage icon to +
$("#sidebar").on("click","i",function(){
	i=$(this);
	className=i.attr("class");
	
	if(className=="icon-plus"){
		//Hide info of other places and add plus icon to all
		$('#sidebar i').attr('class','icon-plus');
		$("#sidebar").children('div').hide("slow");
		
		//change icon to minus.only of clicked place
		i.attr("class","icon-minus");
		//display extra info like phone,address
		i.eq(0).next().show("slow");
	}
	if(className=="icon-minus"){
		//change icon to plus
		i.attr("class","icon-plus");
		//hide extra info like phone,address
		i.eq(0).next().hide("slow");
	}
});
//When user click on a category,make that category button color green and hide other category
$('#types_div').children('.row-fluid').on("click","input",function(){
	//hide other category
	$('#types_div').children('.row-fluid').find('input').attr('class','btn btn-small btn-danger');
	$('#types').children('div').hide("slow");
	
	var input=$(this);
	div_name=input.attr('value');
	div_obj=$('#'+div_name);
	if(div_obj.css('display')=='none'){
		div_obj.toggle("slow");
		//make clicked category button color green
		input.attr("class","btn btn-small btn-success");
	}
});


var map;
var infowindow;
// arrays to hold copies of the markers and html used by the side_bar
var gmarkers = [];

var geocoder;
var autocomplete;
var lat_default=28.6328223;
var lng_default=77.3602056;
var type_default=new Array();//if send blank array to types in request variable then all type on map will be drawn

//For checking,whatever map is laoded or not
var maploaded = false
var maploadTimer = 0

function initialize() {
	//fire the 'loading' message
	checkGoogleMap();
	
	//Default
	var pyrmont = new google.maps.LatLng(lat_default, lng_default);
	// prepare Geocoder
	geocoder = new google.maps.Geocoder();
	//Initialize map
	map = new google.maps.Map(document.getElementById('map'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: pyrmont,
		zoom: 15
	});
	
	//add the 'loaded' listener
	google.maps.event.addListener(map, 'tilesloaded', function(){
		maploaded = true
	});
	
	//Create info window which will be displayed when click on marker
	infowindow = new google.maps.InfoWindow();

	//Add google auto complete option
	var input = document.getElementById('location');
	var autocomplete = new google.maps.places.Autocomplete(input);
	//Bound autocomplete to map object
	autocomplete.bindTo('bounds', map);

	//Create googgle map Placeservice object to search nearby places
	var service = new google.maps.places.PlacesService(map);
	var request = {
		location: pyrmont,
		radius: 1000,
		types: type_default
	};
	service.nearbySearch(request, callback);
}
	

  
function find(){ 
	$('#types_div').hide("slow");
	//Initailze by clearing marker array and sidebar    
	document.getElementById("sidebar").innerHTML="";
	if(gmarkers.length>0){
		gmarkers=[];
	}
	//Fetch location,radius,type from html page
	var loc = document.getElementById('location').value;
	var rds = document.getElementById('radius').value;
	var cl = document.getElementById('cl').checked;
	var lat;
	var lng;
	var type=new Array();
	//Putting all checked type in 'type' array which will be used by 'nearbyplaces' function.
	$('#types_div input[type="checkbox"]:checked').each(function(i){
		type[i]=$(this).attr('value');
	});
	console.log(type);
	//If current location's check box is checked
	if(cl){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				lat=position.coords.latitude;
				lng=position.coords.longitude;
				nearbyPlaces(lat,lng,rds,type);
			} ,function(error){
			switch(error.code)
			{
				case error.PERMISSION_DENIED:
					lat=lat_default;
					lng=lng_default;
					nearbyPlaces(lat,lng,rds,type);
				break;
				case error.POSITION_UNAVAILABLE:
					alert("Location information is unavailable.");
				break;
				case error.TIMEOUT:
					alert("The request to get user location timed out.");
				break;
				case error.UNKNOWN_ERROR:
					alert("An unknown error occurred.")
				break;
			}
			},{maximumAge:10000,timeout:10000,enableHighAccuracy:true});
		}else{
			alert("Geolocation is not supported by this browser.");
			return;
		}
	}else{
		
		//Call geocode function to convert address into lat long
		if(loc!=""){
			geocoder.geocode( { 'address': loc}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//Lat/long of location
					lat=results[0].geometry.location.lat();
					lng=results[0].geometry.location.lng();
					nearbyPlaces(lat,lng,rds,type);
				}
			});
		}else{
			//$("#location").attr("placeholder","Location Please!!");
			lat=lat_default;
			lng=lng_default;
			nearbyPlaces(lat,lng,rds,type);
		}
	}
}
	 
function nearbyPlaces(lat,lng,rds,type){
	//For checking,whatever map is laoded or not
	maploaded = false
	maploadTimer = 0
	checkGoogleMap();
	
	if(typeof lat=='undefined'){
		console.log("Undefined Cordinates");
	}else{
		pyrmont = new google.maps.LatLng(lat,lng);
		map = new google.maps.Map(document.getElementById('map'), {
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
		  center: pyrmont,
		  zoom: 15
		});
	
		request = {
		  location: pyrmont,
		  radius: rds,
		  types: type
		};
		
		//add the 'loaded' listener
		google.maps.event.addListener(map, 'tilesloaded', function(){
			maploaded = true
		});
		
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, callback);
	}
}
function callback(results,status,pagination) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		//If status is ok,parse each place via for loop
		for (var i = 0; i < results.length; i++) {
			//Grab reference id of each place which will be used by request
			ref=results[i].reference;
			var requestD = {
				reference:ref
			};
			//Pass request array in getDetails function to get more details of a place like phone number,address etc.
			service = new google.maps.places.PlacesService(map);
			service.getDetails(requestD, function(placeD, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					createMarker(placeD,gmarkers);
				}
			});
		}
		//The Google documentation states to wait 2 seconds between next page calls, hence used sleep.
		//The pagination.nextPage() calls the same callback, in this case callback().
		if (pagination.hasNextPage) {
			var moreButton = document.getElementById('more');
			moreButton.disabled = false;
			
			google.maps.event.addDomListenerOnce(moreButton, 'click',function() {
				sleep:2;
				moreButton.disabled = true;
				pagination.nextPage();
			});
		}
	}else{
		return;
	}
}
function createMarker(place,gmarkers) {
	var linkContent="";
	var photos = place.photos;
	var placeLoc = place.geometry.location;

	//Find type of place and add icon image
	//Please put lowercased text in icon_arr and try add element in chronical order
	var image="";
	var icon_arr=['airport','art','atm','bank','bar','bus','cafe','casino','club','car','doctor','food','grocery','hospital','lodging','mall','movie','pharmacy','police','post','real','restaurant','school','stadium','store','train','university','zoo'];
	types_str=place.types.join();
	types_str=types_str.toLowerCase();
	console.log(types_str);
	for(x in icon_arr){
		icon_name=icon_arr[x];
		if(types_str.search(icon_name)>-1){
			image="icons/"+icon_name+".png";
			break;
		}
	}
	if(image=="")
		image="icons/star.png";


	if(typeof image!='undefined'){	
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			title:place.name,
			icon:image
		});
	}
	
	function div_structure(metadata,value){
		return '<div class="row-fluid"><div class="span3">'+metadata+'</div><div class="span9">'+value+'</div></div>';
	}
	
	if(typeof place.formatted_address!='undefined'){
		metadata="<b>Address</b>";
		value=place.formatted_address;
		linkContent+=div_structure(metadata,value);
	}
	if(typeof place.formatted_phone_number!='undefined'){
		metadata="<b>Number</b>";
		value=place.formatted_phone_number;
		linkContent+=div_structure(metadata,value);
	}
	if(typeof place.rating!='undefined'){
		metadata="<b>Rating</b>";
		value=place.rating;
		linkContent+=div_structure(metadata,value);
	}
	
	
	google.maps.event.addListener(marker, 'click', function() {
		var snap;
		var placeContent="";
		if(typeof place.name!='undefined')
			placeContent=placeContent+place.name+'<br/>';
		if(typeof place.formatted_address!='undefined'){
			placeContent=placeContent+place.formatted_address+'<br/>';
		}
		if(typeof place.formatted_phone_number!='undefined'){
			placeContent=placeContent+place.formatted_phone_number+'<br/>';
		}
		if(typeof place.photos!='undefined'){
			snap='';
			for(x in place.photos){
				snap=snap+'<image onclick ="enlargeImage(this)" src='+photos[x].getUrl({'maxWidth': 35, 'maxHeight': 35})+'> ';
			}
		placeContent=placeContent+snap+'<br/>';
		}

		infowindow.setContent(placeContent);
		infowindow.open(map, this);

	});

	// save the info we need to use later for the side_bar
	gmarkers.push(marker);
	document.getElementById("sidebar").innerHTML += '<a href="javascript:myclick(' + (gmarkers.length-1) + ')">' + place.name + '<\/a><i class="icon-plus"></i><div style="display:none">'+linkContent+'</div><br>';
}

// This function picks up the click action from sidebar and opens the corresponding info window in map
function myclick(i) {
	google.maps.event.trigger(gmarkers[i], "click");
}

function checkGoogleMap() {
	//increment the timer every second
	maploadTimer = maploadTimer + 1
	
	//specify the target element for our messages
	var msg = document.getElementById('msg')
	
	if (maploaded == false) {
		//if we dont have a fully loaded map - show the message
		$("#msgContainer").slideDown("fast")
		//for the first 5 tries, show this message
		if (maploadTimer < 10) {
		msg.innerHTML = 'Loading...';
		}
		//loop it
		setTimeout('checkGoogleMap()',1000);
	} else {
		//otherwise, show 'loaded' message then hide the message after a second
		msg.innerHTML = 'Map loaded.'
		maploadTimer = 0;
		setTimeout('hideMsg()',1000);
	} 
	//if the timer get up to 20, show a different message
	if (maploadTimer >= 20 && maploadTimer <50 ) {
		msg.innerHTML = 'Your connection is slow!!Loading...';
	}
	//if it gets to 40 show another different message with a reload link (for what its worth!)
	if (maploadTimer >= 50) {
		msg.innerHTML = 'Hmmm, still waiting! You can wait a bit longer or you could try <a href="javascript:initialize()">reloading the map</a>.';
	}
};

function hideMsg() {	
	$("#msgContainer").hide();
}
//Called when body loads
google.maps.event.addDomListener(window, 'load', initialize);
