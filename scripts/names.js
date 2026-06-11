let num_players = Number(localStorage.getItem("num_players"));
let selected_fmt = localStorage.getItem("selected_fmt");
let num_cards = 0;
let playersPerTeam = 0;

if (selected_fmt === "solo"){
    num_cards = num_players;
    playersPerTeam = 1;
} else if (selected_fmt === "doubles"){
    num_cards = num_players/2;
    playersPerTeam = 2;
} else {
    num_cards = num_players/3;
    playersPerTeam = 3;
}

// Creating card-rows
let container = document.querySelector(".name-cards-row-container");

let num_boxes = (num_cards < 4) ? 1 : 2;
let boxes = [];

for (let box = 0; box < num_boxes; box++){

    const row = document.createElement("div");
    row.classList.add("name-cards-row");

    container.appendChild(row);
    boxes.push(row);

}

// Creating cards
// let boxes = document.querySelectorAll(".name-cards-row");
let count = 1;
for (let i = 0; i < num_cards; i++){
    
    const card = document.createElement("div");
    card.classList.add("name-card");

    // Each card should have :
    // 1. A class representing the team
    // 2. Input fields for names

    let target_box = boxes[Math.floor(i/3)];

    card.classList.add(`t${i+1}`);

    const card_heading = document.createElement("div");
    card_heading.classList.add("name-card-heading");

    card_heading.textContent = `TEAM ${String.fromCharCode(i+65)}`;

    card.appendChild(card_heading);

    // Input fields
    for (let j = 0; j < playersPerTeam; j++){
        const ip = document.createElement("input");

        ip.setAttribute("type","text");
        ip.setAttribute("value", `Player ${count}`);

        ip.classList.add("name-card-input")
        ip.classList.add(`t${i+1}-input`);
        
        card.appendChild(ip);
        count++;

    }

    target_box.appendChild(card);
}

let continueBtn = document.querySelector(".gold-btn");
let playerNames = [];

// Storing Values (using continueBtn)

continueBtn.addEventListener('click',()=>{
    let inputs = document.querySelectorAll(".name-card-input");
    console.log(inputs);

    for (let i = 0; i < num_players; i++){
        playerNames[i] = (inputs[i].value);
    }

    localStorage.setItem("player_names",playerNames);
    window.location.href = "../pages/summary.html";
});