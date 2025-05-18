import { TrainingSession, SportType } from "./trainingSession";

export class RunningSession extends TrainingSession {

    constructor(date, notes, distance, duration, shoesUsed, airTemperature, weatherCondition) {
        super(date, notes, SportType.RUNNING);
        this.distance = distance; // Km
        this.duration = duration; // Mins
        this.shoesUsed = shoesUsed;
        this.airTemperature = airTemperature; // celcius
        this.weatherCondition = weatherCondition; // sunny ,clouddy, windy etc
    }
    getDetails() {
        return `${super.getDetails()}, Distance: ${this.distance} km, Duration: ${this.duration} mins, Shoes: ${this.shoesUsed}, Air Temp: ${this.airTemperature}, Weather: ${this.weatherCondition}`;
    }
}