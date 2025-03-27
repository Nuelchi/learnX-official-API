export interface IcourseEnroll {
    firstname: string;
    lastname: string;
    email: string;
    yearofbirth: Number;
    dayofbirth: Number;
    monthofbirth: Number;
    gender: string;
    phone: string;
    track: "backend" | "frontend" | "product-design" | "data-analysis" | "artificial-intelligence";
    address: string;
}