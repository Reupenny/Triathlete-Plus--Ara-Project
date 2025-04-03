import { TriathlonData } from "../js/triathlonData";
import { Member } from "..//js/member";

describe("TriathlonData Class Tests", () => {
    let member;
    let triathlonData;

    beforeEach(async () => {
        triathlonData = new TriathlonData()
        await TriathlonData.database.init();
        member = new Member();
    });

    afterEach((done) => {
        localStorage.clear();
        TriathlonData.database.deleteDatabase().then(done);
    }, 5000);


    test("findTrainingSessionByID finds an existing training session", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

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

    test("CreateCyclingSession sets airTempiture to 'NA' when not provided", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 20;
        const duration = 60;
        const terrain = "Road";
        const bikeUsed = "Mountain Bike";
        const weatherCondition = "Sunny";

        const session = await triathlonData.CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, undefined, weatherCondition);

        expect(session.airTempiture).toBe("NA");
    });

    test("CreateCyclingSession sets weatherCondition to '' when not provided", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 20;
        const duration = 60;
        const terrain = "Road";
        const bikeUsed = "Mountain Bike";
        const airTempiture = 25;

        const session = await triathlonData.CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTempiture, undefined);

        expect(session.weatherCondition).toBe("");
    });

    test("CreateRunningSession sets airTempiture to 'NA' when not provided", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const weatherCondition = "Cloudy";

        const session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, undefined, weatherCondition);

        expect(session.airTempiture).toBe("NA");
    });

    test("CreateRunningSession sets weatherCondition to '' when not provided", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;

        const session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, undefined);

        expect(session.weatherCondition).toBe("");
    });

    test("createMember throws an error if user already exists", async () => {
        await member.createMember("user1", "Alex", "Apple"); // create member

        await expect(member.createMember("user1", "Alex", "Apple")).rejects.toThrow("User already exists!");
    });

    test("createMember throws an error if userName is not a string", async () => {
        await expect(member.createMember(123, "Alex", "Apple")).rejects.toThrow("Username must be a string");
    });

    test("createMember throws an error if fName is not a string", async () => {
        await expect(member.createMember("user1", 123, "Apple")).rejects.toThrow("First name must be a string");
    });

    test("createMember throws an error if lName is not a string", async () => {
        await expect(member.createMember("user1", "Alex", 123)).rejects.toThrow("Last name must be a string");
    });

    test("editTrainingSession edits an existing training session", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

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

    test("editTrainingSession throws an error if session is not found", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        await expect(triathlonData.editTrainingSession("nonexistent-session-id", {})).rejects.toThrow("Session not found");
    });

    test("editTrainingSession throws an error if user is not authorized to edit the session", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        let session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        member.logout();
        await member.createMember("user2", "Bob", "Builder"); // create member
        await member.login("user2"); // login

        await expect(triathlonData.editTrainingSession(session.sessionID, {})).rejects.toThrow("You are not authorized to edit this session");
    });

    test("deleteTrainingSession throws an error if session is not found", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        await expect(triathlonData.deleteTrainingSession("nonexistent-session-id")).rejects.toThrow("Session not found");
    });

    test("deleteTrainingSession throws an error if user is not authorized to delete the session", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 20;
        const weatherCondition = "Cloudy";

        let session = await triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);

        member.logout();
        await member.createMember("user2", "Bob", "Builder"); // create member
        await member.login("user2"); // login

        await expect(triathlonData.deleteTrainingSession(session.sessionID)).rejects.toThrow("You are not authorized to delete this session");
    });

    test("sortTrainingSessionsByDate sorts training sessions by date", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date1 = "1/1/2025";
        const date2 = "3/1/2025";
        const date3 = "2/1/2025";

        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);
        await triathlonData.CreateSwimmingSession(date2, "notes", 25, "Freestyle", [30, 32, 31], 27);
        await triathlonData.CreateSwimmingSession(date3, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsByDate(trainingSessions);

        expect(sortedSessions[0].date).toBe(date1);
        expect(sortedSessions[1].date).toBe(date3);
        expect(sortedSessions[2].date).toBe(date2);
    });

    test("sortTrainingSessionsByMemberID sorts training sessions by memberID", async () => {
        // Sets up members for test
        const member1 = await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
        const member2 = await member.createMember("user2", "Bob", "Builder"); // create member

        const date = new Date().toLocaleDateString('en-NZ');

        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);
        member.logout()
        await member.login("user2"); // login
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsByMemberID(trainingSessions);

        expect(sortedSessions[0].memberID).toBe(member1.memberID);
        expect(sortedSessions[1].memberID).toBe(member2.memberID);
    });

    test("sortTrainingSessionsBySportType sorts training sessions by sportType", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);
        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsBySportType(trainingSessions);

        expect(sortedSessions[0].sportType).toBe("Cycling");
        expect(sortedSessions[1].sportType).toBe("Running");
        expect(sortedSessions[2].sportType).toBe("Swimming");
    });

    test("sortTrainingSessionsByDistance sorts training sessions by distance", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const sortedSessions = await triathlonData.sortTrainingSessionsByDistance(trainingSessions);
        expect(sortedSessions[0].distance).toBe(0.75);
        expect(sortedSessions[0].sportType).toBe("Swimming");
        expect(sortedSessions[1].distance).toBe(5);
        expect(sortedSessions[2].distance).toBe(10);
        expect(sortedSessions[3].distance).toBe(20);
    });

    test("calculateAveragePace calculates the average pace of all training sessions", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        // Create some training sessions
        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy"); // 10km in 40 minutes
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny"); // 20km in 60 minutes
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27); // 0.075km (3 laps of 25m each)

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const averagePace = await triathlonData.calculateAveragePace(trainingSessions);

        // Calculate the expected average pace
        const totalDistance = 10 + 20 + 0.075; // Total distance in km
        const totalDuration = 40 + 60; // Total duration in minutes
        const expectedAveragePace = totalDuration / totalDistance;

        expect(averagePace).toBe(`Average pace: ${expectedAveragePace.toFixed(2)} minutes per kilometer`);
    });


    test("returns a message if the user is not logged in", async () => {
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
        member.logout();
        const result = await triathlonData.searchTrainingSessions("sportType", "Swimming");
        expect(result).toEqual({ message: "Please log in to search for training sessions." });
    });

    test("searches by sportType", async () => {
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
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


    test("throws an error if lapLength is not a number", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", "25", "Freestyle", [30, 32, 31], 27)).rejects.toThrow("Lap Length must be a number");
    });

    test("throws an error if strokeType is missing", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, null, [30, 32, 31], 27)).rejects.toThrow("Stroke Type is required.");
    });

    test("throws an error if strokeType is not a string", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, 123, [30, 32, 31], 27)).rejects.toThrow("Stroke Type must be a string.");
    });

    test("throws an error if waterTempiture is not a number", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, "Freestyle", [30, 32, 31], "27")).rejects.toThrow("Water temperature must be a number.");
    });

    test("throws an error if lapLength is less than or equal to zero", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 0, "Freestyle", [30, 32, 31], 27)).rejects.toThrow("Lap length must be greater than zero.");
    });

    test("throws an error if waterTempiture is less than 0 or greater than 40", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, "Freestyle", [30, 32, 31], -1)).rejects.toThrow("Water temperature must be between 0 and 40 degrees Celsius.");
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, "Freestyle", [30, 32, 31], 41)).rejects.toThrow("Water temperature must be between 0 and 40 degrees Celsius.");
    });

    test("throws an error if date is not in the correct format (d/M/yyyy)", async () => {
        await expect(triathlonData.CreateSwimmingSession("2025-01-01", "Test notes", 25, "Freestyle", [30, 32, 31], 27)).rejects.toThrow("Invalid date. Please use d/M/yyyy and ensure a valid date.");
    });

    test("throws an error if lapTimes is not an array", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, "Freestyle", "30, 32, 31", 27)).rejects.toThrow("Lap times must be an array.");
    });

    test("throws an error if any lapTime in lapTimes is not a number or is less than or equal to zero", async () => {
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, "Freestyle", [30, "32", 31], 27)).rejects.toThrow("Lap times must be numbers greater than zero.");
        await expect(triathlonData.CreateSwimmingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 25, "Freestyle", [30, 0, 31], 27)).rejects.toThrow("Lap times must be numbers greater than zero.");
    });

    test("handles missing date and uses the current date in 'en-NZ' format", async () => {
        const session = await triathlonData.CreateSwimmingSession(null, "Test notes", 25, "Freestyle", [30, 32, 31], 27);
        expect(session.date).toEqual(new Date().toLocaleDateString('en-NZ'));
    });



    test("throws an error if distance is not a number", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", "20", 60, "Road", "Mountain Bike", 25, "Sunny")).rejects.toThrow("Distance must be a number.");
    });

    test("throws an error if duration is not a number", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, "60", "Road", "Mountain Bike", 25, "Sunny")).rejects.toThrow("Duration must be a number.");
    });

    test("throws an error if duration is less than or equal to zero", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 0, "Road", "Mountain Bike", 25, "Sunny")).rejects.toThrow("Duration must be greater than zero.");
    });

    test("throws an error if airTempiture is not a number", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, "Road", "Mountain Bike", "25", "Sunny")).rejects.toThrow("Air temperature must be a number.");
    });

    test("throws an error if terain is missing", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, null, "Mountain Bike", 25, "Sunny")).rejects.toThrow("Terrain is required.");
    });

    test("throws an error if terain is not a string", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, 123, "Mountain Bike", 25, "Sunny")).rejects.toThrow("Terrain must be a string.");
    });

    test("throws an error if bikeUsed is missing", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, "Road", null, 25, "Sunny")).rejects.toThrow("Bike Used is required.");
    });

    test("throws an error if bikeUsed is not a string", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, "Road", 123, 25, "Sunny")).rejects.toThrow("Bike Used must be a string.");
    });

    test("throws an error if weatherCondition is not a string", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, "Road", "Mountain Bike", 25, 123)).rejects.toThrow("Weather Condition must be a string.");
    });

    test("throws an error if distance is less than or equal to zero", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 0, 60, "Road", "Mountain Bike", 25, "Sunny")).rejects.toThrow("Distance must be greater than zero.");
    });

    test("throws an error if airTempiture is less than -20 or greater than 50", async () => {
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, "Road", "Mountain Bike", -21, "Sunny")).rejects.toThrow("Air temperature must be between -20 and 50 degrees Celsius.");
        await expect(triathlonData.CreateCyclingSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 20, 60, "Road", "Mountain Bike", 51, "Sunny")).rejects.toThrow("Air temperature must be between -20 and 50 degrees Celsius.");
    });

    test("throws an error if date is not in the correct format (d/M/yyyy)", async () => {
        await expect(triathlonData.CreateCyclingSession("2025-01-01", "Test notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny")).rejects.toThrow("Invalid date. Please use d/M/yyyy and ensure a valid date.");
    });

    test("handles missing date and uses the current date in 'en-NZ' format", async () => {
        const session = await triathlonData.CreateCyclingSession(null, "Test notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        expect(session.date).toEqual(new Date().toLocaleDateString('en-NZ'));
    });



    test("throws an error if distance is not a number", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", "10", 40, "Nike", 20, "Cloudy")).rejects.toThrow("Distance must be a number.");
    });

    test("throws an error if duration is not a number", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, "40", "Nike", 20, "Cloudy")).rejects.toThrow("Duration must be a number.");
    });

    test("throws an error if duration is less than or equal to zero", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 0, "Nike", 20, "Cloudy")).rejects.toThrow("Duration must be greater than zero.");
    });

    test("throws an error if airTempiture is not a number", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 40, "Nike", "20", "Cloudy")).rejects.toThrow("Air temperature must be a number.");
    });

    test("throws an error if shoesUsed is missing", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 40, null, 20, "Cloudy")).rejects.toThrow("Shoes Used is required.");
    });

    test("throws an error if shoesUsed is not a string", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 40, 123, 20, "Cloudy")).rejects.toThrow("Shoes Used must be a string.");
    });

    test("throws an error if weatherCondition is not a string", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 40, "Nike", 20, 123)).rejects.toThrow("Weather Condition must be a string.");
    });

    test("throws an error if distance is less than or equal to zero", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 0, 40, "Nike", 20, "Cloudy")).rejects.toThrow("Distance must be greater than zero.");
    });

    test("throws an error if airTempiture is less than -20 or greater than 50", async () => {
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 40, "Nike", -21, "Cloudy")).rejects.toThrow("Air temperature must be between -20 and 50 degrees Celsius.");
        await expect(triathlonData.CreateRunningSession(new Date().toLocaleDateString('en-NZ'), "Test notes", 10, 40, "Nike", 51, "Cloudy")).rejects.toThrow("Air temperature must be between -20 and 50 degrees Celsius.");
    });

    test("throws an error if date is not in the correct format (d/M/yyyy)", async () => {
        await expect(triathlonData.CreateRunningSession("2025-01-01", "Test notes", 10, 40, "Nike", 20, "Cloudy")).rejects.toThrow("Invalid date. Please use d/M/yyyy and ensure a valid date.");
    });

    test("handles missing date and uses the current date in 'en-NZ' format", async () => {
        const session = await triathlonData.CreateRunningSession(null, "Test notes", 10, 40, "Nike", 20, "Cloudy");
        expect(session.date).toEqual(new Date().toLocaleDateString('en-NZ'));
    });

    test("returns a message if the user is not logged in", async () => {
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
        member.logout();
        const result = await triathlonData.searchTrainingSessions("sportType", "Swimming");
        expect(result).toEqual({ message: "Please log in to search for training sessions." });
    });

    test("searches by sportType", async () => {
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
        const date1 = new Date().toLocaleDateString('en-NZ');
        const date2 = "1/1/2025";
        const date3 = "2/1/2025";
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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login
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
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.createMember("user2", "Bob", "Builder"); // create member
        member.logout();
        await member.login("user2");

        // Create a training session for the second user
        const date = new Date().toLocaleDateString('en-NZ');
        await triathlonData.CreateSwimmingSession(date, "Test notes", 25, "Freestyle", [30, 32, 31], 27);

        // Log back in as the first user
        member.logout();
        await member.login("user1");

        // Search for training sessions and ensure that only the first user's sessions are returned
        const result = await triathlonData.searchTrainingSessions("sportType", "Swimming");
        expect(Object.keys(result).length).toBe(0);
    });

    test("calculateTotalDistanceForDatePeriod calculates the total distance for a given date period", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date1 = "1/1/2025";
        const date2 = "5/1/2025";
        const date3 = "10/1/2025";

        await triathlonData.CreateRunningSession(date1, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date2, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date3, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const startDate = "1/1/2025";
        const endDate = "5/1/2025";
        const totalDistance = await triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions, startDate, endDate);

        expect(totalDistance).toBe(30.75);
    });

    test("calculateTotalDistanceForDatePeriod calculates the total distance for all data if no dates are provided", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date1 = "1/1/2025";
        const date2 = "5/1/2025";
        const date3 = "10/1/2025";

        await triathlonData.CreateRunningSession(date1, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date2, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date3, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const totalDistance = await triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions);

        expect(totalDistance).toBe(35.75);
    });


    test("calculateTotalDistanceForDatePeriod throws an error if startDate is invalid", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date1 = "1/1/2025";
        const date2 = "5/1/2025";
        const date3 = "10/1/2025";

        await triathlonData.CreateRunningSession(date1, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date2, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date3, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const startDate = "ABC";
        const endDate = "5/1/2025";
        await expect(triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions, startDate, endDate)).rejects.toThrow("Invalid start date. Please use d/M/yyyy and ensure a valid date.");
    });

    test("calculateTotalDistanceForDatePeriod throws an error if endDate is invalid", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date1 = "1/1/2025";
        const date2 = "5/1/2025";
        const date3 = "10/1/2025";

        await triathlonData.CreateRunningSession(date1, "notes", 10, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateCyclingSession(date2, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny");
        await triathlonData.CreateRunningSession(date3, "notes", 5, 40, "Nike", 20, "Cloudy");
        await triathlonData.CreateSwimmingSession(date1, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const startDate = "1/1/2025";
        const endDate = "ABC";
        await expect(triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions, startDate, endDate)).rejects.toThrow("Invalid end date. Please use d/M/yyyy and ensure a valid date.");
    });

    test("calculateAveragePace calculates the average pace of all training sessions", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const date = new Date().toLocaleDateString('en-NZ');

        // Create some training sessions
        await triathlonData.CreateRunningSession(date, "notes", 10, 40, "Nike", 20, "Cloudy"); // 10km in 40 minutes
        await triathlonData.CreateCyclingSession(date, "notes", 20, 60, "Road", "Mountain Bike", 25, "Sunny"); // 20km in 60 minutes
        await triathlonData.CreateSwimmingSession(date, "notes", 25, "Freestyle", [30, 32, 31], 27);

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const averagePace = await triathlonData.calculateAveragePace(trainingSessions);

        // Calculate the expected average pace
        const totalDistance = 10 + 20; // Total distance in km
        const totalDuration = 40 + 60; // Total duration in minutes
        const expectedAveragePace = totalDuration / totalDistance;

        expect(averagePace).toBe(`Average pace: ${expectedAveragePace.toFixed(2)} minutes per kilometer`);
    });

    test("calculateAveragePace returns 'No training sessions found with valid distance and duration.' if no sessions are found", async () => {
        // Sets up member for test
        await member.createMember("user1", "Alex", "Apple"); // create member
        await member.login("user1"); // login

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const averagePace = await triathlonData.calculateAveragePace(trainingSessions);

        expect(averagePace).toBe("No training sessions found with valid distance and duration.");
    });

    test("initializeAndLoad initializes the database", async () => {
        const triathlonData = new TriathlonData();
        TriathlonData.database.init = jest.fn();
        await triathlonData.initializeAndLoad();
        expect(TriathlonData.database.init).toHaveBeenCalled();
    });

    test("sortTrainingSessionsByDate throws an error if trainingSessions is not an array", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.sortTrainingSessionsByDate("not an array")).rejects.toThrow("Training sessions must be an array.");
    });

    test("sortTrainingSessionsByMemberID throws an error if trainingSessions is not an array", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.sortTrainingSessionsByMemberID("not an array")).rejects.toThrow("Training sessions must be an array.");
    });

    test("sortTrainingSessionsBySportType throws an error if trainingSessions is not an array", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.sortTrainingSessionsBySportType("not an array")).rejects.toThrow("Training sessions must be an array.");
    });

    test("sortTrainingSessionsByDistance throws an error if trainingSessions is not an array", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.sortTrainingSessionsByDistance("not an array")).rejects.toThrow("Training sessions must be an array.");
    });

    test("calculateTotalDistanceForDatePeriod throws an error if trainingSessions is not an array", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.calculateTotalDistanceForDatePeriod("not an array")).rejects.toThrow("Training sessions must be an array.");
    });

    test("calculateAveragePace throws an error if trainingSessions is not an array", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.calculateAveragePace("not an array")).rejects.toThrow("Training sessions must be an array.");
    });

    test("findTrainingSessionByID throws an error if sessionID is not a non-empty string", async () => {
        const triathlonData = new TriathlonData();
        await expect(triathlonData.findTrainingSessionByID(123)).rejects.toThrow("Session ID must be a non-empty string.");
        await expect(triathlonData.findTrainingSessionByID("")).rejects.toThrow("Session ID must be a non-empty string.");
    });

});

