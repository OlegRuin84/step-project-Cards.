export function paragraphDisplay (num) {
    let arg ;
    if (num > 0){
        arg = "none";
    }else{
        arg = "block";
    }
    let p = document.getElementById('paragraphText');
    p.style.display = `${arg}`;

    }
