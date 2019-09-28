var correct = 0;
var incorrect = 0;
var currentQuestion = 0;
var timer = 30;

let trivia = [
    {
        question: "How many wheels are on a skateboard?",
        choices: ["2",  "4", "6", "8"],
        answer: "4",
        img: "assets/images/spitfire.jpg",
    },
    {
        question: "Who invented the kickflip?",
        choices: ["Tony Hawk", "Bam Magera", "Rodney Mullen", "Chad Muska"],
        answer: "Rodney Mullen",
        img: "assets/images/rodney_mullen.gif",
    },
    {
        question: "What is another word for a 360 flip?",
        choices: ["Impossible Flip", "3 1/2 flip", "Tre Bomb", "Tri Flip"],
        answer: "Tre Bomb",
        img: "assets/images/360flip.gif",
    },
    {
        question: "Which famous director filmed Fully Flared?",
        choices: ["Spike Jonze", "Steven Spielberg", "Quentin Tarantino", "Michael Bay"],
        answer: "Spike Jonze",
        img: "assets/images/spike_jonzes.jpg",
    },
    {
        question: "What was Black Labels first skate video?",
        choices: ["God Save The Label", "Black Out", "Back In Black", "Label Kills"],
        answer: "Label Kills",
        img: "assets/images/label_kills.jpg",
    },
    {
        question: "Who was the first person to land a 900 in a vert competition?",
        choices: ["Tony Hawk", "Tas Pappas", "Danny Way", "bob burnquist"],
        answer: "Tony Hawk",
        img: "assets/images/tony_hawk.jpg",
    },
    {
        question: "Who was not apart of the legendary Piss Drunx skate crew?",
        choices: [" Dustin Dollin", "Ali Boulala", "Aaron Kyro", "Andrew Reynolds"],
        answer: "Aaron Kyro",
        img: "assets/images/kyro_aaron.jpg",
    }
];

var timeCountdown;

function countdown() {
    clearInterval(timeCountdown);
    timer = 31;
    timeCountdown = setInterval(function(){
      timer--
      $('.timer-container .time').html(timer);
      if (timer === 0) {
        clearInterval(timeCountdown);
        currentQuestion++;
        incorrect++;
        countdown();
        askedQuestion();
      }
    }, 1000);
}


function askedQuestion() {

    var question = trivia[currentQuestion].question;
    var choices = trivia[currentQuestion].choices;
    var answer = trivia[currentQuestion].answer;
    var img = trivia[currentQuestion].img;

    $('.question').html(question);
    $('.choices').html(askChoices(choices));
    
    checkAnswer(answer);
}


function askChoices(choices) {
    var choicesRadioButtons = "";
    
    for (i = 0; i < choices.length; i++) {

        choicesRadioButtons += '<a class="choices-button" href="#">' + choices[i] + '</a>';
    } 

    return choicesRadioButtons;
}

function checkAnswer(answer, img) {
    
    $('.choices-button').on('click', function(){
        if ( $(this).html() == answer) {
            correct++;
            $('.correct-answers').html(correct);
            $('.choices-button').css('pointer-events', 'none');
            $('.your-answer').html('Your Answer Was Correct');
            $('.image-points-container img').attr("src", img);
            currentQuestion++;
            countdown();
            askedQuestion();
        } else {
            incorrect ++; 
            $('.incorrect-answers').html(incorrect);
            $('.choices-button').css('pointer-events', 'none');
            $('.your-answer').html('Your Answer Was incorrect');
            currentQuestion++;
            countdown();
            askedQuestion();
        }
    });
}

$( document ).ready(function() {
    $('.start-button').on('click', function() {
        $(this).toggle();
        $('.points-container').toggle();
        countdown();
        $('.timer-container').toggle();
        askedQuestion();
    });
});
