export default interface UserType {
    _id?: string;
    firstName: string;
    lastName: string;
    idNo: string;
    email: string;
    password: string;
    photoURL: string;
    role: string;
    shop?: string;
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
}