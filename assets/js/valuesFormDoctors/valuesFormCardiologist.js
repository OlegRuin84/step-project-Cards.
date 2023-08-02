function valuesFormCardiologist (arg){
    let listInputLogin = document.querySelectorAll(".input-login");
        listInputLogin[0].value = arg.goalVisit;
        listInputLogin[1].value = arg.namePatient;
        listInputLogin[2].value = arg.age
    document.querySelector(".textarea").value = arg.descriptionVisit;
    document.querySelector(".select-urgency").value = arg.changeUrgency;
    document.querySelector(".select-status").value = arg.changeStatus;
    document.querySelector(".create-card").textContent = "Змінити"
}

export default valuesFormCardiologist