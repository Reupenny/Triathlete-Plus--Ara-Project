// Import the Database class from the external module
import { Database } from "../js/database.js"

describe("Database", () => {
    // Declare a variable to hold the instance of Database
    let database

    // Before all tests, create a new instance of Database
    beforeAll(() => {
        database = new Database("testDB", "Members", "TrainingSessions")
    })

    // After each test, delete the database to ensure a clean state for the next test
    afterEach((done) => {
        database.deleteDatabase().then(done)
    })

    test("Should initialise IndexedDB", async () => {
        await database.init()
        expect(database.db).not.toBeNull()
    })

    test("Should handle error when initialising IndexedDB", async () => {
        await database.init(10)
        database.close()
        let aPromise = database.init()
        await expect(aPromise).rejects.toThrow("Failed to open database")
    })

    test("Alternative approach: Should handle error when initialising IndexedDB", () => {
        // Save the original method
        const originalOpen = window.indexedDB.open

        // Mock indexedDB.open to trigger an error
        window.indexedDB.open = jest.fn(() => {
            const mockOpenRequest = {
                onerror: null,
                onupgradeneeded: null,
                onsuccess: null,
                addEventListener: function (event, handler) {
                    if (event === "error") {
                        this.onerror = handler
                    }
                },
                dispatchEvent: function (event) {
                    if (event === "error" && this.onerror) {
                        this.onerror({ target: { error: "Test error" } })
                    }
                },
            }
            setTimeout(() => mockOpenRequest.dispatchEvent("error"), 0)
            return mockOpenRequest
        })

        const database = new Database("testDB", "Members", "TrainingSessions")
        const initPromise = database.init()

        // Expect the promise to reject with the error message
        expect(initPromise).rejects.toEqual(
            new Error("Failed to open database: Test error")
        )

        // Restore the original method
        window.indexedDB.open = originalOpen
    })

    test("Should add and retrieve data from IndexedDB", async () => {
        await database.init()
        const testData = { memberID: 1, name: "Test" }
        await database.addData("Members", testData)
        const retrievedData = await database.getData("Members", 1)
        expect(retrievedData).toEqual(testData)
    })

    test("Should delete data from IndexedDB", async () => {
        await database.init()
        const testData = { memberID: 1, name: "Test" }
        await database.addData("Members", testData)
        await database.deleteData("Members", 1)
        const retrievedData = await database.getData("Members", 1)
        expect(retrievedData).toBeUndefined()
    })

    test("Should handle error when getting data from IndexedDB", async () => {
        // save the original method
        const originalGet = IDBObjectStore.prototype.get

        // Mock the get function to throw an error
        IDBObjectStore.prototype.get = jest.fn(() => {
            const request = {}
            setTimeout(() => {
                request.onerror({ target: { error: "Failed to get data" } })
            }, 0)
            return request
        })

        await database.init()
        const testData = { memberID: 1, name: "Test" }
        await database.addData("Members", testData)
        let aPromise = database.getData("Members", 1)
        await expect(aPromise).rejects.toThrow("Failed to get data")

        // Restore the original method
        IDBObjectStore.prototype.get = originalGet
    })

    test("Should not throw error when closing without db", () => {
        database.close()
        expect(database.db).toBeNull()
    })

    test("Should not create object store when it already exists", async () => {
        // Initialise the database and create the object store
        await database.init()

        // Close the database
        database.close()

        // Save the original method
        const originalCreateObjectStore = IDBDatabase.prototype.createObjectStore

        // Mock the createObjectStore function to fail if it is called
        IDBDatabase.prototype.createObjectStore = jest.fn(() => {
            throw new Error("createObjectStore should not be called")
        })

        // Try to initialise the database again
        let aPromise = database.init(10)
        await expect(aPromise).resolves.toBeUndefined()

        // Check that createObjectStore was not called
        expect(IDBDatabase.prototype.createObjectStore).not.toHaveBeenCalled()

        // Restore the original method
        IDBDatabase.prototype.createObjectStore = originalCreateObjectStore
    })

    test("Should handle error when adding data to IndexedDB", async () => {
        // save the original method
        const originalAdd = IDBObjectStore.prototype.add

        // Mock the add function to trigger an error
        IDBObjectStore.prototype.add = jest.fn(() => {
            const request = {}
            setTimeout(() => {
                request.onerror({ target: { error: "Failed to add data" } })
            }, 0)
            return request
        })

        await database.init()
        const testData = { memberID: 1, name: "Test" }
        let aPromise = database.addData("Members", testData)
        await expect(aPromise).rejects.toThrow("Failed to add data")

        // Restore the original method
        IDBObjectStore.prototype.add = originalAdd
    })

    test("Should handle error when deleting data from IndexedDB", async () => {
        // save the original method
        const originalDelete = IDBObjectStore.prototype.delete

        // Mock the delete function to trigger an error
        IDBObjectStore.prototype.delete = jest.fn(() => {
            const request = {}
            setTimeout(() => {
                request.onerror({ target: { error: "Failed to delete data" } })
            }, 0)
            return request
        })

        await database.init()
        const testData = { memberID: 1, name: "Test" }
        await database.addData("Members", testData)
        let aPromise = database.deleteData("Members", 1)
        await expect(aPromise).rejects.toThrow("Failed to delete data")

        // Restore the original method
        IDBObjectStore.prototype.delete = originalDelete
    })

    test("Should handle error when deleting database", async () => {
        // Save the original method
        const originalDeleteDatabase = window.indexedDB.deleteDatabase

        // Mock the deleteDatabase function to trigger an error
        window.indexedDB.deleteDatabase = jest.fn(() => {
            const request = {}
            setTimeout(() => {
                request.onerror({ target: { error: "Failed to delete database" } })
            }, 0)
            return request
        })

        await database.init()
        let aPromise = database.deleteDatabase()
        await expect(aPromise).rejects.toThrow("Failed to delete database")

        // Restore the original method
        window.indexedDB.deleteDatabase = originalDeleteDatabase
    })

    test("Should successfully delete database", async () => {
        await database.init()
        await database.deleteDatabase()
    })

    test("Should update data in IndexedDB", async () => {
        await database.init()
        const testData = { memberID: 1, name: "Test" }
        await database.addData("Members", testData)
        const updatedData = { memberID: 1, name: "Updated Test" }
        await database.updateData("Members", updatedData)
        const retrievedData = await database.getData("Members", 1)
        expect(retrievedData).toEqual(updatedData)
    })

    test("Should handle error when updating data in IndexedDB", async () => {
        // Save the original method
        const originalPut = IDBObjectStore.prototype.put

        // Mock the put function to trigger an error
        IDBObjectStore.prototype.put = jest.fn(() => {
            const request = {}
            setTimeout(() => {
                request.onerror({ target: { error: "Failed to update data" } })
            }, 0)
            return request
        })

        await database.init()
        const testData = { memberID: 1, name: "Test" }
        // Try to update the data and expect it to throw an error
        let aPromise = database.updateData("Members", testData)
        await expect(aPromise).rejects.toThrow("Failed to update data")

        // Restore the original method
        IDBObjectStore.prototype.put = originalPut
    })

    test("Should get all data from IndexedDB", async () => {
        await database.init();
        const testData1 = { memberID: 1, name: "Test1" };
        const testData2 = { memberID: 2, name: "Test2" };
        await database.addData("Members", testData1);
        await database.addData("Members", testData2);
        const allData = await database.getAllData("Members");
        expect(allData).toEqual([testData1, testData2]);
    });

    test("Should handle error when getting all data from IndexedDB", async () => {
        // Save the original method
        const originalGetAll = IDBObjectStore.prototype.getAll;

        // Mock the getAll function to trigger an error
        IDBObjectStore.prototype.getAll = jest.fn(() => {
            const request = {};
            setTimeout(() => {
                request.onerror({ target: { error: "Failed to get all data" } });
            }, 0);
            return request;
        });

        await database.init();
        let aPromise = database.getAllData("Members");
        await expect(aPromise).rejects.toThrow("Failed to get all data");

        // Restore the original method
        IDBObjectStore.prototype.getAll = originalGetAll;
    });
})
