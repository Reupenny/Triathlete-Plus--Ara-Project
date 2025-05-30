export const SportType = {
    SWIMMING: "Swimming",
    RUNNING: "Running",
    CYCLING: "Cycling"
};

export class TrainingSession {
    static lastSessionID = 0; // Track last session ID
    #sessionID

    constructor(date, notes, sportType) {
        this.#sessionID = TrainingSession.generateSessionID();
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
        if (lastId == 0 & localID) {
            this.lastSessionID = localID
        }

        this.lastSessionID++; // Increment last used ID
        window.localStorage.setItem("lastSessionID", this.lastSessionID);
        return `S${String(this.lastSessionID).padStart(4, '0')}`;
    }

    getDetails() {
        return `Session ID:${this.#sessionID}, Member: ${this.memberID}, Date: ${this.date}, Notes: ${this.notes}, Sport Type: ${this.sportType}`;
    }
}
