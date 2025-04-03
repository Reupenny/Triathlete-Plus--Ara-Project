import { History } from "../js/history";
import { TriathlonData } from "../js/triathlonData";
import { Member } from "../js/member";

describe("History Class Tests", () => {
    let history;
    let triathlonData;
    let member;

    beforeEach(async () => {
        localStorage.clear();
        triathlonData = new TriathlonData();
        await TriathlonData.database.init();
        history = new History();
        history.history = [];

        // Sets up member for test
        member = new Member();
        const member1 = await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
    });

    afterEach((done) => {
        TriathlonData.lastMemberID = 0; // Reset member ID counter
        TriathlonData.database.deleteDatabase().then(done);
    }, 5000);

    test("addHistory adds a training session to the history", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        history.addHistory(session);
        expect(history.getHistory()).toContainEqual(session);
        expect(history.getHistory().length).toBe(1);
    });

    test("addHistory limits the history to a maximum size of 5", () => {
        const date1 = new Date().toLocaleDateString('en-NZ');
        const notes1 = `Test notes 1`;
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session1 = triathlonData.CreateSwimmingSession(date1, notes1, lapLength, strokeType, lapTimes, waterTempiture);
        history.addHistory(session1);
        const firstSession = session1;

        for (let i = 2; i < 9; i++) {
            const date = new Date().toLocaleDateString('en-NZ');
            const notes = `Test notes ${i}`;
            const lapLength = 25;
            const strokeType = "Freestyle";
            const lapTimes = [30, 32, 31];
            const waterTempiture = 27;

            const session = triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
            history.addHistory(session);
        }
        expect(history.getHistory().length).toBe(5);
        expect(history.getHistory()).not.toContainEqual(firstSession);
    });

    test("getHistory returns the history", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        history.addHistory(session);
        expect(await history.getHistory()).toEqual([session]);
    });

    test("saveHistory saves the history to localStorage", () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session = triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        history.addHistory(session);
        history.saveHistory();
        expect(localStorage.getItem("history")).toBe(JSON.stringify([session]));
    });

    test("loadHistory loads the history from localStorage", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        history.addHistory(session);
        history.saveHistory();

        const newHistory = new History();
        newHistory.loadHistory();
        expect(await newHistory.getHistory()).toEqual([session]);
    });

});
