import { ClockModel } from './src/ClockModel';
import { ClockView } from './src/ClockView';
import { ClockController } from './src/ClockController';



const initialModels = [new ClockModel(new Date()), new ClockModel(new Date())];
const initialViews = initialModels.map(() => new ClockView());

const controller = new ClockController(initialModels, initialViews);



window.onload = () => {
  const modeButton = document.getElementById('modeButton');
  const increaseButton = document.getElementById('increaseButton');
  const lightButton = document.getElementById('lightButton');
  const addButton = document.getElementById('addButton');

  if (modeButton) {
    modeButton.addEventListener('click', () => controller.handleGlobalModeButton());
  }

  if (increaseButton) {
    increaseButton.addEventListener('click', () => controller.handleGlobalIncreaseButton());
  }

  if (lightButton) {
    lightButton.addEventListener('click', () => controller.handleGlobalLightButton());
  }

  if (addButton) {
    addButton.addEventListener('click', () => controller.addClock());
  }

 
  controller.updateView();
};
