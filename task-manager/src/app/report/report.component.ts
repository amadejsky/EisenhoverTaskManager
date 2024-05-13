import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../models/task.model';
import { DatabaseService } from '../services/db.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  loadedTasks: Task[] = [];
  isFetching = false;
  error = null;
  

  do: number=0;
  schedule: number=0;
  delegate: number=0;
  dont: number=0;

  @ViewChild('taskForm') taskForm!: NgForm;
  constructor(private db: DatabaseService){}

  ngOnInit(){
    this.isFetching = true;
    this.db.fetchData().subscribe(
      tasks=>{
        this.isFetching=false;
        this.loadedTasks = tasks;
        this.onAnalyze();
      },
      error =>{
        this.isFetching=false;
        this.error=error.message;
        }
    )
    console.log(this.loadedTasks.values)

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
  onDelete(){
    this.db.delete().subscribe(()=>{
      this.loadedTasks = [];
      this.onAnalyze();
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

  onAnalyze(){
    this.do = 0, this.schedule = 0, this.delegate = 0, this.dont = 0;
    this.loadedTasks.map(task=>{
      if(task.priority === 'High' && task.urgency === 'High'){
        this.do++;
      }else if(task.priority ==='High' && task.urgency ==='Low'){
        this.schedule++;
      }else if(task.priority ==='Low' && task.urgency === 'High'){
        this.delegate++;
      }else{
        this.dont++;
      }

    })
  }

  onClick(task: Task) {
    console.log(task);
    console.log('Selected Task id is: ' + task.id);
    if (task.id) {
      this.db.deleteById(task.id).subscribe(() => {
        this.db.fetchData().subscribe(tasks => {
          this.loadedTasks = tasks;
          this.onAnalyze();
        });
      });
    } else {
      console.log('Error occurred! ID not identified correctly');
    }
  }
  tomorrowDeadline(){
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    return this.loadedTasks.filter(task=>{
      if(!task.deadline) return false;

      const taskDeadline = new Date(task.deadline);
      return taskDeadline.getFullYear() === tomorrow.getFullYear() &&
      taskDeadline.getMonth() === tomorrow.getMonth() &&
      taskDeadline.getDate() === tomorrow.getDate();
    })
  }

}
