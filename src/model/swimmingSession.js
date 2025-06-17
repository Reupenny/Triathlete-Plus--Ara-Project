import { TrainingSession, SportType } from "./trainingSession";

export class SwimmingSession extends TrainingSession {
    constructor(date, notes, lapLength, strokeType, lapTimes, waterTemp, sessionID) {
        super(date, notes, SportType.SWIMMING, sessionID);
        this.lapLength = lapLength; //Meters
        this.strokeType = strokeType;
        this.laps = lapTimes.length;
        this.lapTimes = lapTimes;
        this.waterTemp = waterTemp;// Celcius
    }

    get lapTimesData() {
        return this.lapTimes;
    }

    getDetails() {
        return `${super.getDetails()}, Lap Length: ${this.lapLength}, Stroke: ${this.strokeType}, Laps: ${this.laps}, Water Temp: ${this.waterTemp}`;
    }

    getTotalDistance() {
        // Calculates the total length of swimming in Km
        return ((this.lapLength * this.laps) / 1000);
    }

    getTotalDuration() {
        // Calculates total time swimming 
        return this.lapTimesData.reduce((sum, time) => sum + time, 0) / 60;
    }
}
