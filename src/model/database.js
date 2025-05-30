import "core-js/stable/structured-clone"

export class Database {

    constructor(dbName = "TryathlonApp", members = "Members", trainingSessions = "TrainingSessions") {
        this.dbName = dbName
        this.members = members
        this.trainingSessions = trainingSessions
    }

    // The init method opens a connection to the IndexedDB
    async init(version = 1) {
        return new Promise((resolve, reject) => {
            // Open a connection to the database
            const request = window.indexedDB.open(this.dbName, version)

            // Handle database opening errors
            request.onerror = (event) => {
                reject(new Error(`Failed to open database: ${event.target.error}`))
            }

            // Handle database upgrades
            request.onupgradeneeded = (event) => {
                const db = event.target.result
                // Create a new object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.members)) {
                    db.createObjectStore(this.members, { keyPath: "memberID" })
                }
                if (!db.objectStoreNames.contains(this.trainingSessions)) {
                    db.createObjectStore(this.trainingSessions, { keyPath: "sessionID" })
                }
            }

            // Handle successful database opening
            request.onsuccess = (event) => {
                this.db = event.target.result
                resolve()
            }
        })
    }
    // 
    // 
    // Add Members or Training Sessions
    async addData(type, data) {
        return new Promise((resolve, reject) => {
            // Start a new transaction
            const transaction = this.db.transaction(type, "readwrite");
            const store = transaction.objectStore(type);
            const request = store.add(data);

            // Handle errors when adding data
            request.onerror = (event) => {
                console.error('Error adding data to IndexedDB:', event.target.error)
                reject(new Error(`Failed to add data: ${event.target.error}`))
            }

            // Handle successful data addition
            request.onsuccess = (event) => {
                console.log('Data added to IndexedDB successfully.')
                resolve()
            }
        })
    }
    //
    //
    // Get Member or Training Session
    async getData(type, key) {
        return new Promise((resolve, reject) => {
            // Start a new transaction
            const transaction = this.db.transaction(type, "readonly");
            const store = transaction.objectStore(type);
            const request = store.get(key)

            // Handle errors when retrieving data
            request.onerror = (event) => {
                reject(new Error(`Failed to get data: ${event.target.error}`))
            }

            // Handle successful data retrieval
            request.onsuccess = (event) => {
                resolve(event.target.result)
            }
        })
    }
    // 
    // 
    // Delete Member or Training Session
    async deleteData(type, key) {
        return new Promise((resolve, reject) => {
            // Start a new transaction
            const transaction = this.db.transaction(type, "readwrite")
            const store = transaction.objectStore(type)
            const request = store.delete(key)

            // Handle errors when deleting data
            request.onerror = (event) => {
                reject(new Error(`Failed to delete data: ${event.target.error}`))
            }

            // Handle successful data deletion
            request.onsuccess = (event) => {
                resolve()
            }
        })
    }
    // 
    // 
    // Update Member or Training Session
    async updateData(type, data) {
        return new Promise((resolve, reject) => {
            // Start a new transaction
            const transaction = this.db.transaction(type, "readwrite")
            const store = transaction.objectStore(type)
            const request = store.put(data)

            // Handle errors when updating data
            request.onerror = (event) => {
                reject(new Error(`Failed to update data: ${event.target.error}`))
            }

            // Handle successful data update
            request.onsuccess = (event) => {
                resolve()
            }
        })
    }
    // 
    // 
    // Close the connection to the database
    close() {
        if (this.db) {
            this.db.close()
            this.db = null
        }
    }
    // 
    // 
    // Deletes the entire database
    async deleteDatabase() {
        return new Promise((resolve, reject) => {
            // Close the database before deleting it
            this.close()
            const request = window.indexedDB.deleteDatabase(this.dbName)

            // Handle errors when deleting the database
            request.onerror = (event) => {
                reject(new Error(`Failed to delete database: ${event.target.error}`))
            }

            // Handle successful database deletion
            request.onsuccess = (event) => {
                console.log("Database deleted")
                resolve()
            }
        })
    }

    // Get all data from a specific object store
    async getAllData(type) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(type, "readonly");
            const store = transaction.objectStore(type);
            const request = store.getAll();

            request.onerror = (event) => {
                reject(new Error(`Failed to get all data: ${event.target.error}`));
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
    }
}
