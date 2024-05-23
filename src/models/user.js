class User {
    constructor(id, type, firstName, lastName, phoneNumber, email, lendings) {
        this.id = id;
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.lendings = lendings;
    }
}

module.exports = User;