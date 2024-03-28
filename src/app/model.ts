export interface CatModel {
    id:   number;
    name:  string;
    image: string;
    score: number;
}

export interface UserModel {
    id:   number;
    name:  string;
    avatar: string;
    email: string;
   password: string;
   type: string;
}
export interface UserIMG{
    id:number;
    name:string;
    image:string;
    score:number;
    ranking:number;
}