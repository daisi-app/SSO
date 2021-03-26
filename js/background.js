function haveAImportantEventToday(jour, mois)
{
	var result = false;
	var iDate = [{
					"day": 14,
					"month": 2,
					"picture": "birthday"
				},{
					"day": 16,
					"month": 6,
					"picture": "birthday"
				},{
					"day": 31,
					"month": 10,
					"picture": "halloween"
				},{
					"day": 23,
					"month": 12,
					"picture": "noel"
				},{
					"day": 24,
					"month": 12,
					"picture": "noel"
				}];

	// Search after a important event
	$.each(iDate, function(key, value)
	{
		if(jour == value.day && mois == value.month)
			result = value.picture;
	});
	
	return result;
}

function generateRamdonPicture(type)
{
	var minBg = 1;
    var maxDayPict = 8;
	var maxNightPict = 2;
	var maxSunrisePict = 2;
	var maxSunsetPict = 5;
	var result;
	
	// Choose a picture in the directory
	switch(type)
	{
		case "day":
			result = minBg + Math.floor(Math.random() * maxDayPict);
		break;
		
		case "night":
			result = minBg + Math.floor(Math.random() * maxNightPict);
		break;
		
		case "sunrise":
			result = minBg + Math.floor(Math.random() * maxSunrisePict);
		break;
		
		case "sunset":
			result = minBg + Math.floor(Math.random() * maxSunsetPict);
		break;
		
		default:
			result = 1;
		break;
	}
	
	return result;
}

function generateTypePicture(now)
{
	// Get the hours to choose the good directory
	var heure = now.getHours();
	var minute = now.getMinutes();
	var result;
	
	// Choose the good directory
	if((heure >= 18 && minute >= 0) && (heure <= 20 && minute <= 59))
		result = 'sunset';
	else if((heure >= 21 && minute >= 0) && (heure <= 5 && minute <= 59))
		result = 'night';
	else if((heure >= 6 && minute >= 0) && (heure <= 7 && minute <= 59))
		result = 'sunrise';
	else
		result = 'day';
	
	return result;
}

$(document).ready(function()
{
	// Get the date
	var now = new Date();
	var jour = now.getDate();
	var mois = now.getMonth() + 1;
	
	// Var to set the URL picture
	var picture;
	var type;
	var pictureUrl;

	// Check if there is an important event today
	var eventToday = haveAImportantEventToday(jour, mois);
	
	if(eventToday)
	{
		type = "specialEvents";
		picture = eventToday;
	}
	else
	{
		type = generateTypePicture(now);
		picture = generateRamdonPicture(type);
	}
	
	// Set the url and the css property
	pictureUrl = 'url("images/' + type + '/' + picture + '.jpg")';
	$('body').css('background-image', pictureUrl);
}); 