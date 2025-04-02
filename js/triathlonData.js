import { SwimmingSession } from "./swimmingSession";
import { RunningSession } from "./runningSession";
import { CyclingSession } from "./CyclingSession";
import { History } from "./history";
import { Database } from "./database";
import { Member } from "./member";

export class TriathlonData {
    static trainingSessions = [];
    lastMemberID = 0;

    constructor() {
        this.history = new History();
        this.database = new Database();
    }
    async initializeAndLoad() {
        await this.database.init();
        await this.loadTrainingSessions();
    }

    async loadTrainingSessions() {
        const trainingSessions = await this.database.getAllData("TrainingSessions");
        if (trainingSessions) {
            TriathlonData.trainingSessions = trainingSessions;
        }
    }

    async CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture) {
        const newSession = new SwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTempiture);
        TriathlonData.trainingSessions.push(newSession);
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
            waterTempiture: newSession.waterTempiture,
            distance: distance
        };
        await this.database.addData("TrainingSessions", sessionData);
        return newSession;
    }
    async CreateCyclingSession(date, notes, distance, duration, terain, bikeUsed, airTempiture, weatherCondition) {
        const newSession = new CyclingSession(date, notes, distance, duration, terain, bikeUsed, airTempiture, weatherCondition);
        TriathlonData.trainingSessions.push(newSession);
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
            airTempiture: newSession.airTempiture,
            weatherCondition: newSession.weatherCondition
        };
        await this.database.addData("TrainingSessions", sessionData);
        return newSession;
    }
    async CreateRunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition) {
        const newSession = new RunningSession(date, notes, distance, duration, shoesUsed, airTempiture, weatherCondition);
        TriathlonData.trainingSessions.push(newSession);
        const sessionData = {
            sessionID: newSession.sessionID,
            memberID: newSession.memberID,
            date: newSession.date,
            notes: newSession.notes,
            sportType: newSession.sportType,
            distance: newSession.distance,
            duration: newSession.duration,
            shoesUsed: newSession.shoesUsed,
            airTempiture: newSession.airTempiture,
            weatherCondition: newSession.weatherCondition
        };
        await this.database.addData("TrainingSessions", sessionData);
        return newSession;
    }


    async sortTrainingSessionsByDate(trainingSessions) {
        trainingSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
        return trainingSessions;
    }

    async sortTrainingSessionsByMemberID(trainingSessions) {
        trainingSessions.sort((a, b) => a.memberID.localeCompare(b.memberID));
        return trainingSessions
    }

    async sortTrainingSessionsBySportType(trainingSessions) {
        trainingSessions.sort((a, b) => a.sportType.localeCompare(b.sportType));
        return trainingSessions;
    }

    async sortTrainingSessionsByDistance(trainingSessions) {
        const sessionsWithDistance = trainingSessions.map(session => {
            if (session.sportType === "Swimming") {
                const swimmingSession = new SwimmingSession(session.date, session.notes, session.lapLength, session.strokeType, session.lapTimes, session.waterTempiture);
                session.distance = swimmingSession.getTotalDistance();
            }
            return session;
        });
        sessionsWithDistance.sort((a, b) => (a.distance) - (b.distance));
        return sessionsWithDistance;
    }

    async calculateTotalDistanceForDatePeriod(trainingSessions, startDate, endDate) {
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
                const swimmingSession = new SwimmingSession(session.date, session.notes, session.lapLength, session.strokeType, session.lapTimes, session.waterTempiture);
                distance = swimmingSession.getTotalDistance();
            }
            if (distance) {
                totalDistance += distance;
            }
        });

        return totalDistance;
    }

    async calculateAveragePace(trainingSessions) {
        let totalDistance = 0;
        let totalDuration = 0;

        trainingSessions.forEach(session => {
            let distance = session.distance;
            if (session.sportType === "Swimming") {
                const swimmingSession = new SwimmingSession(session.date, session.notes, session.lapLength, session.strokeType, session.lapTimes, session.waterTempiture);
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
        return await this.database.getData("TrainingSessions", sessionID);
    }


    async searchTrainingSessions(searchType, searchQuery) {
        const loggedInMemberID = window.localStorage.getItem("currentUser");

        if (!loggedInMemberID) {
            return { message: "Please log in to search for training sessions." };
        }

        const trainingSessions = await this.database.getAllData("TrainingSessions");
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
            throw new Error("You are not authorized to delete this session");
        }
        TriathlonData.trainingSessions = TriathlonData.trainingSessions.filter(session => session.sessionID !== sessionID);
        await this.database.deleteData("TrainingSessions", sessionID);
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
            throw new Error("You are not authorized to edit this session");
        }

        // Update the session details
        Object.assign(sessionToEdit, updatedSession);
        await this.database.updateData("TrainingSessions", sessionToEdit);
        //Adds old session to history list
        this.history.addHistory(sessionToEdit);
        return sessionToEdit;
    }

    async createMember(userName, fName, lName) {
        const allMembers = await this.database.getAllData("Members");
        if (allMembers) {
            const member = allMembers.find(m => m.userName === userName);
            if (member) {
                throw new Error("User already exists!");
            }
        }
        // Generate the next memberID
        const memberID = this.generateMemberID();
        const newMember = new Member(memberID, userName, fName, lName);
        const memberData = {
            memberID: newMember.memberID,
            userName: newMember.userName,
            fName: newMember.fName,
            lName: newMember.lName
        };
        await this.database.addData("Members", memberData);
        return newMember;
    }

    async deleteMember(userName) {
        let memberID;
        const allMembers = await this.database.getAllData("Members");
        if (allMembers) {
            const member = allMembers.find(m => m.userName === userName);
            if (member) {
                memberID = member.memberID;
            }
        }
        if (memberID) {
            await this.database.deleteData("Members", memberID);
            return true; // Member successfully deleted
        } else {
            return false; // Member not found
        }
    }

    async login(userName) {
        let memberID;
        const allMembers = await this.database.getAllData("Members");
        if (allMembers) {
            const member = allMembers.find(m => m.userName === userName);
            if (member) {
                memberID = member.memberID;
            }
        }
        if (memberID) {
            const currentMember = await this.database.getData("Members", memberID);
            if (currentMember) {
                window.localStorage.setItem("currentUser", currentMember.memberID); // Sets the current member in local storage
                return true; // Login successful
            }
        }
        return false; // Login failed (user not found)
    }

    logout() {
        window.localStorage.removeItem("currentUser");
    }

    generateMemberID() {
        this.lastMemberID++; // Increment last used ID
        return `M${String(this.lastMemberID).padStart(4, '0')}`;
    }
}
