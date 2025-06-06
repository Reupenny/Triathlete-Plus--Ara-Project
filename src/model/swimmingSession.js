import { TrainingSession, SportType } from "./trainingSession";

export class SwimmingSession extends TrainingSession {
    constructor(date, notes, lapLength, strokeType, lapTimes, waterTemperature, sessionID) {
        super(date, notes, SportType.SWIMMING, sessionID);
        this.lapLength = lapLength; //Meters
        this.strokeType = strokeType;
        this.laps = lapTimes.length;
        this.lapTimes = lapTimes;
        this.waterTemperature = waterTemperature;// Celcius
    }
    getDetails() {
        return `${super.getDetails()}, Lap Length: ${this.lapLength}, Stroke: ${this.strokeType}, Laps: ${this.laps}, Water Temp: ${this.waterTemperature}`;
    }

    getTotalDistance() {
        // Calculates the total length of swimming in Km
        return ((this.lapLength * this.laps) / 1000);
    }

    getTotalDuration() {
        // Calculates total time swimming 
        return this.lapTimes.reduce((sum, time) => sum + time, 0) / 60;
    }
}
