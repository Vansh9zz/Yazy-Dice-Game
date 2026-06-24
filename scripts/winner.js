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

let winningTeam = localStorage.getItem("winning_team");

let winningScore = localStorage.getItem("winning_score");

if (winningTeam) {
  document.querySelector("#winner-name").textContent = winningTeam;
}

if (winningScore) {
  document.querySelector(".final-score").textContent = `${winningScore} Points`;
}

document.querySelector("#play-again").addEventListener("click", () => {
  window.location.href = "../pages/players.html";
});

document.querySelector("#home-btn").addEventListener("click", () => {
  window.location.href = "../index.html";
});


if (selected_fmt !== "solo") {
  let membersDiv = document.querySelector("#team-members");

  membersDiv.innerHTML = `<p class="team-label">Team Members</p>`;

  let teamNo = Number(winningTeam.charCodeAt(5)) - 64;
  console.log(teamNo);

  let startIdx = (teamNo - 1) * playersPerTeam;
  console.log(startIdx);

  for (let i = 0; i < playersPerTeam; i++) {
    let p = document.createElement("p");

    p.classList.add("team-member");

    p.textContent = player_names[startIdx + i];

    membersDiv.appendChild(p);
  }
}
