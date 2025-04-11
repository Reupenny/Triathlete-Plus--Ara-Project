import { Member } from "../js/member"
import { TriathlonData } from "../js/triathlonData";

describe("Member Class Tests", () => {
    let triathlonData;
    let member;

    beforeEach(async () => {
        triathlonData = new TriathlonData();
        await triathlonData.initialiseAndLoad();
        member = new Member("M0000", "testuser", "Test", "User"); // Dummy memberID

    });
    afterEach((done) => {
        localStorage.clear();
        TriathlonData.database.deleteDatabase().then(done);
    }, 5000);

    test("Member constructor initialises properties correctly", () => {
        const memberID = "M0001";
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        const member = new Member(memberID, userName, fName, lName);

        expect(member.memberID).toBe(memberID);
        expect(member.userName).toBe(userName);
        expect(member.fName).toBe(fName);
        expect(member.lName).toBe(lName);
    });

    test("memberID getter returns the correct memberID", () => {
        const memberID = "M0001";
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        const member = new Member(memberID, userName, fName, lName);

        expect(member.memberID).toBe(memberID);
    });

    test("getDetails method returns the correct member details", () => {
        const memberID = "M0001";
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        const member = new Member(memberID, userName, fName, lName);

        const details = member.getDetails();

        expect(details.memberID).toBe(memberID);
        expect(details.userName).toBe(userName);
        expect(details.fName).toBe(fName);
        expect(details.lName).toBe(lName);
    });

    test("createMember creates a new member and adds it to the database", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";

        const newMember = await member.createMember(userName, fName, lName);

        expect(newMember).toBeInstanceOf(Member);
        expect(newMember.userName).toBe(userName);
        expect(newMember.fName).toBe(fName);
        expect(newMember.lName).toBe(lName);
        expect(newMember.memberID).toBeDefined();
        const storedMember = await TriathlonData.database.getData("Members", newMember.memberID);
        expect(storedMember).toBeDefined();
    });

    test("deleteMember deletes an existing member", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        const newMember = await member.createMember(userName, fName, lName);

        const deleteResult = await member.deleteMember(userName);
        expect(deleteResult).toBe(true);
    });

    test("login logs in an existing member", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        await member.createMember(userName, fName, lName);

        const loginResult = await member.login(userName);
        expect(loginResult).toBe(true);
        expect(window.localStorage.getItem("currentUser")).toBeDefined();
    });

    test("logout logs out the current member", async () => {
        const userName = "user1";
        const fName = "Alex";
        const lName = "Apple";
        await member.createMember(userName, fName, lName);
        await member.login(userName);

        member.logout();
        expect(window.localStorage.getItem("currentUser")).toBeNull();
    });

    test("login throws an error if member is not found", async () => {
        const userName = "nonexistentUser";
        const loginResult = await member.login(userName);
        expect(loginResult).toBe(false);
    });

    test("deleteMember returns false if member is not found", async () => {
        const userName = "nonexistentUser";
        const deleteResult = await member.deleteMember(userName);
        expect(deleteResult).toBe(false);
    });
});
