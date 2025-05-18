export class History {
    constructor() {
        this.history = [];
        this.loadHistory();
    }

    addHistory(trainingSession) {
        const trainingSessionCopy = JSON.parse(JSON.stringify(trainingSession));
        this.history.push(trainingSessionCopy);
        // removes the oldest entry in history if there are more than 5 entries
        if (this.history.length > 5) {
            this.history.shift();
        }
        this.saveHistory();
    }

    getHistory() {
        return this.history;
    }

    saveHistory() {
        window.localStorage.setItem('history', JSON.stringify(this.history));
    }

    getSessionFromHistory(sessionID) {
        // Find the last (newest) session in the history array by its ID
        for (let i = this.history.length - 1; i >= 0; i--) {
            if (this.history[i].sessionID === sessionID) {
                return this.history[i];
            }
        }
        return undefined; // Return undefined if not found
    }

    removeSessionFromHistory(sessionID) {
        // Find the index of the last (newest) session with the matching ID
        let indexToRemove = -1;
        for (let i = this.history.length - 1; i >= 0; i--) {
            if (this.history[i].sessionID === sessionID) {
                indexToRemove = i;
                break;
            }
        }

        // If found, remove the session at that index
        if (indexToRemove !== -1) {
            this.history.splice(indexToRemove, 1);
            this.saveHistory();
            return true; // Indicate successful removal
        }
        return false; // Indicate session not found or not removed
    }
    loadHistory() {
        const historyData = localStorage.getItem('history');
        if (historyData) {
            this.history = JSON.parse(historyData);
        }
    }
}
