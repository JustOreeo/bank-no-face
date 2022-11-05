function disableButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add("disable");
}

function enableButton(elementID) {
  const button = document.getElementById(elementID);
  button.classList.remove("disable");
}

export { disableButton, enableButton };
