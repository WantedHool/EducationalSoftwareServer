import { User } from "./user";

export class Student extends User{
    userId?: number;
    studentId?: number;
    firstName?: string;
    lastName?: string;
    class?: number;


    constructor(){
        super();
        this.userId = 0;
        this.firstName = "";
        this.lastName = "";
        this.class = 0;
    }
}