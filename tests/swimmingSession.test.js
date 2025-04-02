import { SwimmingSession } from "../js/swimmingSession";
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

describe("SwimmingSession Class Tests", () => {
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

    test("SwimmingSession constructor initializes properties correctly", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;
        const session = new SwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);

        expect(session.date).toBe(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe(SportType.SWIMMING);
        expect(session.lapLength).toBe(lapLength);
        expect(session.strokeType).toBe(strokeType);
        expect(session.laps).toBe(lapTimes.length);
        expect(session.lapTimes).toBe(lapTimes);
        expect(session.waterTempiture).toBe(waterTempiture);
    });

    test("getDetails returns a string with swimming session details", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;
        const session = new SwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        TrainingSession.lastSessionID = 0;
        const expectedDetails = `Session ID:S0001, Member: M0001, Date: ${date}, Notes: ${notes}, Sport Type: Swimming, Lap Length: 25, Stroke: Freestyle, Laps: ${session.laps}, Water Temp: ${waterTempiture}`;
        expect(session.getDetails()).toBe(expectedDetails);
    });

    test("getTotalDistance returns the total distance in kilometers", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;
        const session = new SwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        expect(session.getTotalDistance()).toBe(0.75);
    });

    test("getTotalDuration returns the total duration in seconds", async () => {
        const date = "30/03/2024";
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;
        const session = new SwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        expect(session.getTotalDuration()).toBe(93);
    });
});
