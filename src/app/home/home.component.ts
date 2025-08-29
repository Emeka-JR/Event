import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../Model/Task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }
    // Handle form submission here
  }


  data: any[] = [];

  //1.Create an Observable
  myObservable = new Observable((observer) => {
    setTimeout(() => { observer.next('Brain Jotter performing on the 8th of June') }, 1000);
    setTimeout(() => { observer.next('Bloody Civilian album launch party June 14th') }, 2000);
    setTimeout(() => { observer.next('Liverpool announcement and presentation of Arne Slot') }, 3000);
    // setTimeout(() => { observer.error(new Error('Something went wrong.Please try again later!')) }, 3000);
    setTimeout(() => { observer.next('Kylian Mbappe presentation at the Bernabeu on July 14th') }, 4000);
    setTimeout(() => { observer.next('Hala Madrid and YNWA') }, 5000);
    setTimeout(() => { observer.complete() }, 6000);
  });

  GetEvents() {

    //Observer
    //next,error,complete
    this.myObservable.subscribe((val: any) => {
      this.data.push(val);
    },
      (err) => {
        alert(err.message)
      },
    ()=>{
      alert('All the data is streamed!')
    });
  }

  http:HttpClient=inject(HttpClient);

  Createtask(data:Task){
    this.http.post('https://event-cd8f1-default-rtdb.firebaseio.com/tasks.json',data)
    .subscribe((response)=>{
      console.log(response);
    });
  }

}



