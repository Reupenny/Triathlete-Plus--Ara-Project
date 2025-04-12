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
        const waterTemperature = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature);
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
        const waterTemperature = 27;

        const session1 = triathlonData.CreateSwimmingSession(date1, notes1, lapLength, strokeType, lapTimes, waterTemperature);
        history.addHistory(session1);
        const firstSession = session1;

        for (let i = 2; i < 9; i++) {
            const date = new Date().toLocaleDateString('en-NZ');
            const notes = `Test notes ${i}`;
            const lapLength = 25;
            const strokeType = "Freestyle";
            const lapTimes = [30, 32, 31];
            const waterTemperature = 27;

            const session = triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature);
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
        const waterTemperature = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature);
        history.addHistory(session);
        expect(await history.getHistory()).toEqual([session]);
    });

    test("saveHistory saves the history to localStorage", () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTemperature = 27;

        const session = triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature);
        history.addHistory(session);
        history.saveHistory();
        expect(localStorage.getItem("history")).toBe(JSON.stringify([session]));
    });

    // Tests for getSessionFromHistory
    test("getSessionFromHistory returns the newest session with the given ID", () => {
        const session1 = { sessionID: "S0001", data: "old" };
        const session2 = { sessionID: "S0002", data: "unique" };
        const session3 = { sessionID: "S0001", data: "new" }; // Duplicate ID, newer

        history.addHistory(session1);
        history.addHistory(session2);
        history.addHistory(session3);

        const foundSession = history.getSessionFromHistory("S0001");
        expect(foundSession).toBeDefined();
        expect(foundSession.data).toBe("new"); // Should find the newest one
        expect(foundSession).toEqual(session3); // Check the whole object
    });

    test("getSessionFromHistory returns undefined if session ID not found", () => {
        const session1 = { sessionID: "S0001", data: "test" };
        history.addHistory(session1);

        const foundSession = history.getSessionFromHistory("S9999");
        expect(foundSession).toBeUndefined();
    });

    // Tests for removeSessionFromHistory
    test("removeSessionFromHistory removes the newest session with the given ID", () => {
        const session1 = { sessionID: "S0001", data: "old" };
        const session2 = { sessionID: "S0002", data: "unique" };
        const session3 = { sessionID: "S0001", data: "new" }; // Duplicate ID, newer

        history.addHistory(session1);
        history.addHistory(session2);
        history.addHistory(session3);

        const initialHistory = history.getHistory();
        expect(initialHistory.length).toBe(3);

        const removed = history.removeSessionFromHistory("S0001");
        expect(removed).toBe(true);

        const finalHistory = history.getHistory();
        expect(finalHistory.length).toBe(2);
        // Check that the newest S0001 was removed, and the older one remains
        expect(finalHistory.find(s => s.sessionID === "S0001").data).toBe("old");
        expect(finalHistory.find(s => s.sessionID === "S0002").data).toBe("unique");
        // Check localStorage reflects the change
        expect(localStorage.getItem("history")).toBe(JSON.stringify(finalHistory));
    });

    test("removeSessionFromHistory returns false if session ID not found", () => {
        const session1 = { sessionID: "S0001", data: "test" };
        history.addHistory(session1);

        const initialHistory = history.getHistory();
        expect(initialHistory.length).toBe(1);

        const removed = history.removeSessionFromHistory("S9999");
        expect(removed).toBe(false);

        const finalHistory = history.getHistory();
        expect(finalHistory.length).toBe(1); // History should be unchanged
        expect(localStorage.getItem("history")).toBe(JSON.stringify(finalHistory));
    });
    test("loadHistory loads the history from localStorage", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTemperature = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature);
        history.addHistory(session);
        history.saveHistory();

        const newHistory = new History();
        newHistory.loadHistory();
        expect(newHistory.getHistory()).toEqual([session]);
    });
});
