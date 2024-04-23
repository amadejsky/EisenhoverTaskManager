import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task } from '../models/task.model';
import { DatabaseService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit, OnDestroy{
  loadedTasks = [];
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

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
