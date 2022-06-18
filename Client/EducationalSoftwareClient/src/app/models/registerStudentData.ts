import { User } from "../interfaces/user";
import { Student } from "./student";

export class RegisterStudentData{
    userId?: number
    username?: string
    password?: string
    userType?: string
    firstName?: string
    lastName?: string
    user?: User;
    student?: Student;
}