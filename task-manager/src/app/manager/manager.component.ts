import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../models/task.model';
import { DatabaseService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { on } from 'events';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit, OnDestroy{
  loadedTasks: Task[] = [];
  isFetching = false;
  error = null;
  private subscription: Subscription = new Subscription();
  @ViewChild('taskForm') taskForm!: NgForm;
  constructor(private db: DatabaseService){}

  onSaveTask(task: Task){
    console.log(task.taskName);
    console.log(task.priority);
    console.log(task.urgency);
    this.taskForm.reset();
    this.isFetching = true;
    this.db.postData(task.taskName, task.priority, task.urgency);
    this.isFetching = false;

  }

  ngOnInit(){
    this.isFetching = true;
    this.db.fetchData().subscribe(
      tasks=>{
        this.isFetching=false;
        this.loadedTasks = tasks;
      },
      error =>{
        this.isFetching=false;
        this.error=error.message;
        }
    )
    console.log(this.loadedTasks.values)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFetchData(){
    this.isFetching = true;
    this.db.fetchData().subscribe(
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
