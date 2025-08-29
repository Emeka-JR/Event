import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  http: HttpClient = inject(HttpClient)
  allTasks: Task[]=[];

  ngOnInit() {
    this.fetchAllTasks();
  }


  private fetchAllTasks() {
    this.http.get<{ [key: string]: Task }>('https://event-cd8f1-default-rtdb.firebaseio.com/tasks.json')
      .pipe(map((response) => {
        //Transform Data
        let tasks = [];

        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            tasks.push({ ...response[key], id: key })
          }
        }

        return tasks;


      }))
      .subscribe((tasks) => {
        this.allTasks=tasks;
      })
  }

}
