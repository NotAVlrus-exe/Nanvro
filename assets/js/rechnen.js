//only numbers in input field
document.getElementById("answer").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, ""); // Erlaubt nur Ziffern 0-9
});

//if not from math, casual 1+1
let min1, max1, min2, max2;
let result = 2;
if (sessionStorage.length == 0 || sessionStorage.getItem("mathtype") == null) {
    [mathtype, min1, max1, min2, max2] = ["plus", 1, 10, 1, 10];
} else {
    [mathtype, min1, max1, min2, max2] = [
        sessionStorage.getItem("mathtype"),
        parseInt(sessionStorage.getItem("min1")),
        parseInt(sessionStorage.getItem("max1")),
        parseInt(sessionStorage.getItem("min2")),
        parseInt(sessionStorage.getItem("max2"))
    ];
}
//set operator
if (mathtype == "plus") {
    document.getElementById("operator").innerHTML = '<i class="ri-add-fill"></i>';
} else if (mathtype == "minus") {
    document.getElementById("operator").innerHTML = '<i class="ri-subtract-fill"></i>';
} else if (mathtype == "mal") {
    document.getElementById("operator").innerHTML = '<i class="ri-close-fill"></i>';
} else if (mathtype == "geteilt") {
    document.getElementById("operator").innerHTML = '<i class="ri-divide-fill"></i>';
} else if (mathtype == "potenz") {
    document.getElementById("operator").innerHTML = '';
    document.getElementById("num2").style.position = "relative";
    document.getElementById("num2").style.top = "-1rem";
    document.getElementById("num2").style.fontSize = "2rem";
} else if (mathtype == "wurzel") {;
    document.getElementById("operator").innerHTML = '';
    document.getElementById("num2").innerHTML = "";
}
//define generation of tasks
let generatetask;
if (mathtype == "plus") {
    generatetask = function (min1, max1, min2, max2) {
        let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
        let num2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        document.getElementById("num1").innerHTML = num1;
        document.getElementById("num2").innerHTML = num2;
        return num1+num2;
    };
}
else if (mathtype == "minus") {
    generatetask = function (min1, max1, min2, max2) {
        let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
        let num2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        if (num1 < num2) {
            // Swap num1 and num2 to ensure num1 is always greater than or equal to num2
            [num1, num2] = [num2, num1];
        }
        document.getElementById("num1").innerHTML = num1;
        document.getElementById("num2").innerHTML = num2;
        return num1-num2;
    }
}
else if (mathtype == "mal") {
    generatetask = function (min1, max1, min2, max2) {
        let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
        let num2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        document.getElementById("num1").innerHTML = num1;
        document.getElementById("num2").innerHTML = num2;
        return num1*num2;
    } 
}else if (mathtype == "geteilt") {
    generatetask = function (min1, max1, min2, max2) {
        let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
        let num2 = Math.floor(Math.random() * (max2-1 - min2 + 1)) + min2;
        result = num1*num2;
        document.getElementById("num1").innerHTML = result;
        document.getElementById("num2").innerHTML = num1;
        //Result/num1 = num2
        return num2;
    }
} else if (mathtype == "potenz") {
    generatetask = function (min1, max1, min2, max2) {
        let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
        let num2 = min2
        document.getElementById("num1").innerHTML = num1;
        document.getElementById("num2").innerHTML = num2;
        return num1**num2;
        
    }
} else if (mathtype == "wurzel") {
    //if (min2 == 2) {
        generatetask = function (min1, max1, min2, max2) {
            let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
            if (Number.isInteger(num1**(1/2))) {
                document.getElementById("num1").innerHTML = `\\(\\sqrt{${num1}}\\)`;
                ensureMathJaxLoaded(() => MathJax.typeset());
                return num1**(1/2);
            } else {
                return generatetask(min1, max1, min2, max2);
            }
        };
    /*} else {
        generatetask = function (min1, max1, min2, max2) {
            let num1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
            let num2 = min2;
            if (Number.isInteger(num1**(1/num2))) {
                document.getElementById("num1").innerHTML = `\\(\\sqrt[${num2}]{${num1}}\\)`;
                ensureMathJaxLoaded(() => MathJax.typeset());
                return num1**(1/num2);
            } else {
                return generatetask(min1, max1, min2, max2);
            }
        };
    } */
}

function ensureMathJaxLoaded(callback) {
    if (typeof MathJax !== "undefined" && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise.then(callback);
    } else {
        console.warn("MathJax is not fully loaded yet. Retrying...");
        setTimeout(() => ensureMathJaxLoaded(callback), 100);
    }
}

//generate first task
result = generatetask(min1, max1, min2, max2);
//define all variables
let streak = 0;
let completed = 0;
const color_primary = "#40af51";
const color_red = "#af4040";

//check if enter is pressed
document.getElementById("answer").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        event.preventDefault(); 
        checkAnswer(); // Entfernen des Arguments
    }
});


function rightAnswer() {
    //generate feedbacktext
    document.getElementById("feedback").style.color = color_primary;
    document.getElementById("feedback").innerHTML = "Richtig, die richtige Antwort ist " + result + "!";
    document.querySelector(".taskcontainer").style.borderColor = "rgba(64, 175, 81, 0.9)";
    //streak und completed updaten
    streak++;
    completed++;
    document.getElementById("streak").innerHTML = streak;
    document.getElementById("completed").innerHTML = completed;
}

function wrongAnswer() {
    document.getElementById("feedback").style.color = color_red;
    document.getElementById("feedback").innerHTML = "Falsch, die richtige Antwort wäre " + result + "!";
    document.querySelector(".taskcontainer").style.borderColor = "rgba(205, 46, 46, 0.9)";
    streak = 0;
}

function checkAnswer() {
    //if answer is correct
    if (document.getElementById("answer").value == result) {
        rightAnswer();
    }
    //if answer is wrong
    else {
        wrongAnswer();
    }

    //reset and generate new task
    document.getElementById("streak").innerHTML = streak;
    document.getElementById("completed").innerHTML = completed;
    document.getElementById("answer").disabled = true; 
    setTimeout(function () {
        result = generatetask(min1, max1, min2, max2); // regenerate the task
        document.getElementById("feedback").innerHTML = "";
        document.getElementById("answer").value = "";
        document.getElementById("answer").disabled = false; 
        document.querySelector(".taskcontainer").style.borderColor = "transparent";
        document.getElementById("answer").focus();
    }, 1500);
}
