import { TrainingSession, SportType } from "./trainingSession";

export class SwimmingSession extends TrainingSession {
    constructor(date, notes, lapLength, strokeType, lapTimes, waterTempiture) {
        super(date, notes, SportType.SWIMMING);
        this.lapLength = lapLength; //Meters
        this.strokeType = strokeType;
        this.laps = lapTimes.length;
        this.lapTimes = lapTimes;
        this.waterTempiture = waterTempiture;// celcius
    }
    getDetails() {
        return `${super.getDetails()}, Lap Length: ${this.lapLength}, Stroke: ${this.strokeType}, Laps: ${this.laps}, Water Temp: ${this.waterTempiture}`;
    }

    getTotalDistance() {
        return (this.lapLength * this.laps) / 100;
    }

    getTotalDuration() {
        return this.lapTimes.reduce((sum, time) => sum + time, 0);
    }
}
