function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close maudal event
closeModalBtn.addEventListener("click", function(e) {
  e.preventDefault ();
  closeModal();
  });
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Fermer la modale
function closeModal() {
  modalbg.style.display = "none";
}

// je récupère le prénom
const firstInput = document.getElementById("first");
// je récupère le nom
const lastInput = document.getElementById("last");
// je récupère l'email
const emailInput = document.getElementById("email");
// je récupère la date de naissance
const birthdateInput = document.getElementById("birthdate");
// je récupère le nombre de participations
const numberOfParticipationsInput = document.getElementById("quantity");
// je récupère les lieux de tournoi
const tournamentLocations = document.querySelectorAll(".checkbox-input[type=radio]");
// je récupère les CGU
const termsOfServiceInput = document.getElementById ("checkbox1");


// Vérifier les champs du formulaire
function checkFirstName() {
  const firstName = firstInput.value.trim();
  const checkName = /^[a-z ,.'-]+$/i;
  if (firstName.match(checkName) && firstName.length >= 2) {
    return true;
  } else {
    return false;
  }
}
function checkLastName() {
  const lastName = lastInput.value.trim();
  const checkName = /^[a-z ,.'-]+$/i;
  if (lastName.match(checkName) && lastName.length >= 2) {
    return true;
  } else {
    return false;
  }
}
function checkEmail() {
  const email = emailInput.value;
  const checkEmailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (email.trim().match(checkEmailFormat)) {
    return true;
  } else {
    return false;
  }
}
function checkBirthdate() {
  const birthdate = birthdateInput.value;
  const birthdateDate = new Date(birthdate); // Créer un nouvel objet Date
  if (birthdateDate instanceof Date && !isNaN(birthdateDate) && (new Date().getFullYear()-birthdateDate.getFullYear() >= 18)) { // Vérifier si birthdateDate est une instance de date correcte
    return true;
  } else {
    return false;
  }
}
function checkNumberOfParticipations() {
  const numberOfParticipations = numberOfParticipationsInput.value;
  const checkNumber = /^\d+$/;
  if (numberOfParticipations.trim().match(checkNumber)) {
    return true;
  } else {
    return false;
  }
} 
function checkTournamentLocations () {
  let isChecked = false;
  for (let i = 0; i < tournamentLocations.length; i++) {
    const locationInput = tournamentLocations[i];
    if (locationInput.checked === true) {
      isChecked = true;
      break;
    }
  }
  return isChecked;
}
function checkTermsOfService () {
  if (termsOfServiceInput.checked === true) {
    return true;
  } else {
    return false;
  }
  }
  
// récupérer la validation du formulaire 
document.getElementById ("inscriptionForm").addEventListener("submit", function(e){
const isFirstNameValid = checkFirstName();
const isLastNameValid = checkLastName();
const isEmailValid = checkEmail ();
const isBirthdateValid = checkBirthdate ();
const isNumberOfParticipationsValid = checkNumberOfParticipations();
const isTournamentLocationsValid = checkTournamentLocations();
const isTermsOfServiceValid = checkTermsOfService();

if (isFirstNameValid === false) {
  firstInput.parentElement.setAttribute("data-error-visible", true);
  firstInput.parentElement.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom")
} else {
  firstInput.parentElement.setAttribute("data-error-visible", false);
}

if (isLastNameValid === false) {
  lastInput.parentElement.setAttribute("data-error-visible", true);
  lastInput.parentElement.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom")
} else {
  lastInput.parentElement.setAttribute("data-error-visible", false);
}

if (isEmailValid === false) {
  emailInput.parentElement.setAttribute("data-error-visible", true);
  emailInput.parentElement.setAttribute("data-error", "Adresse électronique non valide")
} else {
  emailInput.parentElement.setAttribute("data-error-visible", false);
}
if (isBirthdateValid === false) {
  birthdateInput.parentElement.setAttribute("data-error-visible", true);
  birthdateInput.parentElement.setAttribute("data-error", "Vous devez entrer votre date de naissance")
} else {
  birthdateInput.parentElement.setAttribute("data-error-visible", false);
}
if (isNumberOfParticipationsValid === false) {
  numberOfParticipationsInput.parentElement.setAttribute("data-error-visible", true);
  numberOfParticipationsInput.parentElement.setAttribute("data-error", "Veuillez renseigner un nombre")
} else {
  numberOfParticipationsInput.parentElement.setAttribute("data-error-visible", false);
}
if (isTournamentLocationsValid === false) {
  tournamentLocations[0].parentElement.setAttribute("data-error-visible", true);
  tournamentLocations[0].parentElement.setAttribute("data-error", "Vous devez choisir une option")
} else {
  tournamentLocations[0].parentElement.setAttribute("data-error-visible", false);
}
if (isTermsOfServiceValid === false) {
  termsOfServiceInput.parentElement.setAttribute("data-error-visible", true);
  termsOfServiceInput.parentElement.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions")
} else {
  termsOfServiceInput.parentElement.setAttribute("data-error-visible", false);
}

// Nouveau modal pour confirmation de l'envoi du formulaire
const successModal = document.createElement("div");
successModal.innerHTML = `
<div class="content">
  <span class="successModalClose close"></span> 
  <div class="modal-body">
  Merci ! Votre réservation a été reçue.
  </div>
</div>
`
successModal.className = "successModal";
successModal.style.cssText = "display: none;position: fixed;z-index: 1;left: 0;top: 0;height:100%;width: 100%;overflow: auto;background-color: rgba(26, 39, 156, 0.4);"


const mainElement = document.getElementsByTagName("main")[0];
mainElement.appendChild(successModal);

if (isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isNumberOfParticipationsValid && isTournamentLocationsValid && isTermsOfServiceValid) {
  closeModal();
  successModal.style.display = "block";
}
const closeSuccessModalBtn = document.getElementsByClassName("successModalClose")[0];
closeSuccessModalBtn.addEventListener("click", function(e) {
  e.preventDefault();
  successModal.style.display = "none";
  });
// // je récupère le choix du tournoi
// const lastInput = document.getElementById("last");
// const lastName = lastInput.value;

// Empêcher le comportement par défaut du formulaire 
e.preventDefault();
console.log ;
})

