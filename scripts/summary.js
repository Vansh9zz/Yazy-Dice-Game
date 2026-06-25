let num_players = Number(localStorage.getItem("num_players"));
let selected_fmt = localStorage.getItem("selected_fmt");
let player_names = localStorage.getItem("player_names").split(",");

let playersPerTeam = 0;

if (selected_fmt === "solo"){
    playersPerTeam = 1;
} else if (selected_fmt === "doubles"){
    playersPerTeam = 2;
} else {
    playersPerTeam = 3;
}

let num_teams = num_players/playersPerTeam;

document.querySelector(".summary-players-card-number").textContent = num_players;

let team_card_info = document.querySelector(".summary-teams-card-info");
let team_card_num = document.querySelector(".summary-teams-card-num");

if (playersPerTeam === 1){
    team_card_info.textContent = "SOLO";
    team_card_num.textContent = '';
} else {
    team_card_info.textContent = `TEAMS OF ${playersPerTeam}`;
    team_card_num.textContent = `${num_teams} TEAMS`;
}

let container = document.querySelector(".summary-team-card-containers");

let count = 0;
for (let i = 0; i < num_teams; i++){

    const card = document.createElement("div");
    card.classList.add("summary-team-card");
    card.classList.add(`t${i+1}`);
    card.style.margin = "1vmin";

    container.appendChild(card);

    if (playersPerTeam !== 1){
        const team_tag = document.createElement("div");
        team_tag.classList.add("summary-team-card-teamName");

        team_tag.textContent = `TEAM ${String.fromCharCode(i + 65)}:`;
        team_tag.style.display = "flex";
        team_tag.style.alignItems = "center";
        team_tag.style.paddingLeft = "5vmin";

        card.appendChild(team_tag);
    }



    for (let j = 0; j < playersPerTeam; j++){
        let name = document.createElement("div");
        name.classList.add("summary-team-card-playerName");

        name.textContent = player_names[count];
        name.paddingLeft = "10vmin";
        
        if (j === 1){
            name.paddingRight = "10vmin";
        }

        card.appendChild(name);

        count++;
    }

}

let playBtn = document.querySelector(".gold-btn");

playBtn.addEventListener('click', ()=>{
    window.location.href = "../pages/yazy.html";
})