<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blackjack Table</title>
    <div class="title">Welcome to the blackjack table.</div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	
	<script src="js/controllers/moneyhouse.js"></script>
	<script src="js/app.js"></script>
		
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

<body ng-app="moneyhouse" ng-controller="blackjackController">

<br>

<div>

    <button id="dealHand" ng-click="getHand(); getDealerHand();">Deal Hand</button>
    <button id="hit" ng-click="clientHit();">Hit</button>
    <button id="sit" ng-click="clientSit();">Stand</button>

    <br/><br/>
    <b>W/L Ratio: {{gamesWon}} || {{gamesLost}}</b>
    <br/><br/>
    <div>
        <fieldset>
            <h3>Dealer</h3>
            <ul ng-repeat="card in dealerHand">
                    <a><b>{{card.name + ' ' +  card.suit}}<b></a><br/>
            </ul><br/>
            <h4>Dealer's Score: {{dealerScore}} | {{dealerScoreLowAce}}</h4>
        </fieldset>
    </div>
    <div>
        <fieldset>
            <h3>{{name}}</h3>
            <ul ng-repeat="card in clientHand">
                <a><b>{{card.name + ' ' +  card.suit}}</b></a><br/>
            </ul><br/>
            <h4>{{name}}'s Score: {{clientScore}} | {{clientScoreLowAce}}</h4>
        </fieldset>
    </div>
	
	<br>
	<button id="save" ng-click="clientSave();">Save Session</button>

</div>

</body>

</html>