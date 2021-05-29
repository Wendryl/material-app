import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent implements OnInit {

  @Input()
  loading = false;

  @Input()
  label = '';

  constructor() { }

  ngOnInit(): void {
  }

}
