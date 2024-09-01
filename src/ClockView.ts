export class ClockView {
  private backgroundColor: string;
  private isBlinking: boolean;

  constructor() {
    this.backgroundColor = "#FBE106";
    this.isBlinking = false;
  }

  render(clockElement: HTMLElement, currentTime: Date, isEditingHours: boolean, isEditingMinutes: boolean): void {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const hoursDisplay = isEditingHours && this.isBlinking ? '  ' : hours;
    const minutesDisplay = isEditingMinutes && this.isBlinking ? '  ' : minutes;

    const timeDisplay = `${hoursDisplay}:${minutesDisplay}:${seconds}`;

    clockElement.innerText = timeDisplay;
    clockElement.style.backgroundColor = this.backgroundColor;
  }

  toggleBackgroundColor(): void {
    this.backgroundColor = this.backgroundColor === '#FBE106' ? '#FFFFFF' : '#FBE106';
  }

  blink(isEditingHours: boolean, isEditingMinutes: boolean): void {
    if (isEditingHours || isEditingMinutes) {
      this.isBlinking = !this.isBlinking; 
    } else {
      this.isBlinking = false; 
    }
  }
}
