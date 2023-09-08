$(document).ready(function(){ 

	function card( name, suit, value ){ 
		this.name = name;
		this.suit = suit;
		this.value = value;
	}

	var deck = [
	new card('1', 'Hearts',11),
	new card('2', 'Hearts',2),
	new card('3', 'Hearts',3),
	new card('4', 'Hearts',4),
	new card('5', 'Hearts',5),
	new card('6', 'Hearts',6),
	new card('7', 'Hearts',7),
	new card('8', 'Hearts',8),
	new card('9', 'Hearts',9),
	new card('10', 'Hearts',10),
	new card('J', 'Hearts',10),
	new card('Q', 'Hearts',10),
	new card('K', 'Hearts',10),
	
	new card('1', 'Diamonds',11),
	new card('2', 'Diamonds',2),
	new card('3', 'Diamonds',3),
	new card('4', 'Diamonds',4),
	new card('5', 'Diamonds',5),
	new card('6', 'Diamonds',6),
	new card('7', 'Diamonds',7),
	new card('8', 'Diamonds',8),
	new card('9', 'Diamonds',9),
	new card('10', 'Diamonds',10),
	new card('J', 'Diamonds',10),
	new card('Q', 'Diamonds',10),
	new card('K', 'Diamonds',10),
	
	new card('1', 'Clubs',11),
	new card('2', 'Clubs',2),
	new card('3', 'Clubs',3),
	new card('4', 'Clubs',4),
	new card('5', 'Clubs',5),
	new card('6', 'Clubs',6),
	new card('7', 'Clubs',7),
	new card('8', 'Clubs',8),
	new card('9', 'Clubs',9),
	new card('10', 'Clubs',10),
	new card('J', 'Clubs',10),
	new card('Q', 'Clubs',10),
	new card('K', 'Clubs',10),
	
	new card('1', 'Spades',11),
	new card('2', 'Spades',2),
	new card('3', 'Spades',3),
	new card('4', 'Spades',4),
	new card('5', 'Spades',5),
	new card('6', 'Spades',6),
	new card('7', 'Spades',7),
	new card('8', 'Spades',8),
	new card('9', 'Spades',9),
	new card('10', 'Spades',10),
	new card('J', 'Spades',10),
	new card('Q', 'Spades',10),
	new card('K', 'Spades',10)
	];


	var used_cards = new Array();
	
	function deal() {
		for (var i=0; i < 2; i++){
			hit();			
		}
	}
	
	function getRandom(num){
		var my_num = Math.floor(Math.random()*num);
		return my_num;	
	}
	
	function hit(){
		var good_false;
		do{
			var index = getRandom(52);
			if( !$.inArray(index,used_cards) > -1 ){
				good_card = true;
				var c = deck[index];
				used_cards[used_cards.length] = index;
				hand.cards [hand.cards.length] = c;
				var $d = $("<div>");
				$d.addClass("hand")
				.appendTo("#my_hand");
				$("<img>").appendTo($d)
				.attr('src','images/cards/' + c.suit + '/' + c.name + '.jpg' )
				.fadeOut('slow')
				.fadeIn('slow');
			}
		}while(!good_card);
		good_card = false; 
	}
	$("#btnDeal").click(function(){
		deal();
		$(this).toggle();
		$("#btnHit").toggle();
		$("#btnStick").toggle();
	});
	$("#btnHit").click( function(){
		hit();
	});
	$("#btnStick").click( function(){
		$("#hdrResult").html('Stick!');
		$("result").toggle();
	})
	
	$("#btnRestart").click( function(){
		$("#result").toggle();
		$(this).toggle();
		$("#my_hand").empty();
		$("#hdrResult").html('');
		used_cards.length = 0;
		hand.cards.length = 0;
		hand.current_total = 0;
		$("#btnDeal").toggle()
		.trigger('click');
	});


	var hand = {
		cards : new Array(),
		current_total : 0,
		sumCardTotal: function(){
			this.current_total = 0;
			for(var i=0;i<this.cards.length;i++){
				var c = this.cards[i];
				this.current_total += c.value;
			}
			$("#hdrTotal").html("Total: " + this.current_total );
			if(this.current_total> 21){
			$("#btnStick").trigger("click");
			$("#imgResult").attr('src','images/x2.png');
			$("#hdrResult").html("BUST!")
			.attr('class', 'lose');
			}else if(this.current_total == 21){
			$("#btnStick").trigger("click");
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html("BlackJack!")
			.attr('class', 'win');
			}else if(this.current_total <= 21 && this.cards.length == 5){
			$("#btnStick").trigger("click");
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html("BlackJack - 5 card trick!")
			.attr('class', 'win');
			}else{}
			$("#hdrTotal").html("Total: " + this.current_total );
		}
	};
	function end(){
		$("#btnHit").toggle();
		$("#btnStick").toggle();
		$("#btnRestart").toggle();
	}	

	$("#btnStick").click( function(){
	$("#hdrResult").html('Stick!')
	.attr('class', 'win');
	$("#result").toggle();
	end();
	});	
	
})





