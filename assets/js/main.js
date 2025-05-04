/*
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 
*/

// Accordion
document.querySelectorAll(".info-header").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const target = document.getElementById(targetId);

        if (!target) {
            console.warn(`Kein Element mit ID "${targetId}" gefunden.`);
            return;
        }

        // Alle anderen Bereiche schließen
        document.querySelectorAll(".item-text").forEach(section => {
            if (section !== target) {
                section.classList.remove("open");
            }
        });

        // Aktuellen Bereich toggeln
        target.classList.toggle("open");
    });
});

  


if (sessionStorage.getItem('theme') == "") {
    document.documentElement.setAttribute('data-theme', "dark");
    sessionStorage.setItem('theme', "dark");
}

function setTheme() {
    if (sessionStorage.getItem('theme') == "light") {
        document.documentElement.setAttribute('data-theme', "light");
    } else {
        document.documentElement.setAttribute('data-theme', "dark");
        sessionStorage.setItem('theme', "dark");
    }
}
setTheme();


function switchTheme() {
    if (sessionStorage.getItem('theme') == "dark") {
        document.documentElement.setAttribute('data-theme', "light");
        sessionStorage.setItem('theme', "light");
        
    } else {
        document.documentElement.setAttribute('data-theme', "dark");
        sessionStorage.setItem('theme', "dark");
    }
}

function setValues(mathtype, min1, max1, min2, max2) {
    sessionStorage.setItem("mathtype", mathtype);
    sessionStorage.setItem("min1", min1);
    sessionStorage.setItem("max1", max1);
    sessionStorage.setItem("min2", min2);
    sessionStorage.setItem("max2", max2);
    sendto("rechnen");
}

function sendto(location) {
    if (location != ' ') {
        window.location.href = location+".html";
    } else {
        window.location.href = "/";
    }
}

function scrollto(location) {
    document.getElementById(location).scrollIntoView({ behavior: 'smooth' })
}