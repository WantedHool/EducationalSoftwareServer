export enum UserType {
    Student,
    Teacher
}

export const RoleMapping = [
    { value: UserType.Student, type: 'Student' },
    { value: UserType.Teacher, type: 'Teacher' }
];

