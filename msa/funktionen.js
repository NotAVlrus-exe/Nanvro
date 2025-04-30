//Variablen
/*:root[data-theme="dark"] {
    --color-bg: rgb(20,20,20);
    --color-bg-secondary: rgb(30,30,30); 
    --color-bg-tertiary:rgb(25, 25, 25);

    --color-fg: rgb(255, 255, 255);
    --color-fg-accent: rgb(100,100,100);
    --color-fg-accent-invert: rgb(155,155,155);

    --color-bg-btn: rgb(50,50,50);
    --img-invert: 0;

    --color-primary: rgb(64, 175, 81);
    --color-primary-accent: rgba(64, 175, 81, 0.2);
    --color-secondary: rgb(122, 255, 143);
    --streak-color: rgb(242, 152, 86);
}*/
let color_bg="rgb(20,20,20)";
let color_bg_secondary="rgb(30,30,30)";
let color_bg_tertiary="rgb(25, 25, 25)";
let color_fg="rgb(255, 255, 255)";
let color_fg_accent="rgb(100,100,100)";
let color_fg_accent_invert="rgb(155,155,155)";
let color_bg_btn="rgb(50,50,50)";
let img_invert=0;
let color_primary="rgb(64, 175, 81)";
let color_primary_accent="rgba(64, 175, 81, 0.2)";
let color_secondary="rgb(122, 255, 143)";
let streak_color="rgb(242, 152, 86)";


function erstelleFunktionen(config) {
    const {
        id,
        punkte = [],
        diagrammtype = "line",
        label = "",
        funktionsfarbe = color_fg,
        funktionsdicke = 2,
        fill = false,
        pointRadius = 0,
        legende = false,
        animation = false,
        titel = "",
        axistiteldisplay = true,
        netcolor = color_fg_accent,
        stepSizeX = 1,
        stepSizeY = 1,
        axistextcolor = color_fg,
        xMin = -5, // Standardwert für Min-Wert der X-Achse
        xMax = 5   // Standardwert für Max-Wert der X-Achse
    } = config;

    const ctx = document.getElementById(id).getContext('2d');
    let funktionsChart = new Chart(ctx, {
        type: diagrammtype,
        data: {
            datasets: [{
                label: label,
                data: punkte, // Punkte müssen als {x, y}-Objekte vorliegen
                borderColor: funktionsfarbe,
                borderWidth: funktionsdicke,
                fill: fill,
                pointRadius: pointRadius,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: legende
                }
            },
            animation: animation,
            scales: {
                x: {
                    type: 'linear', // Sicherstellen, dass die X-Achse linear ist
                    title: {
                        display: axistiteldisplay,
                        text: "X", // Beschriftung der X-Achse
                        color: axistextcolor,
                    },
                    grid: {
                        color: netcolor,
                    },
                    ticks: {
                        stepSize: stepSizeX,
                        color: axistextcolor,
                    },
                    min: xMin, // Min-Wert der X-Achse
                    max: xMax  // Max-Wert der X-Achse
                },
                y: {
                    title: {
                        display: axistiteldisplay,
                        text: "Y", 
                        color: axistextcolor,
                    },
                    grid: {
                        color: netcolor,
                    },
                    ticks: {
                        stepSize: stepSizeY,
                        color: axistextcolor,
                    }
                }
            }
        }
    });
}

// Beispielaufruf mit korrekt formatierten Datenpunkten
const p = [];
for (let x = -5; x <= 5; x += 0.1) {
    p.push({ x: x, y: x ** 2 }); // Datenpunkte als {x, y}-Objekte
}

erstelleFunktionen({
    id: "funktionsChart",
    punkte: p,
});