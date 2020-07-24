// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, link) {
        super(name, id, email);
        this.link = link;
    }
    getGithub() {
        return this.link;
    }
    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;