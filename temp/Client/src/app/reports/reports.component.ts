import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  menuList: any[];

  constructor() {
    this.menuList = [
      {
        name: 'User/Level hours overview',
        route: '/reports/userhoursoverview'
      }
    ];
  }

  ngOnInit() {}
}
