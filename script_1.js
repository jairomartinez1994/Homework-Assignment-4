// Variables
var homePage = "index.html"
var questionsPage = "questions.html"
var highScorePage = "highscore.html"
var endPage = "end.html"

// Timer
$(function () {
    var time = 60;

    function redirect() {
        setTimeout(redirect, 1000);
        $(".timer").html(time);
        if (time == 0) {
            window.location.href = "end.html";
        }

        time--;
    }

    redirect();

    //Questions
    const questions = [
        {
            question: "Javascript is interpreted by?",
            answers: [" Client", " Server", " Object", " Individual"],
        },
        {
            question: "Using which statement, lets you test for a specific condition?",
            answers: [" If", " Select", " For", " Test"],
        },
        {
            question: "Which of the following best describes Javascript?",
            answers: [" Object oriented scripting language", " A terrible mistake", " Compiled scripting language", " Script language precompiled in the browser"],
        }];
    //Return a shuffled array:
    function shuffled(arr) {
        arr = arr.slice();
        for (var i = 0; i < arr.length; i++) {
            var j = Math.floor(Math.random() * (arr.length - i)) + i;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    var domQuestion = document.querySelector('#question');
    var domAnswers = Array.from(document.querySelectorAll('input[name=answer]'));
    var domNext = document.querySelector('#next');

    function displayQuestion() {
        var answers = shuffled(questions[questionId].answers);
        // Display question
        domQuestion.textContent = (questionId + 1) + '. ' +
            questions[questionId].question;
        domAnswers.forEach(function (input, i) {
            input.value = answers[i];
            input.checked = false;
            input.nextElementSibling.textContent = answers[i];
        });
    }
    //Display first question
    var questionId = 0;
    var correctAnswers = 0;
    displayQuestion();

    //Respond to Next button 
    domNext.addEventListener('click', function () {
        var domAnswer = domAnswers.find(input => input.checked);
        if (!domAnswer) return;
        if (domAnswer.value == questions[questionId].answers[0]) correctAnswers++;
        questionId++;
        if (questionId >= questions.length) {
            alert('You have answered ' + correctAnswers +
                ' of ' + questions.length + ' questions correctly.');
        }
        displayQuestion();
    });

});