import { TrainingSession, SportType } from "./trainingSession";

export class CyclingSession extends TrainingSession {

    constructor(date, notes, distance, duration, terrain, bikeUsed, airTemperature, weatherCondition) {
        super(date, notes, SportType.CYCLING);
        this.distance = distance;
        this.duration = duration;
        this.terrain = terrain; // road, mountain
        this.bikeUsed = bikeUsed;
        this.airTemperature = airTemperature;// Celcius
        this.weatherCondition = weatherCondition; // sunny ,clouddy, windy etc
    }
    getDetails() {
        return `${super.getDetails()}, Distance: ${this.distance} km, Duration: ${this.duration} mins, Terrain: ${this.terrain}, Bike: ${this.bikeUsed}, Air Temp: ${this.airTemperature}, Weather: ${this.weatherCondition}`;
    }
}