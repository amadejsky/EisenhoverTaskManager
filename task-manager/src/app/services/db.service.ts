import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { Task } from "../models/task.model";
@Injectable({providedIn: 'root'})
export class DatabaseService{
    // private subscription: Subscription;
    constructor(private http: HttpClient){}

    postData(taskName: string, priority: string, urgency: string){
        const task: Task = {taskName: taskName, priority: priority, urgency: urgency};
        this.http
        .post(
            'https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
            task
        ).subscribe(response =>{
            console.log('Succesfuly posted data: '+response)
        });
    }

    fetchData(){

    }
}