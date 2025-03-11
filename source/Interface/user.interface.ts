export interface Iuser {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    phone: string;
    role: "user" | "admin";
    isSubscribed : boolean;
}