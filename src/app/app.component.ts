import { Component, OnInit } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from "@angular/router";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public pageLoading = true;
  public items: MenuItem[];

  constructor(private router: Router) {}

  public ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.pageLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.pageLoading = false;
      }
    });

    this.items = [
      { label: "input-rest-auto-complete", routerLink: "input-rest-auto-complete" },
      { label: "data-list-rest", routerLink: "data-list-rest" },
      { label: "input-date", routerLink: "input-date" },
      { label: "list-rest", routerLink: "list-rest" },
      { label: "toast", routerLink: "toast" },
      { label: "loading", routerLink: "loading" },
      { label: "pagination", routerLink: "pagination" },
    ];


  }
}
