export interface Iuser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role: "user" | "admin";
    isSubscribed : boolean;
}