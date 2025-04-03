import { TriathlonData } from "../js/triathlonData";
export class Member {
    #memberID
    lastMemberID = 0;
    constructor(memberID, userName, fName, lName) {
        this.#memberID = memberID;
        this.userName = userName;
        this.fName = fName;
        this.lName = lName;
    }

    get memberID() {
        return this.#memberID;
    }

    getDetails() {
        return {
            memberID: this.memberID,
            userName: this.userName,
            fName: this.fName,
            lName: this.lName
        };
    }
    async createMember(userName, fName, lName) {
        if (typeof userName !== 'string') {
            throw new Error("Username must be a string");
        }
        if (typeof fName !== 'string') {
            throw new Error("First name must be a string");
        }
        if (typeof lName !== 'string') {
            throw new Error("Last name must be a string");
        }
        const allMembers = await TriathlonData.database.getAllData("Members");
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
        await TriathlonData.database.addData("Members", memberData);
        return newMember;
    }

    async deleteMember(userName) {
        let memberID;
        const allMembers = await TriathlonData.database.getAllData("Members");
        if (allMembers) {
            const member = allMembers.find(m => m.userName === userName);
            if (member) {
                memberID = member.memberID;
            }
        }
        if (memberID) {
            await TriathlonData.database.deleteData("Members", memberID);
            return true; // Member successfully deleted
        } else {
            return false; // Member not found
        }
    }
    async login(userName) {
        let memberID;
        const allMembers = await TriathlonData.database.getAllData("Members");
        if (allMembers) {
            const member = allMembers.find(m => m.userName === userName);
            if (member) {
                memberID = member.memberID;
            }
        }
        if (memberID) {
            const currentMember = await TriathlonData.database.getData("Members", memberID);
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
