
function checkPlayer(p1, p2) {
    if (p1 == p2) {
         check = x;
    } else {
         check = o;
    }
    return check;
}

function AIplay() {

    cloneO = o.clone();
    let cont = 0;
    let fill = 0;

    for (let i = 0; i < blck.length; i++) {

        let randomChoice = Math.floor(Math.random() * 5);
        //só preenche se o filho estiver vazio
        if (blck.eq(i).children().length == 0) {
            if (randomChoice <= 1) {
                blck.eq(i).append(cloneO);
                cont++;
                break;
            }
            //checa quantas estao preenchidas
        } else {
            fill++;
        }
    }

    if (cont == 0 && fill < 9) {
        AIplay();
    }

}

function winCheck() {
    let cont = 0;

    let classesFilhos = [];
    for (let i = 1; i <= 9; i++) {
        let filho = $("#blck" + i).children().attr("class");
        classesFilhos.push(filho);
    }

    console.log(classesFilhos);

    if (classesFilhos[0] == "x" && classesFilhos[1] == "x" && classesFilhos[2] == "x" ||
        classesFilhos[3] == "x" && classesFilhos[4] == "x" && classesFilhos[5] == "x" ||
        classesFilhos[6] == "x" && classesFilhos[7] == "x" && classesFilhos[8] == "x" ||
        classesFilhos[0] == "x" && classesFilhos[3] == "x" && classesFilhos[6] == "x" ||
        classesFilhos[1] == "x" && classesFilhos[4] == "x" && classesFilhos[7] == "x" ||
        classesFilhos[2] == "x" && classesFilhos[5] == "x" && classesFilhos[8] == "x" ||
        classesFilhos[0] == "x" && classesFilhos[4] == "x" && classesFilhos[8] == "x" ||
        classesFilhos[2] == "x" && classesFilhos[4] == "x" && classesFilhos[6] == "x") {
        vencedor("x");
    } else if (classesFilhos[0] == "o" && classesFilhos[1] == "o" && classesFilhos[2] == "o" ||
        classesFilhos[3] == "o" && classesFilhos[4] == "o" && classesFilhos[5] == "o" ||
        classesFilhos[6] == "o" && classesFilhos[7] == "o" && classesFilhos[8] == "o" ||
        classesFilhos[0] == "o" && classesFilhos[3] == "o" && classesFilhos[6] == "o" ||
        classesFilhos[1] == "o" && classesFilhos[4] == "o" && classesFilhos[7] == "o" ||
        classesFilhos[2] == "o" && classesFilhos[5] == "o" && classesFilhos[8] == "o" ||
        classesFilhos[0] == "o" && classesFilhos[4] == "o" && classesFilhos[8] == "o" ||
        classesFilhos[2] == "o" && classesFilhos[4] == "o" && classesFilhos[6] == "o") {
        vencedor("o");
    } else {
        for (let i = 0; i < classesFilhos.length; i++) {
            if (classesFilhos[i] == "x" || classesFilhos[i] == "o") {
                cont++;
            }
        }
        if (cont == 9) {
            vencedor();
        }
    }
}

function vencedor(winner) {

    if (winner == "x") {
        scoreX++;
        $(".msg").html("Player 1 won the round, congrats!");
        $(".msg-container").fadeIn();
        $(".score-count-x").html(scoreX);
    } else if (winner == "o") {
        scoreO++;
        $(".msg").html("Player 2 won the round, congrats!");
        $(".msg-container").fadeIn();
        $(".score-count-o").html(scoreO);
    } else {
        $(".msg").html("DRAW!");
        $(".msg-container").fadeIn();
    }

    setTimeout(function () {
        $(".msg-container").fadeOut();
    }, 3000)

    p1 = 0;
    p2 = 0;

    let cleanBlck = $(".blck div");

    for (let i = 0; i < cleanBlck.length; i++) {
        setTimeout(function () {
            cleanBlck.eq(i).remove();
        }, 3000);
    }
}

let x = $(".x");
let o = $(".o");
let blck = $(".blck");
let scoreX = 0;
let scoreO = 0;
let buttons = $(".buttons button");
let secondPlayer;

// contador de jogadas
let p1 = 0;
let p2 = 0;


for (let i = 0; i < blck.length; i++) {

    $(blck.eq(i)).click(function () {

        let check = checkPlayer(p1, p2);

        if ($(this).children().length == 0) {

            let checkClone = check.clone();

            $(this).append(checkClone);

            if (p1 == p2) {
                p1++;
                if(secondPlayer == "ai-btn") {

                    setTimeout(function () {
                        AIplay();
                        winCheck();
                    }, 400);
                    
                    p2++;
                }
            } else {
                p2++;
            }

            winCheck();

        }
    })
}

for (let i = 0; i < buttons.length; i++) {
    
    $(buttons[i]).click(function(){
        secondPlayer = $(this).attr("class");
        $(".game-container").removeClass("hide");
    })
}