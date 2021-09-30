import { ShowToast } from "../interfaces/ShowToast";

export const showToast = ( toastConf: ShowToast ) => {
  const { duration, iconHexColor, message, title } = toastConf;
  const $toast = document.getElementById('toast')!;
  
  $toast.querySelector('#toast-icon-color')!.setAttribute('fill', iconHexColor);
  $toast.querySelector('#toast-title')!.innerHTML = title;
  $toast.querySelector('#toast-message')!.innerHTML = message;
  $toast.classList.add('animate__animated');
  $toast.classList.add('animate__bounceInLeft');
  $toast.classList.add('show');
  
  setTimeout(() => {
    $toast.classList.remove('animate__animated');
    $toast.classList.remove('animate__bounceInLeft');
    $toast.classList.add('animate__animated');
    $toast.classList.add('animate__backOutLeft');
  }, duration)
};