describe("TriathlonData Class Tests - database.addData failure", () => {
    let member;
    let triathlonData;

    beforeEach(async () => {
        triathlonData = new TriathlonData()
        await TriathlonData.database.init();
        member = new Member("M0000", "testuser", "Test", "User"); // Dummy memberID
    });

    afterEach((done) => {
        localStorage.clear();
        TriathlonData.database.deleteDatabase().then(done);
    }, 5000);

    test("CreateSwimmingSession throws an error if database.addData fails", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const lapLength = 25;
        const strokeType = "Freestyle";
        const lapTimes = [30, 32, 31];
        const waterTempiture = 27;

        TriathlonData.database.addData = jest.fn().mockRejectedValue(new Error("Database error"));

        await expect(triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture)).rejects.toThrow("Error creating swimming session.");
    });

    test("CreateCyclingSession throws an error if database.addData fails", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 20;
        const duration = 60;
        const terrain = "Road";
        const bikeUsed = "Mountain Bike";
        const airTempiture = 25;
        const weatherCondition = "Sunny";

        TriathlonData.database.addData = jest.fn().mockRejectedValue(new Error("Database error"));

        await expect(triathlonData.CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTempiture, weatherCondition)).rejects.toThrow("Error creating cycling session.");
    });

    test("CreateRunningSession throws an error if database.addData fails", async () => {
        const date = new Date().toLocaleDateString('en-NZ');
        const notes = "Test notes";
        const distance = 10;
        const duration = 40;
        const shoesUsed = "Nike";
        const airTempiture = 25;
        const weatherCondition = "Cloudy";

        TriathlonData.database.addData = jest.fn().mockRejectedValue(new Error("Database error"));

        await expect(triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition)).rejects.toThrow("Error creating running session.");
    });
});
