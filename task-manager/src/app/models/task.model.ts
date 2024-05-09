export interface Task{
    taskName: string;
    priority: string;
    urgency: string;
    id?: string;
    deadline?: Date;
}

export class TaskImpl implements Task {
    constructor(
        public taskName: string,
        public priority: string,
        public urgency: string,
        public deadline?: Date,
        public id?: string
    ) {}
}