import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Subscription, throwError } from "rxjs";
import { Task, TaskImpl } from "../models/task.model";

@Injectable({providedIn: 'root'})
export class DatabaseService{
    // private subscription: Subscription;
    constructor(private http: HttpClient){}
    encodeEmail(email: string): string {
        return email.replace(/[.@]/g, '').toLowerCase();
    }
    
      

      postData(taskName: string, priority: string, urgency: string, userEmail: string) {
        const encodedEmail = this.encodeEmail(userEmail);
        const task: Task = { taskName: taskName, priority: priority, urgency: urgency };
        return this.http.post(
          `https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/${encodedEmail}.json`,
          task
        );
      }
    
      postDataWithDeadline(taskName: string, priority: string, urgency: string, deadline: Date, userEmail: string) {
        const encodedEmail = this.encodeEmail(userEmail);
        const task: TaskImpl = new TaskImpl(taskName, priority, urgency, deadline);
        return this.http.post(
          `https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/${encodedEmail}.json`,
          task
        );
      }
    
      fetchData(userEmail: string) {
        const encodedEmail = this.encodeEmail(userEmail);
        return this.http.get<{ [key: string]: Task }>(
          `https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/${encodedEmail}.json`
        )
        .pipe(
          map(response => {
            const tasksArray: Task[] = [];
            for (const key in response) {
              if (response.hasOwnProperty(key)) {
                tasksArray.push({ ...response[key], id: key });
              }
            }
            return tasksArray;
          }),
          catchError(error => {
            return throwError(error);
          })
        );
      }
    
      delete(userEmail: string) {
        const encodedEmail = this.encodeEmail(userEmail);
        console.log('delete fired!');
        return this.http.delete(
          `https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/${encodedEmail}.json`
        );
      }
    
      deleteById(id: string, userEmail: string) {
        const encodedEmail = this.encodeEmail(userEmail);
        console.log('delete by id fired!');
        return this.http.delete(
          `https://task-manager-app-e92fd-default-rtdb.europe-west1.firebasedatabase.app/${encodedEmail}/${id}.json`
        );
      }
    }
