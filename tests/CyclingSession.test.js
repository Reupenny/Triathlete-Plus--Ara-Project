import { CyclingSession } from "../js/CyclingSession";
import { SportType, TrainingSession } from "../js/trainingSession";

// Mock the Database class
class MockDatabase {
    constructor() {
        this.db = {};
    }
    async init() { }
    async addData(type, data) {
        this.db[type] = this.db[type] || {};
        this.db[type][data.memberID || data.sessionID] = data;
    }
    async getData(type, key) {
        return this.db[type]?.[key];
    }
    async deleteDatabase() { }
    close() { }
}

// Mock the TriathlonData class
class MockTriathlonData {
    constructor(database) {
        this.database = database;
    }
    async createMember(username, firstName, lastName) {
        const memberID = "M0001"; // Mocked member ID
        await this.database.addData("Members", { memberID, username, firstName, lastName });
        return { memberID, username, firstName, lastName };
    }
    async login(username) { }
    getData(type, key) {
        return this.database.getData(type, key);
    }
}

describe("CyclingSession Class Tests", () => {
    let database
    let triathlonData

    beforeEach(async () => {
        database = new MockDatabase();
        triathlonData = new MockTriathlonData(database);

        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        localStorage.setItem("currentUser", "M0001");
    });

    afterEach(async () => {
        database.deleteDatabase()
        localStorage.clear(); // Clear local storage
        TrainingSession.lastSessionID = 0; // Reset the session ID counter
    })

    test("CyclingSession constructor initialises properties correctly", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const distance = 20;
        const duration = 60;
        const terrain = "Road";
        const bikeUsed = "Mountain Bike";
        const airTempiture = 25;
        const weatherCondition = "Sunny";
        const session = new CyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTempiture, weatherCondition);

        expect(session.date).toBe(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe(SportType.CYCLING);
        expect(session.distance).toBe(distance);
        expect(session.duration).toBe(duration);
        expect(session.terrain).toBe(terrain);
        expect(session.bikeUsed).toBe(bikeUsed);
        expect(session.airTempiture).toBe(airTempiture);
        expect(session.weatherCondition).toBe(weatherCondition);
    });

    test("getDetails returns a string with cycling session details", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const distance = 20;
        const duration = 60;
        const terrain = "Road";
        const bikeUsed = "Mountain Bike";
        const airTempiture = 25;
        const weatherCondition = "Sunny";
        const session = new CyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTempiture, weatherCondition);
        TrainingSession.lastSessionID = 0;
        const expectedDetails = `Session ID:S0001, Member: M0001, Date: ${date}, Notes: ${notes}, Sport Type: Cycling, Distance: 20 km, Duration: 60 mins, Terrain: Road, Bike: Mountain Bike, Air Temp: 25, Weather: Sunny`;
        expect(session.getDetails()).toBe(expectedDetails);
    });
});
