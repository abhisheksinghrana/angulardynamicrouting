import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-bar',
  templateUrl: './confirmation-bar.component.html',
  styleUrls: ['./confirmation-bar.component.scss']
})
export class ConfirmationBarComponent implements OnInit {
  @Input() title: string;
  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  accept(): void {
    this.response.emit(true);
  }

  cancel(): void {
    this.response.emit(false);
  }
}
