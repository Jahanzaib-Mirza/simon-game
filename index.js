var level = 0;
var output = [];
var inputCount = 0;
$("h1").click(() => {
    startGame();
})
$(document).keydown(() => {
    startGame();
})
const startGame = () => {
    if (level === 0) {
        level++;
        updateLevel();
        play();
    }
}
const updateLevel = () => {
    if (level === 0) {
        $("h1").text("Game Over");
        console.log(level)
    }
    else $("h1").text("level " + level);

}
const renderSound = (val) => {
    console.log("render sound runned")
    var audio = new Audio(`sounds/${val}.mp3`);
    audio.play();
    $(`#${val}`).css("visibility", "hidden");
    setTimeout(() => {
        $(`#${val}`).css("visibility", "visible");
    }, 100)
}

const play = () => {
    console.log("play")
    generateRandom();

}
const generateRandom = () => {
    var random = Math.floor(Math.random() * 4) + 1;
    if (random === 1) output.push("green");
    else if (random === 2) output.push("red");
    else if (random === 3) output.push("yellow");
    else if (random === 4) output.push("blue");
    renderSound(output[output.length - 1])
}

const evaluate = (val) => {
    if (val !== output[inputCount - 1]) {
        level = 0;
        updateLevel();
        output = [];
        console.log("lost");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200)
    }
    else {
        if (inputCount === output.length) {
            level++;
            updateLevel();
            console.log("win")
            inputCount = 0;
            setTimeout(() => play(), 1000);
        }
    }
}
$(".btn").click((e) => {
    if (level !== 0) {
        var audio = new Audio(`sounds/${e.currentTarget.id}.mp3`);
        audio.play();
        $(`#${e.currentTarget.id}`).addClass("pressed");
        setTimeout(() => {
            $(`#${e.currentTarget.id}`).removeClass("pressed");
        }, 50)
        inputCount++;
        evaluate(e.currentTarget.id);
    }
})




