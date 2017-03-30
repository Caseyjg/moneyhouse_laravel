angular.module('mainCtrl', [])
	.controller('blackjackController', function($scope, $http, $window) {

        var login_http = $http({
            method: 'GET',
            url: '/wins_req',
        }).then(
                function (response) {
					if(response.data.wins > 0)	
						$scope.gamesWon = response.data.wins;
					else 
						$scope.gamesWon = 0; 
					if(response.data.losses > 0)
						$scope.gamesLost = response.data.losses;
					else
						$scope.gamesLost = 0; 
					
					$scope.name = response.data.username; 

                }, function (response) {
                    $window.alert('error occured ** from controller');
                }
        );

        $scope.clientSave = function() {
            var login_http = $http({
                method: 'POST',
                url: '/save_req',
                params: { wins: $scope.gamesWon, losses: $scope.gamesLost }
            }).then(
                    function (response) {
                        $window.alert("Wins and Losses Saved");
                    }, function (response) {
                        $window.alert('error occured ** from controller');
                    }
            );
        };


        //$scope.name = $window.sessionStorage.name;

		//delete these two after uncommenting the above
		//$scope.gamesWon = 0; 
		//$scope.gamesLost = 0; 

        $scope.clientScore = 0;
        $scope.clientScoreLowAce = 0;

        $scope.dealerScore = 0;
        $scope.dealerScoreLowAce = 0;

        $scope.clientHand = {};
        $scope.dealerHand = {};

        clientCards = 0;
        dealerCards = 0;

        clientBust = false;
        dealerBust = false;
        gameOver = false;

        clientHasAce = true;
        dealerHasAce = true;

        var min = Math.ceil(0);
        var max = Math.floor(51);

        $scope.getHand = function () {
            deck = getDeck();

            gameOver = false;
            clientBust = false;
            $scope.clientScore = 0;
            $scope.clientHand = {};
            $scope.clientScoreLowAce = 0;
            clientCards = 0;
            clientHasAce = false;

            $scope.clientHand[clientCards++] = deck[Math.floor(Math.random() * (max - min + 1) + min)];
            $scope.clientHand[clientCards++] = deck[Math.floor(Math.random() * (max - min + 1) + min)];

            $scope.clientScore += updateScore($scope.clientHand, "user");
        };

        $scope.getDealerHand = function () {
            dealerBust = false;
            $scope.dealerScore = 0;
            $scope.dealerHand = {};
            $scope.dealerScoreLowAce = 0;
            dealerCards = 0;
            dealerHasAce = false;

            $scope.dealerHand[dealerCards++] = deck[Math.floor(Math.random() * (max - min + 1) + min)];
            $scope.dealerHand[dealerCards++] = deck[Math.floor(Math.random() * (max - min + 1) + min)];

            $scope.dealerScore = updateScore($scope.dealerHand, "dealer");

            if($scope.dealerScore == 21) {
                gameOver = true;
                $scope.clientSit();
            }
        };

        $scope.clientHit = function() {
            if(clientBust == true || gameOver == true) {
                $scope.clientSit();
            }
            else {
                var toAdd = deck[Math.floor(Math.random() * (max - min + 1) + min)];
                $scope.clientHand[clientCards++] = toAdd;
                $scope.clientScore = updateScore($scope.clientHand, "user");
            }
        };

        $scope.clientSit = function() {
            //call dealer hit
            if(clientBust == false && gameOver == false) {
                while ($scope.dealerScore < 17 || ($scope.dealerScoreLowAce < 21 && dealerHasAce == true && $scope.dealerScore < 17)) {
                    var toAdd = deck[Math.floor(Math.random() * (max - min + 1) + min)];
                    alert("from clientSit(), card to add: " + toAdd.name);
                    $scope.dealerHand[dealerCards++] = toAdd;
                    $scope.dealerScore = updateScore($scope.dealerHand, "dealer");

                    if ($scope.dealerScore > 21) {
                        break;
                    }
                }

                //no aces in either hand
                if(clientHasAce == false && dealerHasAce == false) {
                    if($scope.clientScore > $scope.dealerScore) {
                        alert("Game over, you won.");
                        $scope.gamesWon++;
                    }
                    else if(dealerBust == true) {
                        alert("Game over, you won.");
                        $scope.gamesWon++;
                    }
                    else if($scope.dealerScore > $scope.clientScore) {
                        alert("Game over, dealer won.");
                        $scope.gamesLost++;
                    }
                    else if($scope.dealerScore == $scope.clientScore) {
                        alert("Game over, push.");
                    }
                }
                //dealer has ace
                else if(clientHasAce == false && dealerHasAce == true) {
                    // no change from above
                    if($scope.dealerScore < 22) {
                        if($scope.clientScore > $scope.dealerScore) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScore > $scope.clientScore) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScore == $scope.clientScore) {
                            alert("Game over, push.");
                        }
                    }
                    //check lowAce instead
                    else {
                        if($scope.clientScore > $scope.dealerScoreLowAce) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScoreLowAce > 21) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScoreLowAce > $scope.clientScore) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScoreLowAce == $scope.clientScore) {
                            alert("Game over, push.");
                        }
                    }
                }
                //client has ace
                else if(clientHasAce == true && dealerHasAce == false) {
                    //no change -- client didn't bust
                    if($scope.clientScore < 22) {
                        if($scope.clientScore > $scope.dealerScore) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if(dealerBust == true) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScore > $scope.clientScore) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScore == $scope.clientScore) {
                            alert("Game over, push.");
                        }
                    }
                    //check lowAce instead
                    else {
                        if($scope.clientScoreLowAce > $scope.dealerScore) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if(dealerBust == true) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScore > $scope.clientScoreLowAce) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScore == $scope.clientScoreLowAce) {
                            alert("Game over, push.");
                        }
                    }
                }
                //both have aces
                else {
                    //neither busted anyway
                    if($scope.dealerScore < 22 && $scope.clientScore < 22) {
                        if($scope.clientScore > $scope.dealerScore) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScore > $scope.clientScore) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScore == $scope.clientScore) {
                            alert("Game over, push.");
                        }
                    }
                    //only dealer busted
                    else if($scope.clientScore < 22) {
                        if($scope.clientScore > $scope.dealerScoreLowAce) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.clientScoreLowAce > 21) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScoreLowAce > $scope.clientScore) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScoreLowAce == $scope.clientScore) {
                            alert("Game over, push.");
                        }
                    }
                    //only client busted
                    else if($scope.dealerScore < 22) {
                        if($scope.clientScoreLowAce > $scope.dealerScore) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScore > $scope.clientScoreLowAce) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScore == $scope.clientScoreLowAce) {
                            alert("Game over, push.");
                        }
                    }
                    //both busted
                    else {
                        if($scope.clientScoreLowAce > $scope.dealerScoreLowAce) {
                            alert("Game over, you won.");
                            $scope.gamesWon++;
                        }
                        else if($scope.dealerScoreLowAce > $scope.clientScoreLowAce) {
                            alert("Game over, dealer won.");
                            $scope.gamesLost++;
                        }
                        else if($scope.dealerScoreLowAce == $scope.clientScoreLowAce) {
                            alert("Game over, push.");
                        }
                    }
                }

                gameOver = true;
            }
            else {
                alert("Game is already over");
                $scope.gamesLost++;
            }
        };

        var updateScore = function (hand, player) {
            var i = 0;
            var num = 0;
            var score = 0;

            while (hand[i] != undefined) {
                if(hand[i].name == "Jack" || hand[i].name == "Queen" || hand[i].name == "King") {
                    score += 10;
                }
                else if(hand[i].name == "Ace") {
                    //sloppy, but didn't implement until after finishing rest of game. will change eventually.
                    //doesn't work if there are two aces, one counting as 11 and the other 1. all 1 or all 11's for now.

                    score += 11;

                    if(player == "user") {
                        clientHasAce = true;
                    }
                    else {
                        dealerHasAce = true;
                    }

                    num++;
                }
                else {
                    score += parseInt(hand[i].name);
                }
                i++;
            }
            alert("score from updateScore: " + score);

            if(clientHasAce && player == "user") {
                $scope.clientScoreLowAce = score - (10 * num);
            }
            else if(dealerHasAce && player == "dealer") {
                $scope.dealerScoreLowAce = score - (10 * num);
            }

            if(player == "user") {
                if(score > 21 && clientHasAce == false) {
                    clientBust = true;
                    gameOver = true;
                    alert("BUST, game over.");
                    $scope.gamesLost++;
                    //$scope.clientSit();
                }
                else if($scope.clientScoreLowAce > 21 && clientHasAce == true) {
                    gameOver = true;
                    clientBust = true;
                    $scope.gamesLost++;
                }
            }
            else {
                if ((score > 21 && dealerHasAce == false) || ($scope.dealerScoreLowAce > 21 && dealerHasAce == true)) {
                    dealerBust = true;
                    gameOver = true;
                }
            }

            return score;
        };

        var reset = function() {
            if($scope.clientScore > 21) {
                clientBust = false;
                $scope.clientScore = 0;
                $scope.clientHand = {};
                clientCards = 0;
            }
            else {
                dealerBust = false;
                $scope.dealerScore = 0;
                $scope.dealerHand = {};
                dealerCards = 0;
            }
        };

        var card = function (name, suit) {
            this.name = name;
            this.suit = suit;
        };

        var getDeck = function () {
            this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
            this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
            var cards = [];

            for (var i = 0; i < this.suits.length; i++) {
                for (var j = 0; j < this.names.length; j++) {
                    cards.push(new card(this.names[j], this.suits[i]));
                }
            }
            return cards;
        };
    });