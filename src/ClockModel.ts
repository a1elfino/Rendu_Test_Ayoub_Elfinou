export class ClockModel {
  private currentTime: Date;
  private isEditingHours: boolean;
  private isEditingMinutes: boolean;


  constructor(initialTime: Date, timeZoneOffset: number = 0) {
    this.currentTime = new Date(initialTime.getTime() + timeZoneOffset * 3600 * 1000);
    this.isEditingHours = false;
    this.isEditingMinutes = false;
  }

  incrementHours(): void {
    const hours = this.currentTime.getHours();
    this.currentTime.setHours((hours + 1) % 24);
  }

  incrementMinutes(): void {
    const minutes = this.currentTime.getMinutes();
    this.currentTime.setMinutes((minutes + 1) % 60);
    if (minutes === 59) {
      this.incrementHours();
    }
  }

  incrementSeconds(): void {
    const seconds = this.currentTime.getSeconds();
    this.currentTime.setSeconds((seconds + 1) % 60);
    if (seconds === 59) {
      this.incrementMinutes(); 
    }
  }

  toggleEditingMode(): void {
    if (!this.isEditingHours && !this.isEditingMinutes) {
      this.isEditingHours = true;
    } else if (this.isEditingHours) {
      this.isEditingHours = false;
      this.isEditingMinutes = true;
    } else if (this.isEditingMinutes) {
      this.isEditingMinutes = false;
    }
  }

  getCurrentTime(): Date {
    return this.currentTime;
  }

  isEditingHourMode(): boolean {
    return this.isEditingHours;
  }

  isEditingMinuteMode(): boolean {
    return this.isEditingMinutes;
  }
}
