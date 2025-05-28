import { SwimmingSession } from "./swimmingSession";
import { RunningSession } from "./runningSession";
import { CyclingSession } from "./cyclingSession";
import { History } from "./history";
import { Database } from "./database";
import { isValid, parse } from 'date-fns';

export class TriathlonData {
    static database = new Database();

    constructor() {
        this.history = new History();
    }
    async initialiseAndLoad() {
        await TriathlonData.database.init();
    }

    async CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature) {
        // Handle missing date:  If no date is provided, use the current date
        if (!date) {
            date = new Date().toLocaleDateString('en-NZ');
        }
        // Type Checks and Existence Checks
        if (typeof lapLength !== 'number') {
            throw new Error("Lap Length must be a number");
        }
        if (!strokeType) {
            throw new Error("Stroke Type is required.");
        }
        if (typeof strokeType !== 'string') {
            throw new Error("Stroke Type must be a string.");
        }
        // Water Temperature Type Check:  Ensure waterTemperature is a number
        if (typeof waterTemperature !== 'number') {
            throw new Error("Water temperature must be a number.");
        }
        // Range Checks:  Validate that numeric values are within acceptable ranges
        if (lapLength <= 0) {
            throw new Error("Lap length must be greater than zero.");
        }
        if (waterTemperature < 0 || waterTemperature > 40) {
            throw new Error("Water temperature must be between 0 and 40 degrees Celsius.");
        }
        // Format Validation Date
        const parsedDate = parse(date, 'd/M/yyyy', new Date());
        if (!isValid(parsedDate)) {
            throw new Error(`Invalid date. Please use d/M/yyyy and ensure a valid date.`);
        }
        // Array Validation
        if (!Array.isArray(lapTimes)) {
            throw new Error("Lap times must be an array.");
        }

        if (lapTimes.length > 0) {
            for (const lapTime of lapTimes) {
                if (typeof lapTime !== 'number' || lapTime <= 0) {
                    throw new Error("Lap times must be numbers greater than zero.");
                }
            }
        }
        try {
            const newSession = new SwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature);
            const distance = newSession.getTotalDistance();
            const sessionData = {
                sessionID: newSession.sessionID,
                memberID: newSession.memberID,
                date: newSession.date,
                notes: newSession.notes,
                sportType: newSession.sportType,
                lapLength: newSession.lapLength,
                strokeType: newSession.strokeType,
                laps: newSession.laps,
                lapTimes: newSession.lapTimes,
                waterTemperature: newSession.waterTemperature,
                distance: distance
            };
            await TriathlonData.database.addData("TrainingSessions", sessionData);
            return newSession;

        } catch (error) {
            throw new Error("Error creating swimming session.", error);
        }
    }

    async CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTemperature, weatherCondition) {
        // Handle missing date:  If no date is provided, use the current date in 'en-NZ' format
        if (!date) {
            date = new Date().toLocaleDateString('en-NZ');
        }
        // Type Checks and Existence Checks
        if (typeof distance !== 'number') {
            throw new Error("Distance must be a number.");
        }
        if (typeof duration !== 'number') {
            throw new Error("Duration must be a number.");
        }
        if (duration <= 0) {
            throw new Error("Duration must be greater than zero.");
        }
        if (!terrain) {
            throw new Error("Terrain is required.");
        }
        if (typeof terrain !== 'string') {
            throw new Error("Terrain must be a string.");
        }
        if (!bikeUsed) {
            throw new Error("Bike Used is required.");
        }
        if (typeof bikeUsed !== 'string') {
            throw new Error("Bike Used must be a string.");
        }
        if (!weatherCondition) {
            weatherCondition = "";
        }
        if (weatherCondition && typeof weatherCondition !== 'string') {
            throw new Error("Weather Condition must be a string.");
        }
        // Range Checks
        if (distance <= 0) {
            throw new Error("Distance must be greater than zero.");
        }
        if (!airTemperature) {
            airTemperature = "NA"
        }
        if (typeof airTemperature !== 'number' && airTemperature !== "NA") {
            throw new Error("Air temperature must be a number.");
        }
        if (airTemperature !== "NA" && (airTemperature < -20 || airTemperature > 50)) {
            throw new Error("Air temperature must be between -20 and 50 degrees Celsius.");
        }

        // Format Validation Date
        const parsedDate = parse(date, 'd/M/yyyy', new Date());
        if (!isValid(parsedDate)) {
            throw new Error(`Invalid date. Please use d/M/yyyy and ensure a valid date.`);
        }

        try {
            const newSession = new CyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTemperature, weatherCondition);
            const sessionData = {
                sessionID: newSession.sessionID,
                memberID: newSession.memberID,
                date: newSession.date,
                notes: newSession.notes,
                sportType: newSession.sportType,
                distance: newSession.distance,
                duration: newSession.duration,
                terrain: newSession.terrain,
                bikeUsed: newSession.bikeUsed,
                airTemperature: newSession.airTemperature,
                weatherCondition: newSession.weatherCondition
            };
            await TriathlonData.database.addData("TrainingSessions", sessionData);
            return newSession;
        } catch (error) {
            throw new Error("Error creating cycling session.", error);
        }
    }
    async CreateRunningSession(date, notes, distance, duration, shoesUsed, airTemperature, weatherCondition) {
        // Handle missing date:  If no date is provided, use the current date in 'en-NZ' format
        if (!date) {
            date = new Date().toLocaleDateString('en-NZ');
        }
        // Type Checks and Existence Checks
        if (typeof distance !== 'number') {
            throw new Error("Distance must be a number.");
        }
        if (typeof duration !== 'number') {
            throw new Error("Duration must be a number.");
        }
        if (duration <= 0) {
            throw new Error("Duration must be greater than zero.");
        }
        if (!shoesUsed) {
            throw new Error("Shoes Used is required.");
        }
        if (typeof shoesUsed !== 'string') {
            throw new Error("Shoes Used must be a string.");
        }
        if (!weatherCondition) {
            weatherCondition = "";
        }
        if (weatherCondition && typeof weatherCondition !== 'string') {
            throw new Error("Weather Condition must be a string.");
        }
        // Range Checks
        if (distance <= 0) {
            throw new Error("Distance must be greater than zero.");
        }
        if (!airTemperature) {
            airTemperature = "NA"
        }
        if (typeof airTemperature !== 'number' && airTemperature !== "NA") {
            throw new Error("Air temperature must be a number.");
        }
        if (airTemperature !== "NA" && (airTemperature < -20 || airTemperature > 50)) {
            throw new Error("Air temperature must be between -20 and 50 degrees Celsius.");
        }

        // Format Validation Date
        const parsedDate = parse(date, 'd/M/yyyy', new Date());
        if (!isValid(parsedDate)) {
            throw new Error(`Invalid date. Please use d/M/yyyy and ensure a valid date.`);
        }
        try {
            const newSession = new RunningSession(date, notes, distance, duration, shoesUsed, airTemperature, weatherCondition);
            const sessionData = {
                sessionID: newSession.sessionID,
                memberID: newSession.memberID,
                date: newSession.date,
                notes: newSession.notes,
                sportType: newSession.sportType,
                distance: newSession.distance,
                duration: newSession.duration,
                shoesUsed: newSession.shoesUsed,
                airTemperature: newSession.airTemperature,
                weatherCondition: newSession.weatherCondition
            };
            await TriathlonData.database.addData("TrainingSessions", sessionData);
            return newSession;
        } catch (error) {
            throw new Error("Error creating running session.", error);
        }
    }

    async sortTrainingSessionsByDate(trainingSessions) {
        if (!Array.isArray(trainingSessions)) {
            throw new Error("Training sessions must be an array.");
        }
        trainingSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
        return trainingSessions;
    }

    async sortTrainingSessionsByMemberID(trainingSessions) {
        if (!Array.isArray(trainingSessions)) {
            throw new Error("Training sessions must be an array.");
        }
        trainingSessions.sort((a, b) => a.memberID.localeCompare(b.memberID));
        return trainingSessions
    }

    async sortTrainingSessionsBySportType(trainingSessions) {
        if (!Array.isArray(trainingSessions)) {
            throw new Error("Training sessions must be an array.");
        }
        trainingSessions.sort((a, b) => a.sportType.localeCompare(b.sportType));
        return trainingSessions;
    }

    async sortTrainingSessionsByDistance(trainingSessions) {
        if (!Array.isArray(trainingSessions)) {
            throw new Error("Training sessions must be an array.");
        }
        const sessionsWithDistance = trainingSessions.map(session => {
            if (session.sportType === "Swimming") {
                const swimmingSession = new SwimmingSession(session.date, session.notes, session.lapLength, session.strokeType, session.lapTimes, session.waterTemperature);
                session.distance = swimmingSession.getTotalDistance();
            }
            return session;
        });
        sessionsWithDistance.sort((a, b) => (a.distance) - (b.distance));
        return sessionsWithDistance;
    }

    async calculateTotalDistanceForDatePeriod(trainingSessions, startDate, endDate) {
        if (!Array.isArray(trainingSessions)) {
            throw new Error("Training sessions must be an array.");
        }

        if (startDate) {
            const parsedStartDate = parse(startDate, 'd/M/yyyy', new Date());
            if (!isValid(parsedStartDate)) {
                throw new Error(`Invalid start date. Please use d/M/yyyy and ensure a valid date.`);
            }
        }

        if (endDate) {
            const parsedEndDate = parse(endDate, 'd/M/yyyy', new Date());
            if (!isValid(parsedEndDate)) {
                throw new Error(`Invalid end date. Please use d/M/yyyy and ensure a valid date.`);
            }
        }

        let totalDistance = 0;
        let filteredSessions = trainingSessions;

        if (startDate && endDate) {
            filteredSessions = trainingSessions.filter(session => {
                const sessionDate = new Date(session.date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return sessionDate >= start && sessionDate <= end;
            });
        }

        filteredSessions.forEach(session => {
            let distance = session.distance;
            if (session.sportType === "Swimming") {
                const swimmingSession = new SwimmingSession(session.date, session.notes, session.lapLength, session.strokeType, session.lapTimes, session.waterTemperature);
                distance = swimmingSession.getTotalDistance();
            }
            if (distance) {
                totalDistance += distance;
            }
        });

        return totalDistance;
    }

    async calculateAveragePace(trainingSessions) {
        if (!Array.isArray(trainingSessions)) {
            throw new Error("Training sessions must be an array.");
        }
        let totalDistance = 0;
        let totalDuration = 0;

        trainingSessions.forEach(session => {
            let distance = session.distance;
            if (session.sportType === "Swimming") {
                const swimmingSession = new SwimmingSession(session.date, session.notes, session.lapLength, session.strokeType, session.lapTimes, session.waterTemperature);
                distance = swimmingSession.getTotalDistance();
            }

            if (distance && session.duration) {
                totalDistance += distance;
                totalDuration += session.duration;
            }
        });

        if (totalDistance === 0 || totalDuration === 0) {
            return "No training sessions found with valid distance and duration.";
        }

        const averagePace = totalDuration / totalDistance;
        return `Average pace: ${averagePace.toFixed(2)} minutes per kilometer`;
    }

    async findTrainingSessionByID(sessionID) {
        if (typeof sessionID !== 'string' || !sessionID) {
            throw new Error("Session ID must be a non-empty string.");
        }
        return await TriathlonData.database.getData("TrainingSessions", sessionID);
    }


    async searchTrainingSessions(searchType, searchQuery) {
        // searchType selects the row of data to search for the searchQuery in 
        const loggedInMemberID = window.localStorage.getItem("currentUser");

        if (!loggedInMemberID) {
            return { message: "Please log in to search for training sessions." };
        }

        const trainingSessions = await TriathlonData.database.getAllData("TrainingSessions");
        const results = {};

        trainingSessions.forEach(session => {
            if (session.memberID === loggedInMemberID && session[searchType] && session[searchType].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                results[session.sessionID] = session;
            }
        });

        return results;
    }


    async deleteTrainingSession(sessionID) {
        const loggedInMemberID = window.localStorage.getItem("currentUser");
        const sessionToDelete = await this.findTrainingSessionByID(sessionID);
        if (!sessionToDelete) {
            throw new Error("Session not found");
        }
        if (sessionToDelete.memberID !== loggedInMemberID) {
            throw new Error("You are not authorised to delete this session");
        }
        await TriathlonData.database.deleteData("TrainingSessions", sessionID);
        //Adds old session to history list
        this.history.addHistory(sessionToDelete);
    }

    async editTrainingSession(sessionID, updatedSession) {
        const loggedInMemberID = window.localStorage.getItem("currentUser");
        const sessionToEdit = await this.findTrainingSessionByID(sessionID);

        if (!sessionToEdit) {
            throw new Error("Session not found");
        }
        if (sessionToEdit.memberID !== loggedInMemberID) {
            throw new Error("You are not authorised to edit this session");
        }
        //Adds old session to history list
        this.history.addHistory(sessionToEdit);
        // Update the session details
        Object.assign(sessionToEdit, updatedSession);
        await TriathlonData.database.updateData("TrainingSessions", sessionToEdit);
        return sessionToEdit;
    }

    async restoreTrainingSession(sessionID) {
        const loggedInMemberID = window.localStorage.getItem("currentUser");
        // Get the session data from history (newest match)
        const sessionData = this.history.getSessionFromHistory(sessionID);

        if (!sessionData) {
            throw new Error(`Session with ID ${sessionID} not found in history.`);
        }
        if (sessionData.memberID !== loggedInMemberID) {
            throw new Error("You are not authorised to restore this session");
        }
        try {
            // Add or update the session in the database
            const existingSession = await TriathlonData.database.getData("TrainingSessions", sessionID);
            if (existingSession) {
                await TriathlonData.database.updateData("TrainingSessions", sessionData);
            }
            else {
                await TriathlonData.database.addData("TrainingSessions", sessionData);
            }
            //Remove the session from history
            this.history.removeSessionFromHistory(sessionID);
            // Return the restored session data
            return sessionData;
        } catch (error) {
            // Handle potential database errors during addData
            throw new Error(`Failed to restore session ${sessionID}: ${error.message}`);
        }
    }
}
