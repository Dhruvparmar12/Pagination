import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  totalPages = [];
  firstindex = 1;
  currentIndex = 1;
  lastindex;
  data;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/user/pages').subscribe(data => {
      if (data) {
        this.lastindex = data['totalPages'];
        if (data['totalPages'] >= 3) {
          for (let i = 1; i <= 3; i++) {
            this.totalPages.push(i);
          }
        } else {
          for (let i = 1; i <= data['totalPages']; i++) {
            this.totalPages.push(i);
          }
        }
      }
    })


    this.http.get(`http://localhost:3000/user/pageExpenses/1`).subscribe(data => {
      if (data) {
        this.data = data;
      }
    })
  }

  onClick(id) {

    this.http.get(`http://localhost:3000/user/pageExpenses/${id}`).subscribe(data => {
      if (data) {
        this.data = data;
        this.currentIndex = id;
      }
    })
  }

  onNext() {
    if (this.currentIndex >= this.lastindex) {
      this.currentIndex = this.lastindex;
      alert('No More Data Founds.!');

    } else {
      this.currentIndex += 1;
      if (this.currentIndex > 3) {
        this.totalPages.push(this.currentIndex)
        this.totalPages.shift();
      }

    }
    this.http.get(`http://localhost:3000/user/pageExpenses/${this.currentIndex}`).subscribe(data => {
      if (data) {
        this.data = data;
      }
    })
  }

  onPrevious() {
    if (this.currentIndex <= this.firstindex) {
      this.currentIndex = this.firstindex;
      alert('You are on 1st Index');

    } else {
      this.currentIndex -= 1;
      if (this.currentIndex < 3) {
        this.totalPages.unshift(this.currentIndex)
        this.totalPages.pop();
      }

    }
    this.http.get(`http://localhost:3000/user/pageExpenses/${this.currentIndex}`).subscribe(data => {
      if (data) {
        this.data = data;
      }
    })
  }
}
