import { Member } from "../js/member"

describe("Member Class Tests", () => {

    test("Member constructor initializes properties correctly", () => {
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
});
