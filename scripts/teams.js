let num_players = localStorage.getItem("num_players");

let availableFmts = ["Doubles"];
let texts = ["Divide into teams of two..."];
let teams = `${num_players} PLAYERS`;
let divisions = [`${Math.floor(num_players/2)} Teams of 2`];

let box = document.querySelector(".team-card-players-info");


if (num_players == 6){
    availableFmts.push("Triples");
    texts.push("Divide into teams of three...");
    divisions.push([`${Math.floor(num_players/3)} teams of 3`]);
}

let container = document.querySelector(".team-selection-card-container");
const p1 = document.createElement("p");
p1.textContent = teams;

const p2 = document.createElement("p");
p2.textContent = `${num_players} Teams of 1`;

box.appendChild(p1);
box.appendChild(p2);

for (let i = 0; i < availableFmts.length; i++){

    const card = document.createElement("div");
    const heading = document.createElement("div");
    const text = document.createElement("div");
    const box = document.createElement("div");

    card.className = "team-card";

    if (i === 0){
        card.classList.add("doubles");
    } else {
        card.classList.add("triples");
    }

    heading.className = "team-card-heading";
    text.className = "team-card-text";
    box.className = "team-card-players-info";

    container.appendChild(card);

    card.appendChild(heading);
    card.appendChild(text);
    card.appendChild(box);

    heading.textContent = availableFmts[i];
    text.textContent = texts[i];

    const p1 = document.createElement("p");
    p1.textContent = teams;

    const p2 = document.createElement("p");
    p2.textContent = divisions[i];

    box.appendChild(p1);
    box.appendChild(p2);

}