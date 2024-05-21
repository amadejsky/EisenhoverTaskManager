import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../models/task.model';
import { DatabaseService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { on } from 'events';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit, OnDestroy{
  loadedTasks: Task[] = [];
  isFetching = false;
  error = null;
  userEmail = '';
  

  do: number=0;
  schedule: number=0;
  delegate: number=0;
  dont: number=0;

  @ViewChild('taskForm') taskForm!: NgForm;
  constructor(private db: DatabaseService, private authService: AuthService){}

  onSaveTask(task: Task) {
    console.log(task.taskName);
    console.log(task.priority);
    console.log(task.urgency);
    this.taskForm.reset();
    this.isFetching = true;
    
    if (task.deadline) {
        this.db.postDataWithDeadline(task.taskName, task.priority, task.urgency, task.deadline, this.userEmail).subscribe(() => {
            this.db.fetchData(this.userEmail).subscribe(tasks => {
                this.loadedTasks = tasks;
                this.isFetching = false;
            });
        });
    } else {
        this.db.postData(task.taskName, task.priority, task.urgency, this.userEmail).subscribe(() => {
            this.db.fetchData(this.userEmail).subscribe(tasks => {
                this.loadedTasks = tasks;
                this.isFetching = false;
            });
        });
    }
}
  ngOnInit(){
    this.authService.user.subscribe(user=>{
      this.userEmail = user?.email || 'unknown';
    });
    this.isFetching = true;
    this.db.fetchData(this.userEmail).subscribe(
      tasks=>{
        this.isFetching=false;
        this.loadedTasks = tasks;
      },
      error =>{
        this.isFetching=false;
        this.error=error.message;
        }
    )
    console.log(this.loadedTasks.values);
    console.log(this.userEmail+'ng On init of manager');
  }

  ngOnDestroy(): void {}

  onFetchData(){
    this.isFetching = true;
    this.db.fetchData(this.userEmail).subscribe(
      tasks=>{
        this.isFetching=false;
        this.loadedTasks = tasks;
      },
      error =>{
        this.isFetching=false;
        this.error=error.message;
        }
    )
  }
  onDelete(){
    this.db.delete(this.userEmail).subscribe(()=>{
      this.loadedTasks = [];
    });
    
  }

  getBackgroundColor(task: Task): string {
    if (task.priority === 'High' && task.urgency === 'High') {
      return 'green';
    } else if (task.priority === 'High' && task.urgency === 'Low') {
      return 'blue';
    } else if (task.priority === 'Low' && task.urgency === 'High') {
      return 'yellow';
    } else if (task.priority === 'Low' && task.urgency === 'Low') {
      return 'red';
    } else {
      return 'Error!';
    }
  }
}
