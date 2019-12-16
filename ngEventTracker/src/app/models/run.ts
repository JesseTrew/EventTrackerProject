export class Run {

  id: number;
  distance: number;
  duration: number;
  date: Date;

  constructor(distance?: number, duration?: number, date?: Date) {
      this.distance = distance;
      this.duration = duration;
      this.date = date;
  }
}
