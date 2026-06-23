// Getting important ui elements
let rollBtn = document.querySelector("#roll-btn");
let dies = document.querySelectorAll(".dice-img");

let tableRows = document.querySelectorAll("tr");

let playerTotalRow = tableRows[14];
let teamTotalRow = tableRows[15];

let scoreRows = [...tableRows].slice(2,14);
let scoreCells = document.querySelectorAll(".score");

// Backend variables
let currTurn = 0;
let dies_vals = [0,0,0,0,0];
let isLocked = [false, false, false, false, false];
let num_rolls = 0;

let scores = [];
let category_taken = [];

let availableScores = [0,0,0,0,0,0,0,0,0,0,0,0];

let isRunning = true;
let num_rounds = 1;

let luckyNumber = Math.floor(Math.random()*16) + 9;
let num_lucky = 0;


for (let i = 0; i < num_players; i++){
    let temp = [];
    let temp2 = [];
    for (let j = 0; j < 12; j++){
        temp.push(0);
        temp2.push(false);
    }
    scores.push(temp);
    category_taken.push(temp2);
}

// Event listener for dies

for (let dice of dies){

    dice.addEventListener('click',(event)=>{

        if (!isRunning){
            return;
        }

        let dice_index = Number(dice.id.slice(-1)) - 1;
        if (dice.classList.contains("locked-dice") && num_rolls > 0 && num_rolls < 4){
            dice.classList.remove("locked-dice");
            isLocked[dice_index] = false;
        } else if (num_rolls > 0 && num_rolls < 4){
            dice.classList.add("locked-dice");
            isLocked[dice_index] = true;
        }

        if (isLocked.includes(false) && num_rolls > 0 && num_rolls < 3){
            rollBtn.disabled = false;
        } else if (num_rolls > 0 && num_rolls < 3){
            rollBtn.disabled = true;
        }

    })

}

// Event listener for roll-btn

// 1. Generate dice values (only for the unlocked dies)
// 2. Display dice values

// 3. Calculate the scores available
// 4. Display the scores for the correct player

// 5. Limiting to 3 rolls per player
// 6. If all dies are locked, roll button is disabled

// 7. Adding the "clickable" class to the right cells (exclude those cells which are already chosen)

// Validations for roll-btn
// Disable roll-btn when:
//  1. 3 rolls are done
//  2. All dies are locked
//  3. The game is over


rollBtn.addEventListener('click',()=>{
    console.log(luckyNumber);
    if (!isRunning){
        rollBtn.disabled = true;
        return;
    }

    if (!rollBtn.disabled){
        // Task 1
        for (let i = 0; i < 5; i++){
            if (!isLocked[i] && num_rolls !== 0){
            dies_vals[i] = Math.floor(Math.random()*6) + 1;
            } else if (num_rolls === 0){
                dies_vals[i] = Math.floor(Math.random()*6) + 1;
            }
        }

        // Task 2
        for (let i = 0; i < 5; i++){
            dies[i].src = `../assets/dice/d${dies_vals[i]}.png`;
        }

        // Task 3 - Score Calculation

        let counts = [0,0,0,0,0,0];
        let dieSum = dies_vals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let d = dies_vals.toSorted((a,b)=> a-b);


        // Ones to Sixes
        for (let i = 1; i < 7; i ++){

            if (!category_taken[currTurn][i-1]){
                counts[i-1] = d.filter(item => item === i).length; 
                availableScores[i-1] = i * counts[i-1];
            }

        }

        let usableIndex = null;

        // AAA

        if (!category_taken[currTurn][6]){
            for (let i = 0; i < 6; i++){
                if (counts[i] >= 3){
                    usableIndex = i;
                }
            }

            if (usableIndex !== null){
                availableScores[6] = dieSum;
            } else {
                availableScores[6] = 0;
            }
       }

       // AAAA
       usableIndex = null;
        if (!category_taken[currTurn][7]){
            for (let i = 0; i < 6; i++){
                if (counts[i] >= 4){
                    usableIndex = i;
                }
            }

            if (usableIndex !== null){
                availableScores[7] = dieSum;
            } else {
                availableScores[7] = 0;
            }
       }
       
        // AAABB
        let tempCounts = counts.toSorted((a,b) => a-b);

        if (!category_taken[currTurn][8]){
            if (tempCounts.toString() === "0,0,0,0,2,3"){
                availableScores[8] = 25;
                console.log("Yes");
            } else {
                availableScores[8] = 0;
            }
        }

        // ABCDE
        if (!category_taken[currTurn][9]){

            if (d.toString() === "1,2,3,4,5" || d.toString() === "2,3,4,5,6"){
                availableScores[9] = 40;
            } else {
                availableScores[9] = 0;
            }

        }

        // Yazy
        if (!category_taken[currTurn][10]){
            if (tempCounts.toString() === "0,0,0,0,0,5"){
                availableScores[10] = 50;
            } else {
                availableScores[10] = 0;
            }
        }

        // Lucky Number
        if (!category_taken[currTurn][11]){
            if (dieSum === luckyNumber){
                num_lucky++;
                if (num_lucky === 1){
                    availableScores[11] = 50;
                } else if (num_lucky === 2){
                    availableScores[11] = 40;
                } else if (num_lucky === 3){
                    availableScores[11] = 30;
                } else {
                    availableScores[11] = 10;
                }

                let temp = Math.floor(Math.random()*16)+9;

                while (temp === luckyNumber){
                    let temp = Math.floor(Math.random()*16)+9;
                }
                luckyNumber = temp;

            } else {
                availableScores[11] = 0;
            }
        }

        // Task 4
        let currPlayerCells = document.querySelectorAll(`.player${currTurn+1}`);
        let scoreCells = document.querySelectorAll(".score");
    
        let temp = [];
        for (let cell of currPlayerCells){
            temp.push(cell);
        }
        for (let i = 0; i < 12; i++){
            if (!category_taken[currTurn][i]){
                currPlayerCells[i].textContent = availableScores[i];
            }
        }

        // Task 7
        for (let cell of scoreCells){
            if (temp.includes(cell) && !cell.classList.contains("isTaken")){
                cell.classList.add("clickable");
            } else {
                cell.classList.remove("clickable");
            }
        }


        num_rolls++;
            
        if (num_rolls === 3){
            rollBtn.disabled = true;
        }
    }

})

