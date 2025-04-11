export class History {
    constructor() {
        this.history = [];
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
}
