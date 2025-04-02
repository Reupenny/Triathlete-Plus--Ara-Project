import { RunningSession } from "../js/runningSession";
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

describe("RunningSession Class Tests", () => {
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

    test("RunningSession constructor initializes properties correctly", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";
        const session = new RunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        expect(session.date).toBe(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe(SportType.RUNNING);
        expect(session.distance).toBe(distance);
        expect(session.duration).toBe(duration);
        expect(session.shoesUsed).toBe(shoesUsed);
        expect(session.airTempiture).toBe(airTempiture);
        expect(session.weatherCondition).toBe(weatherCondition);
    });

    test("getDetails returns a string with running session details", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";
        const session = new RunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);
        TrainingSession.lastSessionID = 0;
        const expectedDetails = `Session ID:S0001, Member: M0001, Date: ${date}, Notes: ${notes}, Sport Type: Running, Distance: 10 km, Duration: 40 mins, Shoes: Nike, Air Temp: 20, Weather: Cloudy`;
        expect(session.getDetails()).toBe(expectedDetails);
    });
});
