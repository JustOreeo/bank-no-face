const disableButton = (buttonId) => {
  const button = document.getElementById(buttonId);
  button.classList.add("disable");
}

const enableButton = (elementID) => {
  const button = document.getElementById(elementID);
  button.classList.remove("disable");
}

export { disableButton, enableButton };
