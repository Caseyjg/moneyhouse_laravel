$(document).ready(function() {
	
	money; 
	
	$.ajax({
		type: "POST",
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
		url: "/kenoInit",
		success: function(data) {  
			money = data[0]; 
			$("#money").text(money); 
		}
	});
	
	//money = 20; 
	$("#money").text(money); 
	
	mytable = $("<table id='theTable' border='1' width='400' align='center'></table>");
	mytablebody = $('<tbody></tbody>');

	count = 1; 
	selected = []; 
	dealer = []; 
	
	for(row = 0; row < 10; row++) {
		curr_row = $('<tr></tr>');
		curr_row.attr("id", "row" + row);

		for(var col = 0; col < 8; col++) {
			curr_cell = $('<td align="center" style="font-weight:bold"></td>');

			curr_cell.attr("id", count);
		
			curr_text = count;

			curr_cell.append(curr_text);
			curr_row.append(curr_cell);
		  
			count++; 
		}
		
		mytablebody.append(curr_row);
	}
	
	mytable.append(mytablebody);
	mytable.insertBefore($('#theShelf'));
	
	$(document).on('click', '#theTable', function(td) {
			var cell = $(td.target).get(0);
			var id = cell.id;
			
			if(selected.length < 10) {
				var unique = true; 
				for(var i = 0; i < selected.length; i++) {
					if(selected[i] == id) {
						unique = false; 
						break; 
					}
				}
				if(unique && id != 'theTable') {
					selected.push(id); 
					$('#' + id).attr('bgcolor', 'red');
					money = money - 1; 
					$("#money").text(money);
				}
				$("#client").text(selected); 
			}
			else {
				alert("You can only choose 10 balls max!");
			}
	})
	
	$("#run").click(function() {
		if(selected.length > 10 || selected.length == 0) {
			alert("Picks are invalid! See rules.")
		}
		else {
			while(dealer.length < 20) {
				var random = Math.floor(Math.random() * (80) + 1); 
				var unique = true; 
				
				for(var x = 0; x < dealer.length; x++) {
					if(dealer[x] == random) {
						unique = false; 
						break;
					}
				}
				
				if(unique) {
					dealer.push(random); 
				}
			}
			$("#dealer").text(dealer);
			payout(); 
		}
		
		/*if($("#user").val().trim() == "") {
			alert("no user selected"); 
		}
		else {
			$.ajax({
				type: "POST",
				data: {username: $("#user").val()},
				url: "list.php",
				statusCode: {
					400: function() {
						alert("no such user!"); 
					}
				},
				success: function(data) {  
					//var results = JSON.parse(data);
					var results = "[" + data.substring(0, data.length-1) + "]";
					var json = JSON.parse(results); 
					
					//console.log(JSON.parse(results)[0].username); 
					$("#history").text(""); 
					for(var i = 0; i < json.length; i++) {
						var string = "Book ID: " + json[i].bookID + ". Checked out: " + json[0].checkedOutDate + ". Returned: " + results[0].returnedDate; 
						$("#history").append('<br />' + string); 
					}
				}
			});
		}*/
	}); 
	
	function payout() {
		var catches = 0; 
		
		for(var i = 0; i < selected.length; i++) {
			for(var x = 0; x < dealer.length; x++) {
				if(selected[i] == dealer[x]) {
					catches++; 
				}
			}
		}
		
		if(selected.length == 1) {
			if(catches == 1) 
				money += 2; 
		}
		else if(selected.length == 2) {
			if(catches == 2) 
				money += 10; 
		}
		else if(selected.length == 3) {
			if(catches == 3) 
				money += 25; 
			else if(catches == 2)
				money += 2; 
		}
		else if(selected.length == 4) {
			if(catches == 4)
				money += 50; 
			else if(catches == 3) 
				money += 5;
			else if(catches == 2)
				money += 1; 
		}
		else if(selected.length == 5) {
			if(catches == 5)
				money += 500; 
			else if(catches == 4)
				money += 15;
			else if(catches == 3)
				money += 2;
		}
		else if(selected.length == 6) {
			if(catches == 6)
				money += 1500; 
			else if(catches == 5) 
				money += 50; 
			else if(catches == 4)
				money += 5; 
			else if(catches == 3)
				money += 1; 
		}
		else if(selected.length == 7) {
			if(catches == 7)
				money += 5000; 
			else if(catches == 6)
				money += 150; 
			else if(catches == 5)
				money += 15; 
			else if(catches == 4)
				money += 2; 
			else if(catches == 3)
				money += 1; 
		}
		else if(selected.length == 8) {
			if(catches == 8)
				money += 15000; 
			else if(catches == 7)
				money += 400; 
			else if(catches == 6)
				money += 50; 
			else if(catches == 5)
				money += 10; 
			else if(catches == 4)
				money += 2; 
		}
		else if(selected.length == 9) {
			if(catches == 9)
				money += 25000; 
			else if(catches == 8)
				money += 2500; 
			else if(catches == 7)
				money += 200; 
			else if(catches == 6) 
				money += 25; 
			else if(catches == 5) 
				money += 4; 
			else if(catches == 4) 
				money += 1; 
		}
		else if(selected.length == 10) {
			if(catches == 10)
				money += 200000; 
			else if(catches == 9)
				money += 10000; 
			else if(catches == 8)
				money += 500; 
			else if(catches == 7)
				money += 50; 
			else if(catches == 6)
				money += 10; 
			else 
				money += 3; 
		}
		
		alert("Catches: " + catches); 
		alert("Round over.");
		
		$("#money").text(money); 
		dealer = []; 
		
		for(var i = 0; i <= selected.length; i++) {
			var id = selected[i]; 
			$('#' + id).attr('bgcolor', 'white');
		}
		selected = []; 
	}
	
	$("#reset").click(function() {
		$.ajax({
			type: "POST",
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: "/reset",
			success: function(data) {  
				money = 20; 
				$("#money").text(money); 
			}
		});
	}); 
	
	$("#submit").click(function() {
		$.ajax({
			type: "POST",
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			data: {amount: money},
			url: "/saveKeno",
			success: function(data) {  
				alert("Saved successfully.");
			}
		});
	}); 
});
