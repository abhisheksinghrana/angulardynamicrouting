import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
  @Input('parent') parent: FormGroup;
  @Input() controlName: string;
  @Input() controlDisabled: boolean;

  constructor() {}

  ngOnInit() {}
}
