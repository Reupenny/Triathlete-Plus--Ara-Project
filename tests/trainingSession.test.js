import { TrainingSession, SportType } from "../js/trainingSession";
import { TriathlonData } from "../js/triathlonData";

describe("TrainingSession Class Tests", () => {

    // Helper function to clear before each test
    beforeEach(() => {
        TrainingSession.lastSessionID = 0; // Reset the session ID counter
    });

    test("TrainingSession constructor initializes properties correctly when date is provided", () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const sportType = SportType.SWIMMING;
        const session = new TrainingSession(date, notes, sportType);

        expect(session.date).toBe(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe(sportType);
    });

    // test("TrainingSession constructor initializes properties correctly when date is not provided", () => {
    //     const notes = "Test notes";
    //     const sportType = SportType.SWIMMING;
    //     const session = new TrainingSession('', notes, sportType);

    //     const expectedDate = new Date().toLocaleDateString('en-NZ');
    //     expect(session.date).toBe(expectedDate);
    //     expect(session.notes).toBe(notes);
    //     expect(session.sportType).toBe(sportType);
    // });

    test("generateSessionID generates a unique sessionID", () => {
        const session1 = new TrainingSession(new Date(), "Notes 1", SportType.SWIMMING);
        const session2 = new TrainingSession(new Date(), "Notes 2", SportType.RUNNING);

        expect(session1.sessionID).toBe("S0001");
        expect(session2.sessionID).toBe("S0002");
        expect(session1.sessionID).not.toBe(session2.sessionID);
    });

    test("generateSessionID increments lastSessionID", () => {
        TrainingSession.lastSessionID = 5;
        const session1 = new TrainingSession(new Date(), "Notes 1", SportType.SWIMMING);
        expect(session1.sessionID).toBe("S0006");
        expect(TrainingSession.lastSessionID).toBe(6);
    });

    test("getDetails returns the session details", async () => {
        const triathlonData = new TriathlonData();
        await triathlonData.database.init();
        const member = await triathlonData.createMember("user1", "Alex", "Apple");
        await triathlonData.login("user1");
        const session = new TrainingSession("2024-01-01", "Test notes", SportType.SWIMMING);
        const details = session.getDetails();
        expect(details).toBe(`Session ID:S0001, Member: ${member.memberID}, Date: 2024-01-01, Notes: Test notes, Sport Type: Swimming`);
        triathlonData.logout();
    });
})
