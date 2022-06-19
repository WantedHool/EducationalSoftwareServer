import { User } from "./user";

export class Student extends User{
    userId?: number;
    name?: string;
    surname?: string;


    constructor(){
        super();
        this.userId = 0;
        this.name = "";
        this.surname = "";
    }
}