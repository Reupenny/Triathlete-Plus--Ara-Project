import { TrainingSession, SportType } from "./trainingSession";

export class RunningSession extends TrainingSession {

    constructor(date, notes, distance, duration, shoesUsed, airTemp, weather, sessionID) {
        super(date, notes, SportType.RUNNING, sessionID);
        this.distance = distance; // Km
        this.duration = duration; // Mins
        this.shoesUsed = shoesUsed;
        this.airTemp = airTemp; // celcius
        this.weather = weather; // sunny ,clouddy, windy etc
    }
    getDetails() {
        return `${super.getDetails()}, Distance: ${this.distance} km, Duration: ${this.duration} mins, Shoes: ${this.shoesUsed}, Air Temp: ${this.airTemp}, Weather: ${this.weather}`;
    }
}