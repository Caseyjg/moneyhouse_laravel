<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Keno</title>
    <div class="title">Welcome to the Keno machine.</div>
	
	<meta name="csrf-token" content="{{ csrf_token() }}">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	
	<script src="js/controllers/keno.js"></script>
	<!--<script src="js/app.js"></script>-->
		
	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

	<!-- Styles -->
	<style>
		html, body {
			background-color: #fff;
			color: #636b6f;
			font-family: 'Raleway', sans-serif;
			font-weight: 100;
			height: 100vh;
			margin: 0;
		}

		.full-height {
			height: 100vh;
		}

		.flex-center {
			align-items: center;
			display: flex;
			justify-content: center;
		}

		.position-ref {
			position: relative;
		}

		.top-right {
			position: absolute;
			right: 10px;
			top: 18px;
		}

		.content {
			text-align: center;
		}

		.title {
			font-size: 50px;
		}

		.links > a {
			color: #636b6f;
			padding: 0 25px;
			font-size: 12px;
			font-weight: 600;
			letter-spacing: .1rem;
			text-decoration: none;
			text-transform: uppercase;
		}

		.m-b-md {
			margin-bottom: 30px;
		}
	</style>
</head>

<body>

<br>

<div style="text-align: center">
<button id="reset" style="margin: 0 auto; display:block;">Reset money to $20</button><br>
<b>Money: </b>
<div style="font-weight: bold" id="money">
</div>
</div>

<br>

<div id="theShelf">
</div>

<br>

<button id="run" style="margin: 0 auto; display:block;">Submit Picks</button><br>
<button id="submit" style="margin: 0 auto; display:block;">Cash Out</button>

<br><br>

<div style="text-align: center">
<b>Your hand:</b>
<div id="client" style="font-weight: bold">
</div>
</div>

<br><br>

<div style="text-align: center">
<b>Dealer draw:</b>
<div id="dealer" style="font-weight: bold">
</div>
</div>

<br><br>

<div style="text-align: center">
	<b><a href="http://lotto.bclc.com/keno-and-keno-bonus/prizes-and-odds.html">Payout Rules</a></b>

	<br>
	
	<h3>Rules:</h3><b>
	1.  Each number selection represents a $1 wager.<br>
	2.  Pick any amount of numbers less than 10. <br>
	3.  Dealer chooses 20 numbers, any matches are called a "catch". <br>
	4.  Payout depends on the number of choices and the number of catches (see Payout Rules).<br>
	</b>
	
</div>

</body>

</html>