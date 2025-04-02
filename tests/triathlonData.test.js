import { TriathlonData } from "../js/triathlonData";

describe("TriathlonData Class Tests", () => {
    let triathlonData;

    beforeEach(async () => {
        triathlonData = new TriathlonData();
        await triathlonData.database.init();
        TriathlonData.trainingSessions = [];
    });

    afterEach((done) => {
        localStorage.clear();
        triathlonData.database.deleteDatabase().then(done);
    }, 5000);



    test("createMember creates a new member and adds it to the database", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";

        const member = await triathlonData.createMember(userName, fName, lName);

        expect(member).toBeInstanceOf(Object);
        expect(member.userName).toBe(userName);
        expect(member.fName).toBe(fName);
        expect(member.lName).toBe(lName);
        expect(member.memberID).toBeDefined();
        const storedMember = await triathlonData.database.getData("Members", member.memberID);
        expect(storedMember).toBeDefined();
    });

    test("login logs in an existing member", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        await triathlonData.createMember(userName, fName, lName);

        const loginResult = await triathlonData.login(userName);
        expect(loginResult).toBe(true);
        expect(window.localStorage.getItem("currentUser")).toBeDefined();
    });

    test("logout logs out the current member", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        await triathlonData.createMember(userName, fName, lName);
        await triathlonData.login(userName);

        triathlonData.logout();
        expect(window.localStorage.getItem("currentUser")).toBeNull();
    });

    test("deleteMember deletes an existing member", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        await triathlonData.createMember(userName, fName, lName);

        const deleteResult = await triathlonData.deleteMember(userName);
        expect(deleteResult).toBe(true);
    });

    test("findTrainingSessionByID finds an existing training session", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);

        const foundSession = triathlonData.findTrainingSessionByID(session.sessionID);

        expect(foundSession).toBeDefined();
    });

    test("CreateSwimmingSession creates a new SwimmingSession and adds it to trainingSessions", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);

        expect(session).toBeInstanceOf(Object);
        expect(session.memberID).toBe(window.localStorage.getItem("currentUser"));
        expect(session.date).toEqual(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe("Swimming");
        expect(session.lapLength).toBe(lapLength);
        expect(session.strokeType).toBe(strokeType);
        expect(session.laps).toBe(lapTimes.length);
        expect(session.lapTimes).toEqual(lapTimes);
        expect(session.waterTempiture).toBe(waterTempiture);
    });

    test("CreateCyclingSession creates a new CyclingSession and adds it to trainingSessions", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 20;
        const duration = 60;
        const terrain = "Road";
        const bikeUsed = "Mountain Bike";
        const airTempiture = 25;
        const weatherCondition = "Sunny";

        const session = await triathlonData.CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTempiture, weatherCondition);

        expect(session).toBeInstanceOf(Object);
        expect(session.memberID).toBe(window.localStorage.getItem("currentUser"));
        expect(session.date).toEqual(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe("Cycling");
        expect(session.distance).toBe(distance);
        expect(session.duration).toBe(duration);
        expect(session.terrain).toBe(terrain);
        expect(session.bikeUsed).toBe(bikeUsed);
        expect(session.airTempiture).toBe(airTempiture);
        expect(session.weatherCondition).toBe(weatherCondition);
    });

    test("CreateRunningSession creates a new RunningSession and adds it to trainingSessions", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        const session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        expect(session).toBeInstanceOf(Object);
        expect(session.memberID).toBe(window.localStorage.getItem("currentUser"));
        expect(session.date).toEqual(date);
        expect(session.notes).toBe(notes);
        expect(session.sportType).toBe("Running");
        expect(session.distance).toBe(distance);
        expect(session.duration).toBe(duration);
        expect(session.shoesUsed).toBe(shoesUsed);
        expect(session.airTempiture).toBe(airTempiture);
        expect(session.weatherCondition).toBe(weatherCondition);
    });

    test("createMember throws an error if user already exists", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        await triathlonData.createMember(userName, fName, lName);

        await expect(triathlonData.createMember(userName, fName, lName)).rejects.toThrow("User already exists!");
    });

    test("editTrainingSession edits an existing training session", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        let session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        const updatedNotes = "Updated notes";
        const updatedDistance = 15;

        const updatedSession = {
            notes: updatedNotes,
            distance: updatedDistance
        };

        await triathlonData.editTrainingSession(session.sessionID, updatedSession);

        const editedSession = await triathlonData.findTrainingSessionByID(session.sessionID);

        expect(editedSession.notes).toBe(updatedNotes);
        expect(editedSession.distance).toBe(updatedDistance);
    });

    test("deleteTrainingSession deletes an existing training session", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        let session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        await triathlonData.deleteTrainingSession(session.sessionID);

        const deletedSession = await triathlonData.findTrainingSessionByID(session.sessionID);
        expect(deletedSession).toBeUndefined();
    });

    test("login throws an error if member is not found", async () => {
        const userName = "nonexistentUser";
        const loginResult = await triathlonData.login(userName);
        expect(loginResult).toBe(false);
    });

    test("deleteMember returns false if member is not found", async () => {
        const userName = "nonexistentUser";
        const deleteResult = await triathlonData.deleteMember(userName);
        expect(deleteResult).toBe(false);
    });

    test("editTrainingSession throws an error if session is not found", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        await expect(triathlonData.editTrainingSession("nonexistent-session-id", {})).rejects.toThrow("Session not found");
    });

    test("editTrainingSession throws an error if user is not authorized to edit the session", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        let session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        triathlonData.logout();
        await triathlonData.createMember("user2", "Bob", "Builder"); // create member
        await triathlonData.login("user2"); // login

        await expect(triathlonData.editTrainingSession(session.sessionID, {})).rejects.toThrow("You are not authorized to edit this session");
    });

    test("deleteTrainingSession throws an error if session is not found", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        await expect(triathlonData.deleteTrainingSession("nonexistent-session-id")).rejects.toThrow("Session not found");
    });

    test("deleteTrainingSession throws an error if user is not authorized to delete the session", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        let session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        triathlonData.logout();
        await triathlonData.createMember("user2", "Bob", "Builder"); // create member
        await triathlonData.login("user2"); // login

        await expect(triathlonData.deleteTrainingSession(session.sessionID)).rejects.toThrow("You are not authorized to delete this session");
    });

    test("initializeAndLoad initializes the database and loads training sessions", async () => {
        // Create a new TriathlonData instance
        const triathlonData = new TriathlonData();

        // Mock the database.init and loadTrainingSessions methods
        triathlonData.database.init = jest.fn();
        triathlonData.loadTrainingSessions = jest.fn();

        // Call the initializeAndLoad method
        await triathlonData.initializeAndLoad();

        // Assert that the database.init and loadTrainingSessions methods were called
        expect(triathlonData.database.init).toHaveBeenCalled();
        expect(triathlonData.loadTrainingSessions).toHaveBeenCalled();
    });

    test("loadTrainingSessions loads training sessions from the database", async () => {
        // Create a new TriathlonData instance
        const triathlonData = new TriathlonData();

        // Mock the database.getAllData method
        triathlonData.database.getAllData = jest.fn().mockResolvedValue([{ sessionID: "S0001" }]);

        // Call the loadTrainingSessions method
        await triathlonData.loadTrainingSessions();

        // Assert that the database.getAllData method was called
        expect(triathlonData.database.getAllData).toHaveBeenCalledWith("TrainingSessions");

        // Assert that the trainingSessions array was updated
        expect(TriathlonData.trainingSessions).toEqual([{ sessionID: "S0001" }]);
    });

    test("loadTrainingSessions does not update trainingSessions if getAllData returns null", async () => {
        // Create a new TriathlonData instance
        const triathlonData = new TriathlonData();

        // Mock the database.getAllData method
        triathlonData.database.getAllData = jest.fn().mockResolvedValue(null);

        // Call the loadTrainingSessions method
        await triathlonData.loadTrainingSessions();

        // Assert that the database.getAllData method was called
        expect(triathlonData.database.getAllData).toHaveBeenCalledWith("TrainingSessions");

        // Assert that the trainingSessions array was not updated
        expect(TriathlonData.trainingSessions).toEqual([]);
    });

    test("sortTrainingSessionsByDate sorts training sessions by date", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date1 = "2024-01-01";
        const date2 = "2024-01-03";
        const date3 = "2024-01-02";

        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);
        await triathlonData.CreateSwimmingSession(date2, "notes", 25, "Freestyle", [30, 32, 31], 27);
        await triathlonData.CreateSwimmingSession(date3, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsByDate(trainingSessions);

        expect(sortedSessions[0].date).toBe(date1);
        expect(sortedSessions[1].date).toBe(date3);
        expect(sortedSessions[2].date).toBe(date2);
    });

    test("sortTrainingSessionsByMemberID sorts training sessions by memberID", async () => {
        // Sets up members for test
        const member1 = await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login
        const member2 = await triathlonData.createMember("user2", "Bob", "Builder"); // create member

        const date = new Date().toLocaleDateString('en-NZ');

        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);
        triathlonData.logout()
        await triathlonData.login("user2"); // login
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsByMemberID(trainingSessions);

        expect(sortedSessions[0].memberID).toBe(member1.memberID);
        expect(sortedSessions[1].memberID).toBe(member2.memberID);
    });

    test("sortTrainingSessionsBySportType sorts training sessions by sportType", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);
        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsBySportType(trainingSessions);

        expect(sortedSessions[0].sportType).toBe("Cycling");
        expect(sortedSessions[1].sportType).toBe("Running");
        expect(sortedSessions[2].sportType).toBe("Swimming");
    });

    test("sortTrainingSessionsByDistance sorts training sessions by distance", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsByDistance(trainingSessions);
        expect(sortedSessions[0].distance).toBe(0.75);
        expect(sortedSessions[0].sportType).toBe("Swimming");
        expect(sortedSessions[1].distance).toBe(5);
        expect(sortedSessions[2].distance).toBe(10);
        expect(sortedSessions[3].distance).toBe(20);
    });

    test("calculateAveragePace calculates the average pace of all training sessions", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        // Create some training sessions
        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy"); // 10km in 40 minutes
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny"); // 20km in 60 minutes
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27); // 0.075km (3 laps of 25m each)

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const averagePace = await triathlonData.calculateAveragePace(trainingSessions);

        // Calculate the expected average pace
        const totalDistance = 10 + 20 + 0.075; // Total distance in km
        const totalDuration = 40 + 60; // Total duration in minutes
        const expectedAveragePace = totalDuration / totalDistance;

        expect(averagePace).toBe(`Average pace: ${expectedAveragePace.toFixed(2)} minutes per kilometer`);
    });

    describe("searchTrainingSessions", () => {
        test("returns a message if the user is not logged in", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            triathlonData.logout();
            const result = await triathlonData.searchTrainingSessions("sportType", "Swimming");
            expect(result).toEqual({ message: "Please log in to search for training sessions." });
        });

        test("searches by sportType", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            const date = new Date().toLocaleDateString('en-NZ');
            await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "notes", 25, "Butterfly", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy");
            await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
            const result = await triathlonData.searchTrainingSessions("sportType", "Swimming");
            expect(Object.keys(result).length).toBe(3);
            Object.values(result).forEach(session => {
                expect(session.sportType).toBe("Swimming");
            });
        });

        test("searches by date", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            const date1 = new Date().toLocaleDateString('en-NZ');
            const date2 = "2024-01-01";
            const date3 = "2024-01-02";
            await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateRunningSession(date2, "notes", 10, 40, "Nike", 20, "Cloudy");
            await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateRunningSession(date3, "notes", 10, 40, "Nike", 20, "Cloudy");
            const result = await triathlonData.searchTrainingSessions("date", date1);
            expect(Object.keys(result).length).toBe(2);
            Object.values(result).forEach(session => {
                expect(session.date).toBe(date1);
            });
        });

        test("searches by notes", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            const date = new Date().toLocaleDateString('en-NZ');
            await triathlonData.CreateSwimmingSession(date, "Test notes one", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateRunningSession(date, "Some notes", 10, 40, "Nike", 20, "Cloudy");
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateRunningSession(date, "Some notes", 10, 40, "Nike", 20, "Cloudy");
            const result = await triathlonData.searchTrainingSessions("notes", "Test notes");
            expect(Object.keys(result).length).toBe(2);
            Object.values(result).forEach(session => {
                expect(session.notes).toContain("Test notes");
            });
        });

        test("searches by lapTimes", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            const date = new Date().toLocaleDateString('en-NZ');
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [40, 42, 41], 27);
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [40, 42, 41], 27);
            const result = await triathlonData.searchTrainingSessions("lapTimes", "30");
            expect(Object.keys(result).length).toBe(2);
            Object.values(result).forEach(session => {
                expect(session.lapTimes.join(",")).toContain("30");
            });
        });

        test("searches by strokeType", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            const date = new Date().toLocaleDateString('en-NZ');
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Butterfly", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Butterfly", [30, 32, 31], 27);
            const result = await triathlonData.searchTrainingSessions("strokeType", "Freestyle");
            expect(Object.keys(result).length).toBe(2);
            Object.values(result).forEach(session => {
                expect(session.strokeType).toBe("Freestyle");
            });
        });

        test("searches by shoesUsed", async () => {
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.login("user1"); // login
            const date = new Date().toLocaleDateString('en-NZ');
            await triathlonData.CreateRunningSession(date, "Test notes", 10, 40, "Nike", 20, "Cloudy");
            await triathlonData.CreateRunningSession(date, "Test notes", 10, 40, "Adidas", 20, "Cloudy");
            await triathlonData.CreateRunningSession(date, "Test notes", 10, 40, "Nike", 20, "Cloudy");
            await triathlonData.CreateRunningSession(date, "Test notes", 10, 40, "Adidas", 20, "Cloudy");
            const result = await triathlonData.searchTrainingSessions("shoesUsed", "Nike");
            expect(Object.keys(result).length).toBe(2);
            Object.values(result).forEach(session => {
                expect(session.shoesUsed).toBe("Nike");
            });
        });

        test("only returns training sessions from the logged-in user", async () => {
            // Create a second user and log them in
            await triathlonData.createMember("user1", "Alex", "Apple"); // create member
            await triathlonData.createMember("user2", "Bob", "Builder"); // create member
            triathlonData.logout();
            await triathlonData.login("user2");

            // Create a training session for the second user
            const date = new Date().toLocaleDateString('en-NZ');
            await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);

            // Log back in as the first user
            triathlonData.logout();
            await triathlonData.login("user1");

            // Search for training sessions and ensure that only the first user's sessions are returned
            const result = await triathlonData.searchTrainingSessions("sportType", "Swimming");
            expect(Object.keys(result).length).toBe(0);
        });
    });

    test("calculateTotalDistanceForDatePeriod calculates the total distance for a given date period", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date1 = "2024-01-01";
        const date2 = "2024-01-05";
        const date3 = "2024-01-10";

        await triathlonData.CreateRunningSession(date1, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date2, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date3, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const startDate = "2024-01-01";
        const endDate = "2024-01-05";
        const totalDistance = await triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions, startDate, endDate);

        expect(totalDistance).toBe(30.75);
    });

    test("calculateTotalDistanceForDatePeriod calculates the total distance for all data if no dates are provided", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date1 = "2024-01-01";
        const date2 = "2024-01-05";
        const date3 = "2024-01-10";

        await triathlonData.CreateRunningSession(date1, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date2, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date3, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const totalDistance = await triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions);

        expect(totalDistance).toBe(35.75);
    });


    test("calculateAveragePace calculates the average pace of all training sessions", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        // Create some training sessions
        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy"); // 10km in 40 minutes
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny"); // 20km in 60 minutes
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const averagePace = await triathlonData.calculateAveragePace(trainingSessions);

        // Calculate the expected average pace
        const totalDistance = 10 + 20; // Total distance in km
        const totalDuration = 40 + 60; // Total duration in minutes
        const expectedAveragePace = totalDuration / totalDistance;

        expect(averagePace).toBe(`Average pace: ${expectedAveragePace.toFixed(2)} minutes per kilometer`);
    });

    test("calculateAveragePace returns 'No training sessions found with valid distance and duration.' if no sessions are found", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const trainingSessions = await triathlonData.database.getAllData("TrainingSessions");
        const averagePace = await triathlonData.calculateAveragePace(trainingSessions);

        expect(averagePace).toBe("No training sessions found with valid distance and duration.");
    });

    test("createSwimmingSession adds a new swimming session to trainingSessions and adds data to the database", async () => {
        // Sets up member for test
        await triathlonData.createMember("user1", "Alex", "Apple"); // create member
        await triathlonData.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        // Mock the addData method
        triathlonData.database.addData = jest.fn();

        const session = await triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);

        expect(triathlonData.database.addData).toHaveBeenCalledWith("TrainingSessions", expect.any(Object));
        expect(TriathlonData.trainingSessions).toContain(session);
    });
});
