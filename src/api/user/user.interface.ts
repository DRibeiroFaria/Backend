export interface BaseUser {
    username : string;
    email: string;
    pass: string;
    created_at: Date;
    updated_at: Date;
}

export interface User extends BaseUser {
    id: number;
}