// Event listeners for score cells

// 1. Change the currTurn - DONE
// 2. Change the round no in case its the last player - DONE
// 3. Set the text on the target cell permanent and remove the text from the others - DONE
// 4. Update the scores array and the category_taken array - DONE
// 5. Reset the num_rolls - DONE
// 6. Reset the isLocked - DONE
// 7. Reset the dice and dies_vals - DONE
// 8. Reset locked borders for each dice - DONE
// 9. Make sure only the right players' cells work - DONE
// 10. Reset the availableScores - DONE
// 11. Update the playerTotal - DONE
// 12. Update the teamTotal - DONE
// 13. Removing clickable class wherever needed
// 14. Updating which cells have the turn class



for (let cell of scoreCells){

    cell.addEventListener('click', (event)=>{

        if (!isRunning){
            return;
        }

        if (!cell.classList.contains("clickable")){
            return;
        }
        console.log("clicked");
        cell.classList.add("isTaken");

        // Task 4
        let id = Number(cell.id.slice(4));

        let category_idx = Math.floor(id/num_players);

        scores[currTurn][category_idx] = availableScores[category_idx];
        category_taken[currTurn][category_idx] = true;

        // Task 11
        let total = scores[currTurn].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        playerTotalRow.cells[currTurn+1].textContent = total;

        // Task 12
        if (selected_fmt !== "solo"){
            let currTeam = (Number(cell.classList[0].slice(-1))) - 1;
            let teamTotal = 0;

            for (let i = 0; i < playersPerTeam; i++){
                let idx = currTeam * playersPerTeam + i;
                
                teamTotal += scores[idx].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            }

            teamTotalRow.cells[currTeam + 1].textContent = teamTotal;

        }


        // Tasks 5,6
        isLocked = [false, false, false, false, false];
        num_rolls = 0;
        rollBtn.disabled = false;

        // Task 7
        for (let dice of dies){
            dice.src = "../assets/dice/empty_dice.png";
        }    

        for (let i = 0; i < 5; i++){
            dies_vals[i] = 0;
        }    

        // Task 8
        for (let dice of dies){
            dice.classList.remove("locked-dice");
        }    

        // Task 3
        for (let cell of scoreCells){
            if (!cell.classList.contains("isTaken")){
                cell.textContent = "";
            }
        }    


        // Task 1
        currTurn = (currTurn + 1) % num_players;

        // Task 2
        if (currTurn === 0){
            num_rounds++;
            let num_round = document.querySelector("#num_rounds");
            if (num_rounds <= 12){
                num_round.textContent = Number(num_round.textContent) + 1;
            } else {
                isRunning = false;

                let playerTotals = [];
                let teamTotals = [];

                for (let i = 1; i <= num_players; i++){
                    playerTotals.push(Number(playerTotalRow.cells[i].textContent))
                }

                for (let i = 1; i <= numTeams; i++){
                    playerTotals.push(Number(teamTotalRow.cells[i].textContent))
                }

                localStorage.setItem("player_totals", playerTotals);
                localStorage.setItem("team_totals", teamTotals);

                window.location.href = "../pages/winner.html";
            }
        }

        // Task 10
        availableScores = [0,0,0,0,0,0,0,0,0,0,0,0];

        // Task 13 
        for (let cell of scoreCells){
            cell.classList.remove("clickable");
        }

        for (let cell of scoreCells){
            if (cell.classList.contains(`player${currTurn+1}`)){
                cell.classList.add("turn");
            }   else {
                cell.classList.remove("turn");
            }

        }

    })



}
