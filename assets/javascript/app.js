function Question(q, a, c, id) {
    this.question = q;
    this.answers = a;
    this.correct = c;
    this.qid = id;

    this.display = function () {
        var questionDisplay = $("<div class=\"question\" id=\"" + this.qid + "\">");
        questionDisplay.append("<div class=\"q-header\">" + this.question + "</div>");
        var answersDisplay = questionDisplay.append("<div id=\"" + this.qid + "-answers\">" + "</div>");
        for (var i = 0; i < this.answers.length; i++) {
            var answer = this.answers[i];
            var button = $("<input>");
            button.attr("type", "radio");
            button.attr("name", this.qid);
            button.attr("value", answer);
            button.attr("id", this.qid + "-" + answer);
            if (i === 0) {
                button.attr("checked", "");
            }
            answersDisplay.append(button);
            answersDisplay.append("<label for=\"" + answer + "\">" + answer + "</label>");
        }
        return questionDisplay;
    };
}

$("#questions").submit(function (event) {
    var answers = $(this).serializeArray();
    console.log(answers);
    var numCorrect = 0;
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].correct === answers[i].value) {
            numCorrect++;
        }
    }
    $("main").html("<div id=\"result\">You got " + numCorrect + " out of " + questions.length + " questions correct!</div>");
});

var q1 = new Question("Answer is 1", ["1", "2", "3"], "1", "q1");
var q2 = new Question("Answer is 2", ["1", "2", "3"], "2", "q2");
var q3 = new Question("Answer is 3", ["1", "2", "3"], "3", "q3");
var questions = [q1, q2, q3];
for (var i = 0; i < questions.length; i++) {
    $("#questions").append(questions[i].display());
}
var time = 30;
$("#time").html(time);

setInterval(function () {
    if (time > 0) {
        time--;
        $("#time").html(time);
    }
}, 1000);

setTimeout(function () {
    $("#questions").submit();
}, 30000);