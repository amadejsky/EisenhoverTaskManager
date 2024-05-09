import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Subscription, throwError } from "rxjs";
import { Task, TaskImpl } from "../models/task.model";
@Injectable({providedIn: 'root'})
export class DatabaseService{
    // private subscription: Subscription;
    constructor(private http: HttpClient){}

    postData(taskName: string, priority: string, urgency: string){
        const task: Task = {taskName: taskName, priority: priority, urgency: urgency};
        return this.http
        .post(
            'https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
            task
        );
    }
    postDataWithDeadline(taskName: string, priority: string, urgency: string, deadline: Date){
        const task: TaskImpl = new TaskImpl(taskName, priority, urgency, deadline);
        return this.http
        .post(
            'https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
            task
        );
    }
    

    fetchData(){
        return this.http.get<{ [key:string]: Task}>(
            'https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
        )
        .pipe(
            map(response => {
                const tasksArray: Task[] = [];
                for(const key in response){
                    if(response.hasOwnProperty(key)){
                        tasksArray.push({...response[key], id: key});
                    }
                }
                return tasksArray;
            }),
            catchError(error => {
                return throwError(error);
              })
            );
    }

    delete(){
        console.log('delete fired!');
        return this.http
        .delete(
            'https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
        );
        
    }

    deleteById(id: string){
        console.log('delete by id fired!');
        return this.http
        .delete(
            `https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`
        );
        
    }
}