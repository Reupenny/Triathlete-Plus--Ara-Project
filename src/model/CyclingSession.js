import { TrainingSession, SportType } from "./trainingSession";

export class CyclingSession extends TrainingSession {

    constructor(date, notes, distance, duration, terrain, bikeUsed, airTemp, weather, sessionID) {
        super(date, notes, SportType.CYCLING, sessionID);
        this.distance = distance;
        this.duration = duration;
        this.terrain = terrain; // road, mountain
        this.bikeUsed = bikeUsed;
        this.airTemp = airTemp;// Celcius
        this.weather = weather; // sunny ,clouddy, windy etc
    }
    getDetails() {
        return `${super.getDetails()}, Distance: ${this.distance} km, Duration: ${this.duration} mins, Terrain: ${this.terrain}, Bike: ${this.bikeUsed}, Air Temp: ${this.airTemp}, Weather: ${this.weather}`;
    }
}