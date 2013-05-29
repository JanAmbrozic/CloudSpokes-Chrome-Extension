
var baseUrl = "http://www.cloudspokes.com"

function init() {
	
	// get the challenges
	$.ajax({
	    url: baseUrl + '/challenges.json',
	    type: 'GET',
	    success: function(data) {
			$('#tbl-challenges tr');
			console.log(data)
			var html = '';
			for(var i = 0; i < data.length; i++)
				html += '<tr><td><a href="' + baseUrl + '/challenges/' + data[i].challenge_id + '" target="_blank">' + data[i].name + '</a><br><div style="font-size:x-small">' + joinCategories(data[i].platforms) + '</div></td><td>' + formatDay(data[i].days_till_close) + '</td><td>$' + data[i].total_prize_money + '</td></tr>';
			$('#tbl-challenges tr').first().after(html);
	    }
	});
	
  // get the leaderboard
  getLeaderboardData("this_month");
	
	// get payments
	$.ajax({
	    url: baseUrl + '/account/payment-info.json',
	    type: 'GET',
	    success: function(data) {
      var paymentsOwedData = data.outstanding;
      console.log(data)
			$('#tbl-payments tr');
			var html = '';
			for(var i = 0; i < paymentsOwedData.length; i++)
				html += '<tr><td>' + paymentsOwedData[i].name + '</td><td>' + paymentsOwedData[i].challenge.name + '</td><td>' + paymentsOwedData[i].place + '</td><td>$' + Math.floor(paymentsOwedData[i].money) + '</td><td>' + paymentsOwedData[i].reason + '</td><td>' + paymentsOwedData[i].status + '</td></tr>';
			$('#tbl-payments tr').first().after(html);

        var paymentsPaidData = data.paid;
        $('#tbl-payments-payed tr');
        var html = '';
        for(var i = 0; i < paymentsPaidData.length; i++)
          html += '<tr><td>' + paymentsPaidData[i].name + '</td><td>' + paymentsPaidData[i].challenge.name + '</td><td>' + paymentsPaidData[i].place + '</td><td>$' + Math.floor(paymentsPaidData[i].money) + '</td><td>' + paymentsPaidData[i].reason + '</td><td>' + paymentsPaidData[i].status + '</td><td>' + paymentsPaidData[i].reference_number + '</td></tr>';
        $('#tbl-payments-payed tr').first().after(html);
	    }
	});

	document.body.style.width = "600px";
	toggle('challenges');
	
}

//getLeadearboardData gets the leaderboard data for specific time 
//possible parameters are: all_time, this_year, this_month
function getLeaderboardData(leaderboardType)
{
  // get the leaderboard
  $.ajax({
      url: baseUrl + '/leaderboard.json',
      type: 'GET',
      success: function(data) {
      console.log(data)
      data = data[leaderboardType];
      $('#tbl-leaderboard tr');
      $('#tbl-leaderboard tr').nextAll().remove();
      var html = '';
      for(var i = 0; i < data.length; i++)
        html += '<tr><td width="10">' + data[i].rank + '</td><td width="55"><img src="' + data[i].profile_pic + '" width="50"></td><td><a href="' + baseUrl + '/members/' + data[i].username + '" target="_blank">' + data[i].username + '</a><br><div style="font-size:x-small">' + data[i].country + '</div></td><td>$' + Math.floor(data[i].total_money) + '</td></tr>';
      $('#tbl-leaderboard tr').first().after(html);
      }
  });
}

function formatDay(days) {
	if (days == 0) {
		return " today!";
	} else if (days == 1) {
		return " 1 day";
	} else {
		return days + " days";
	}		
}

function joinCategories(categories) {
	var joined = "";
	var counter = 0;
	for(var i = 0; i < categories.records.length; i++) {
		joined = joined + categories.records[i].name
		if (counter < categories.records.length-1)
			joined = joined + ', ';
		counter++;
	}
	return joined;
}

function toggle(section) {
	
	// hide everything
	if (section == "challenges") {
		showChallenges();
		hideLeaderboard();
		hidePayments();
		document.body.style.width = "600px";
	} else if (section == "leaderboard") {
		showLeaderboard();
		hideChallenges();
		hidePayments();
		document.body.style.width = "600px";
	} else if (section == "payments") {
		showPayments();
		hideChallenges();
		hideLeaderboard();
		document.body.style.width = "800px";
	}
	
}

function hideChallenges() {
	document.getElementById("challenges").style.display = "none";
	document.getElementById("challenges").style.visibility = "hidden";
}

function showChallenges() {
	document.getElementById("challenges").style.display = "block";
	document.getElementById("challenges").style.visibility = "visible";
}

function hideLeaderboard() {
	document.getElementById("leaderboard").style.display = "none";
	document.getElementById("leaderboard").style.visibility = "hidden";
}

function showLeaderboard() {
	document.getElementById("leaderboard").style.display = "block";
	document.getElementById("leaderboard").style.visibility = "visible";
}	

function hidePayments() {
	document.getElementById("payments").style.display = "none";
	document.getElementById("payments").style.visibility = "hidden";
}

function showPayments() {
	document.getElementById("payments").style.display = "block";
	document.getElementById("payments").style.visibility = "visible";
}

function openWin(page) {
	gotoUrl = baseUrl + '/' + page;
	window.open(gotoUrl);
}

$(document).ready(function() {
  init();

  $("#menuItemChallenges").click(function() {
    toggle('challenges');
  });

  $("#menuItemLeaderboard").click(function() {
    toggle('leaderboard');
  });

  $("#menuItemPayments").click(function() {
    toggle('payments');
  });

  $("#recCompletedButton").click(function() {
    openWin('challenges/recent');
  });

  $("#thisMonthButton").click(function() {
    getLeaderboardData("this_month");
  });

  $("#thisYearButton").click(function() {
    getLeaderboardData("this_year");
  });

  $("#allTimeButton").click(function() {
    getLeaderboardData("all_time");
  });

});


