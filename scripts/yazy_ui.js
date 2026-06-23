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

let numTeams = Number(num_players)/playersPerTeam;

function populateBoard(){
    let tableRows = document.querySelectorAll("tr");

    // Populating the team name row
    if (selected_fmt === "solo"){
        tableRows[0].style.display = "none";
    } else {
        const emptyTd = document.createElement("td");
        tableRows[0].appendChild(emptyTd);
        for (let td = 0; td < numTeams; td++){

            const teamName = document.createElement("td");
            teamName.classList.add(`team${td+1}`);
            teamName.colSpan = playersPerTeam;
            teamName.textContent = `Team ${String.fromCharCode(td+65)}`;

            tableRows[0].appendChild(teamName);
        }
    }

    // Populating the name row
    for (let td = 0; td < num_players; td++){
        const playerName = document.createElement("td");
        playerName.classList.add(`team${Math.floor((td)/playersPerTeam)+1}`);
        playerName.textContent = player_names[td];

        tableRows[1].appendChild(playerName);
    }

    let count = 0;
    // Populating the score rows
    for (let tr = 2; tr < 14; tr++){

        const tableRow = tableRows[tr];
        for (let td = 0; td < num_players; td++){
            const scoreCell = document.createElement("td");
            scoreCell.classList.add(`team${Math.floor((td)/playersPerTeam)+1}`);
            scoreCell.classList.add(`team${Math.floor((td)/playersPerTeam)+1}-btn`);
            scoreCell.classList.add(`player${td+1}`);
            scoreCell.classList.add("score");

            if (td === 0){
                scoreCell.classList.add("turn");
            }

            scoreCell.id = `cell${count}`;

            tableRow.appendChild(scoreCell);
            count++;
        }

    }

    // Populating the player total row
    for (let td = 0; td < num_players; td++){
        const playerTotal = document.createElement("td");
        playerTotal.classList.add(`team${Math.floor((td)/playersPerTeam)+1}`);
        playerTotal.textContent = 0;

        tableRows[14].appendChild(playerTotal);
    }   

    // Populating the team total row
    if (selected_fmt === "solo"){
        tableRows[15].style.display = "none";
    } else {

        for (let td = 0; td < numTeams; td++){

            const teamTotal = document.createElement("td");
            teamTotal.classList.add(`team${td+1}`);
            teamTotal.colSpan = playersPerTeam;
            teamTotal.textContent = 0;

            tableRows[15].appendChild(teamTotal);
        }
    }

}

populateBoard();