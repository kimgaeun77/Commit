const dropdownWrapper = document.querySelector(".header-dropdown");
const dropdownIcon = document.querySelector(".header-icon-drop");

let showDropdown = false;

const onClickDropdown = () => {
  if (!showDropdown) {
    dropdownWrapper.classList.add("show-dropdown");
    showDropdown = true;
  } else {
    dropdownWrapper.classList.remove("show-dropdown");
    showDropdown = false;
  }
};

dropdownIcon.addEventListener("click", onClickDropdown);
