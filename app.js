let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turn = true; //turn and turnX-> false

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//when we press the reset button note the changes that need to be done like the turn again gets back to one of the player, the box becomes empty, the boxes are then enbaled and winning msg is removed

const reset = () => {
    turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const draw = () => {
    msg.innerText = "Draw!!!";
    msgContainer.classList.remove("hide");
}

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn){  //here playerO turn
            box.style.color = "red";
            box.innerText = "O";
            turn = false;
            count++;
        } else {  //playerX turn
            box.style.color = "blue"
            box.innerText = "X";
            turn = true;
            count++;
        }
        box.disabled = true;
        if (count === 9){
            draw();
        }
        
        checkWinner();
    });
    
});

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

//diasabling all other boxes once the winner is found
const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations!, ${winner} is the Winner`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


//this function checks the winner by matching with the win Pattern
const checkWinner = () => {
    for (let pattern of winPattern){
        //storing the text from the respective boxes
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

resetBtn.addEventListener("click", reset);







