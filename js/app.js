// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen
var timerInterval, time, score;

(function () {
  // var score = 0;
  // // Set the initial time to 20

  // Create a setInterval function to update the time every second
  // var timer = setInterval(() => {
  //   time--; // Decrement the time by 1 second
  //   console.log(time); // Display the updated time

  //   $('#timer').html(time < 10 ? `0${time}` : time);

  //   if (time <= 0) {
  //     clearInterval(timer);
  //     $('#timer').html('00');
  //     Memory.showModal();
  //   }

  //   // }
  // }, 1000);

  // $('.restart').click(function () {
  //   score = 0;
  //   time = 10;
  // });
  var Memory = {
    init: function (cards, obstacles) {
      this.$game = $('.game');
      this.$modal = $('.modal');
      this.$overlay = $('.finalResult');
      this.$restartButton = $('button.restart');
      this.cardsArray = $.merge(cards, cards);
      this.cardsArray = $.merge(this.cardsArray, obstacles);
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function (cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function () {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $('.image-card');
      this.paused = false;
      this.guess = null;
      this.binding();
      time = 20;
      score = 0;
      $('#timer').html(time < 10 ? `0${time}` : time);
      timerInterval = setInterval(() => {
        time--; // Decrement the time by 1 second
        console.log(time); // Display the updated time

        $('#timer').html(time < 10 ? `0${time}` : time);

        if (time <= 0) {
          $('#timer').html('00');
          clearInterval(timerInterval);

          Memory.showModal();
        }

        // }
      }, 1000);
    },

    binding: function () {
      this.$memoryCards.on('click', this.cardClicked);
      this.$restartButton.on('click', $.proxy(this.reset, this));
    },
    // kinda messy but hey
    cardClicked: function () {
      var _ = Memory;
      var $card = $(this);
      if (
        !_.paused &&
        !$card.find('.inside').hasClass('matched') &&
        !$card.find('.inside').hasClass('picked')
      ) {
        $card.find('.inside').addClass('picked');
        if (!_.guess) {
          _.guess = $(this).attr('data-id');
        } else if (
          _.guess == $(this).attr('data-id') &&
          !$(this).hasClass('picked')
        ) {
          $('.picked').addClass('matched');
          score++;
          console.log(score);
          _.guess = null;
        } else {
          _.guess = null;
          _.paused = true;
          setTimeout(function () {
            $('.picked').removeClass('picked');
            Memory.paused = false;
          }, 600);
        }

        if (
          $('.matched').length ==
          $('.image-card').length - obstacles.length
        ) {
          _.win();
        }
      }
    },

    win: function () {
      this.paused = true;
      setTimeout(function () {
        Memory.showModal();
        Memory.$game.fadeOut();
      }, 1000);
    },

    showModal: function () {
      $('.gamePage').hide();
      this.$overlay.show();
      // this.$modal.fadeIn('slow');
      $('.score').html(score);
      time = 60;
      clearInterval(timerInterval);
    },

    hideModal: function () {
      this.$overlay.hide();
      $('.gamePage').show();
      // this.$modal.hide();
    },

    reset: function () {
      clearInterval(timerInterval);
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show('slow');
    },

    // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
    shuffle: function (array) {
      var counter = array.length,
        temp,
        index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function () {
      var frag = '';
      this.$cards.each(function (k, v) {
        frag +=
          '<div class="image-card" data-id="' +
          v.id +
          '"><div class="inside">\
				<div class="front"><img src="' +
          v.img +
          '"\
				alt="' +
          v.name +
          '" /></div>\
				<div class="back"><img src="imgs/starter-img.png"\
				alt="" /></div></div>\
				</div>';
      });
      return frag;
    },
  };

  var cards = [
    {
      name: 'image-01',
      img: '../imgs/img1.png',
      id: 1,
    },
    {
      name: 'image-02',
      img: '../imgs/img2.png',
      id: 2,
    },
    {
      name: 'image-03',
      img: '../imgs/img3.png',
      id: 3,
    },
    {
      name: 'image-04',
      img: '../imgs/img4.png',
      id: 4,
    },
    {
      name: 'image-05',
      img: '../imgs/img5.png',
      id: 5,
    },
    {
      name: 'image-06',
      img: '../imgs/img6.png',
      id: 6,
    },
    {
      name: 'image-07',
      img: '../imgs/img7.png',
      id: 7,
    },

    // {
    //   name: 'photoshop',
    //   img: 'https://groupvhm.net/hosting/pfizer/Games/memory-game/imgs/img7.png',
    //   id: 7,
    // },
    // {
    //   name: 'python',
    //   img: 'https://groupvhm.net/hosting/pfizer/Games/memory-game/imgs/img8.png',
    //   id: 8,
    // },
    // {
    //   name: 'rails',
    //   img: 'https://groupvhm.net/hosting/pfizer/Games/memory-game/imgs/img9.png',
    //   id: 9,
    // },
    // {
    //   name: 'sass',
    //   img: 'https://groupvhm.net/hosting/pfizer/Games/memory-game/imgs/img10.png',
    //   id: 10,
    // },
    // {
    //   name: 'sublime',
    //   img: 'https://groupvhm.net/hosting/pfizer/Games/memory-game/imgs/img11.png',
    //   id: 11,
    // },
    // {
    //   name: 'wordpress',
    //   img: 'https://groupvhm.net/hosting/pfizer/Games/memory-game/imgs/img12.png',
    //   id: 12,
    // },
  ];

  var obstacles = [
    {
      name: 'obstacles01',
      img: '../imgs/img8.png',
      id: 101,
    },
    {
      name: 'obstacles02',
      img: '../imgs/img9.png',
      id: 102,
    },
    {
      name: 'obstacles03',
      img: '../imgs/img10.png',
      id: 103,
    },
    {
      name: 'obstacles04',
      img: '../imgs/img11.png',
      id: 104,
    },
  ];
  Memory.init(cards, obstacles);
})();
