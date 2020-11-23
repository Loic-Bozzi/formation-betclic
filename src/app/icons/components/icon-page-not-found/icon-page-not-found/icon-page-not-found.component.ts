import { Component, OnInit } from '@angular/core';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-page-not-found',
  templateUrl: './icon-page-not-found.component.html',
  styleUrls: ['./icon-page-not-found.component.scss']
})
export class IconPageNotFoundComponent implements OnInit {

  public myIcon = faBrain;

  constructor() { }

  ngOnInit(): void {
  }

}
