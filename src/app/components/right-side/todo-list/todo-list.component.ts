import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../../pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SaveTaskService } from '../../../save-task-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

export class TodoListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private SaveTaskService: SaveTaskService
  ) {}

  openDialog(
    status: string,
    heading:string,
    operationType?:string,
    taskName?: string,
    startDate?: string,
    deadlineDate?: string,
    id?:string
  ) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '670px',
      height: '395px',
      disableClose: false,
      hasBackdrop: true,
      data: {
        type: status,
        taskName: taskName == null ? '' : taskName,
        startDate: startDate == null ? '' : startDate,
        deadlineDate: deadlineDate == null ? '' : deadlineDate,
        heading: heading,
        operation:operationType,
        id: id,
      },
    });
  }

  tasks: any[] = [];
  todo: any[] = [];
  inProgress: any[] = [];
  inReview: any[] = [];
  completed: any[] = [];

  ngOnInit() {
    this.SaveTaskService.tasks_list.subscribe((tasks) => {
      this.tasks = tasks;
      
      // console.log(tasks);

      this.todo = tasks.filter((task) => task.status === 'ToDo');
      this.inProgress = tasks.filter((task) => task.status === 'In Progress');
      this.inReview = tasks.filter((task) => task.status === 'In Review');
      this.completed = tasks.filter((task) => task.status === 'Completed');
    });
  }
}
