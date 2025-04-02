export class Member {
    #memberID
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
}
