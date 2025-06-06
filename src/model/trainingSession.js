export const SportType = {
    SWIMMING: "Swimming",
    RUNNING: "Running",
    CYCLING: "Cycling"
};

export class TrainingSession {
    #sessionID
    static lastSessionID = 0; // Track last session ID

    constructor(date, notes, sportType, sessionID) {
        this.#sessionID = sessionID;
        this.memberID = window.localStorage.getItem("currentUser")
        this.date = date
        this.notes = notes;
        this.sportType = sportType;
    }

    get sessionID() {
        return this.#sessionID;
    }

    static generateSessionID() {
        let localID = window.localStorage.getItem("lastSessionID");
        let lastId = this.lastSessionID
        if (lastId == 0 && localID) {
            this.lastSessionID = localID
        }
        // lastId = this.lastSessionID
        let newId = ++this.lastSessionID// Pre-increment
        this.lastSessionID = newId; // Update the class property
        window.localStorage.setItem("lastSessionID", newId);
        console.log("New ID: " + newId)
        return `S${String(newId).padStart(4, '0')}`;
    }

    getDetails() {
        return `Session ID:${this.#sessionID}, Member: ${this.memberID}, Date: ${this.date}, Notes: ${this.notes}, Sport Type: ${this.sportType}`;
    }
}
