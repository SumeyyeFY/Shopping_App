import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePage } from './home-page/home-page';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
  
export let browserRefreshed = false;

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy{ //implements OnInit, OnDestroy{
  protected title = 'shopping_app';
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe(
      (event) => {
        if(event instanceof NavigationStart){
          browserRefreshed != router.navigated;
        }
      });

    if(browserRefreshed)
      this.router.navigate(['']);
  }

  ngOnDestroy(): void {
      if(this.subscription)
        this.subscription.unsubscribe();
  }
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
