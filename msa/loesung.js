const solutions = document.getElementById("solutions");

solutions.addEventListener('click', function(event) {
    if (event.target === solutions) {
        console.log("Clicked on the solutions section.");
      hidesolution()
    }
});

function showsolution(id) {
    document.getElementById(id).classList.toggle("open");
    solutions.classList.toggle("open");
    document.body.style.overflow = "hidden";

}

function hidesolution(id="none") {
    solutions.classList.remove("open");
    if (id != "none") {
        document.getElementById(id).classList.remove("open");
    } else {
        for (let child of solutions.children) {
            child.classList.remove("open");
        }
    }
    document.body.style.overflow = "auto";

}

