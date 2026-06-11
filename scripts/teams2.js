let team_cards = document.querySelectorAll(".team-card");
let selected_fmt;
let continue_btn = document.querySelector(".gold-btn");
let isSelected;

console.log(team_cards);

continue_btn.disabled = true;

team_cards.forEach(
    (button) => {
        button.addEventListener('click',(event)=> {

            let target_card = event.currentTarget;
            
            if (target_card.classList.contains("selected-fmt")){
                target_card.classList.remove("selected-fmt");

                isSelected = false;

            } else {
                target_card.classList.add("selected-fmt");
                let classes = target_card.classList;
                selected_fmt = classes[1];

                for (card of team_cards){
                    if (card !== target_card){
                        if (card.classList.contains("selected-fmt")){
                            card.classList.remove("selected-fmt");
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
        localStorage.setItem("selected_fmt",selected_fmt);
        window.location.href = "../pages/names.html";
    }
})