let player_cards = document.querySelectorAll(".card");
let num_players;
let continue_btn = document.querySelector(".gold-btn");
let isSelected;

console.log(player_cards);

continue_btn.disabled = true;

player_cards.forEach(
    (button) => {
        button.addEventListener('click',(event)=> {

            let target_card;
            // Task ->
            // 1. Get the event card (target could be any of the three divs)
            // 2. Border if selected
            // 3. Only one can be selected at a time -> when adding on one card, remove from all others

            if (event.target.classList.contains("card")){
                target_card = event.target;
            }
            else {
                target_card = (event.target.parentElement);
            }
            
            if (target_card.classList.contains("selected")){
                target_card.classList.remove("selected");

                isSelected = false;
            } else {
                target_card.classList.add("selected");
                classes = target_card.classList;
                temp = classes[2];
                num_players = Number(temp.slice(0,1));
                console.log(num_players);

                for (card of player_cards){
                    if (card !== target_card){
                        if (card.classList.contains("selected")){
                            card.classList.remove("selected");
                        }
                    }
                }

                isSelected = true;
            }

                        
            if (!isSelected){
                continue_btn.disabled = true;
            } else {
                continue_btn.disabled = false;
            }

        })
    }
)


continue_btn.addEventListener('click', ()=>{
    if (isSelected){
        localStorage.setItem("num_players",num_players);
        if (num_players !== 4 && num_players !== 6){
            localStorage.setItem("selected_fmt","solo");
            window.location.href = "../pages/names.html"
        } else {
            window.location.href = "../pages/teams.html";
        }
    }
})