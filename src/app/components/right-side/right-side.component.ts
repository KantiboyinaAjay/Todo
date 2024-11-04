import { SaveTaskService } from '../../save-task-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['./right-side.component.css'],
})
export class RightSideComponent implements OnInit {
  title: any = 'My Project';
  constructor(private changedtitle: SaveTaskService){}

    ngOnInit(): void {
      this.changedtitle.current_title.subscribe((title)=>{this.title = title});
    }
}
