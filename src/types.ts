export type Identifier = string | number;
export interface User {
    id: number;
    name: string;
   
    email: string;
    dob: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
};

export interface Token {
    token: string;
}




