import './index.css';
import { ClockModel } from './ClockModel';
import { ClockView } from './ClockView';
import { ClockController } from './ClockController';


const models: ClockModel[] = [new ClockModel(new Date())];
const views: ClockView[] = [new ClockView()];
const controller = new ClockController(models, views);



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
    addButton.addEventListener('click', () => {
      
      const timeZoneOffset = parseInt(prompt('Enter timezone offset in hours:', '0') || '0');
      controller.addClock(timeZoneOffset);
    });
  }

  
  controller.updateView();
};
