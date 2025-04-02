import { TrainingSession, SportType } from "./trainingSession";

export class RunningSession extends TrainingSession {

    constructor(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition) {
        super(date, notes, SportType.RUNNING);
        this.distance = distance; // Km
        this.duration = duration; // Mins
        this.shoesUsed = shoesUsed;
        this.airTempiture = airTempiture; // celcius
        this.weatherCondition = weatherCondition; // sunny ,clouddy, windy etc
    }
    getDetails() {
        return `${super.getDetails()}, Distance: ${this.distance} km, Duration: ${this.duration} mins, Shoes: ${this.shoesUsed}, Air Temp: ${this.airTempiture}, Weather: ${this.weatherCondition}`;
    }
}