import { ClockModel } from './ClockModel';
import { ClockView } from './ClockView';

export class ClockController {
  private models: ClockModel[];
  private views: ClockView[];
  private intervalId: ReturnType<typeof setInterval> | undefined;
  private blinkIntervalId: ReturnType<typeof setInterval> | undefined;

  constructor(models: ClockModel[], views: ClockView[]) {
    this.models = models;
    this.views = views;

   
    this.intervalId = setInterval(() => {
      this.updateAllClocks();
      this.updateView();
    }, 1000);
  }
  public removeClock(index: number): void {
    if (index >= 0 && index < this.models.length) {
      this.models.splice(index, 1);
      this.views.splice(index, 1);
      this.updateView(); 
    }
  }
  public addClock(timeZoneOffset: number = 0): void {
    const newModel = new ClockModel(new Date(), timeZoneOffset);
    const newView = new ClockView();
    this.models.push(newModel);
    this.views.push(newView);
    this.updateView(); 
  }
  
  

  public handleGlobalModeButton(): void {
    this.models.forEach(model => model.toggleEditingMode());
    this.setupBlinking();
    this.updateView();
  }

  public handleGlobalIncreaseButton(): void {
    this.models.forEach(model => {
      if (model.isEditingHourMode()) {
        model.incrementHours();
      } else if (model.isEditingMinuteMode()) {
        model.incrementMinutes();
      }
    });
    this.updateView();
  }

  public handleGlobalLightButton(): void {
    this.views.forEach(view => view.toggleBackgroundColor());
    this.updateView();
  }

  private updateAllClocks(): void {
    this.models.forEach(model => model.incrementSeconds());
    this.updateView(); 
  }

  public updateView(): void {
    const clocksContainer = document.getElementById('clocks-container');
    if (clocksContainer) {
      clocksContainer.innerHTML = '';
      this.models.forEach((model, index) => {
        const clockElement = document.createElement('div');
        clockElement.className = 'clock';
  
        
        this.views[index].render(clockElement, model.getCurrentTime(), model.isEditingHourMode(), model.isEditingMinuteMode());
  
        
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => {
          this.removeClock(index);
        };
  
        clockElement.appendChild(removeButton);
        clocksContainer.appendChild(clockElement);
      });
    }
  }

  private setupBlinking(): void {
    if (this.blinkIntervalId) {
      clearInterval(this.blinkIntervalId);
    }
  
    const anyEditing = this.models.some(model => model.isEditingHourMode() || model.isEditingMinuteMode());
    if (anyEditing) {
      this.blinkIntervalId = setInterval(() => {
        this.models.forEach((model, index) => {
          const isEditingHours = model.isEditingHourMode();
          const isEditingMinutes = model.isEditingMinuteMode();
          this.views[index].blink(isEditingHours, isEditingMinutes);
        });
        this.updateView();
      }, 200); 
    }
  }
}
