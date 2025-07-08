import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePage } from './home-page/home-page';
import { RouterModule } from '@angular/router';
  
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { //implements OnInit, OnDestroy{
  protected title = 'shopping_app';
/*  private intervalId?: number;

  ngOnInit(): void {
      this.intervalId = window.setInterval(() => {
        this.refresh();
      }, 1000);
  }

  ngOnDestroy(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
  }

  refresh() {
    console.log("Refreshed");
  }*/
}
