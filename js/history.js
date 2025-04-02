export class History {
    constructor() {
        this.history = [];
        this.loadHistory();
    }

    addHistory(trainingSession) {
        const trainingSessionCopy = JSON.parse(JSON.stringify(trainingSession));
        this.history.push(trainingSessionCopy);
        if (this.history.length > 5) {
            this.history.shift(); // Remove the oldest entry
        }
        this.saveHistory();
    }

    getHistory() {
        return this.history;
    }

    saveHistory() {
        localStorage.setItem('history', JSON.stringify(this.history));
    }

    loadHistory() {
        const historyData = localStorage.getItem('history');
        if (historyData) {
            this.history = JSON.parse(historyData);
        }
    }
}
