let time = 2000;
let t = 0;
let flag = 1;
let leftPos = 800;
let accerelate = 5;
let hit = 0;
let turn = true;
let div = document.createElement("div");
let score = 0;
div.classList.add("obstacle");
document.querySelector("section.mainRoad").appendChild(div);
velacity(div);
hearts(0);
function initialization() {
    time = 2000;
    t = 0;
    flag = 1;
    leftPos = 800;
    accerelate = 5;
    turn = true;
    velacity(div);


}

function goUp() {
    flag = 0;
    $(".ghost").animate(
        {
            top: '50px',
            left: '+=10px'
        }
        , 300, goDown);

}
function goDown() {
    $(".ghost").animate({
        top: '160px',
        left: '-=10px'
    }, 300, changeFlag);
    function changeFlag() {
        flag = 1;
    }
}


function isSpace(e) {
    if (e.code == "Space") {
        goUp();
    }

}




function velacity(div) {

    div.style.left = leftPos + "px";
    let v = 900 / time;
    let incTime = setInterval(increment, 1);
    flag = 1;
    $(".ghost svg").css("color", "white");
    function increment() {
       
        t += accerelate;
        score++;
        // console.log("t is :" + t);
        document.getElementsByClassName("points")[0].innerHTML = score;
        if (score > 8000) {
            accerelate = 10;
        } else if (score > 4000) {
            accerelate = 8;
        } else if (score > 2000) {
            accerelate = 7;
        } else if (score > 1000) {
            accerelate = 6;
        }
        let pos = v * t ;
        leftPos = (700 - pos);
        div.style.left = leftPos + "px";
        // console.log(flag);
        if (pos > 540 && pos < 700) {
            if (flag == 1) {
                $(".ghost svg").css("color", "red");
                hit++;
                hearts(hit);
                flag = 0;

            }
        } else if (leftPos < -100 && turn == true && hit<3) {
            turn = false;
            clearInterval(incTime);
            initialization();
        }
        if(hit==3){
            clearInterval(incTime);
        }
    }
}




function hearts(hit) {
    let arr = document.getElementsByClassName("fa-heart");
    if (hit == 0) {
        for (let i = 0; i < 3; i++) {
            let heart = document.createElement("i");
            heart.classList.add("fas");
            heart.classList.add("fa-heart")
            document.getElementsByClassName("hearts")[0].appendChild(heart);
        }
    } else if (hit < 3) {
        arr[3 - hit].classList.add("far");
        arr[3 - hit].classList.remove("fas");

    }
    else {
        arr[0].classList.add("far");
        arr[0].classList.remove("fas");
        gameOver();
    }
}


function gameOver() {
    let div=document.getElementById("GO");
    div.classList.add("gameover");
    document.getElementById("finalscore").innerHTML = score;
}



$(".jumper").mousedown(goUp);
window.addEventListener("keydown", isSpace, false);
