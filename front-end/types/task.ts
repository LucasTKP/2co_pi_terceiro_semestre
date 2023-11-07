export interface Task {
    id: string;
    idExecuter: string
    idOwner: string
    idProject: string
    status: 'concluded' | 'open'
    title: string
    description: string
    createdDate: number
}