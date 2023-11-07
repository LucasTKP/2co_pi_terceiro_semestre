import { Task } from "./task";
import { DataUser } from "./user";

export interface Project {
    id: string;
    name: string;
    idCowokers: string[]
    coworkers: DataUser[]
    tasks: Task[]
}