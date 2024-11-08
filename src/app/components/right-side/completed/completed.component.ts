import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../../pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { SaveTaskService } from '../../../save-task-service';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})

export class CompletedComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private SaveTaskService: SaveTaskService
  ) {}

  open_dialog_or_not() {
    if (!this.p_id) {
      Toastify({
        text: "⚠️ Select or create a project before adding a task",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        style:{
          background: "rgb(252, 235, 235)",
          color: "black"
        }
      }).showToast();
    } 
    else {
      this.openDialog('Completed', 'Add New Task');
    }
  }  

  openDialog(
    status: string,
    heading:string,
    operationType?:string,
    taskName?: string,
    startDate?: string,
    deadlineDate?: string,
    taskId?:string,
  ) {
      this.dialog.open(PopUpComponent, {
      width: '670px',
      height: '395px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        type: status,
        taskName: taskName || '',
        startDate: startDate || '',
        deadlineDate: deadlineDate || '',
        taskId: taskId || '',
        heading: heading,
        operation:operationType,
        pid: this.p_id
      },
    });
  }

  tasks: any[] = [];
  todo: any[] = [];
  inProgress: any[] = [];
  inReview: any[] = [];
  completed: any[] = [];
  p_id:string = '';

  ngOnInit() {
    this.SaveTaskService.tasks_list.subscribe((tasks) => {
      this.tasks = tasks;

      this.todo = tasks.filter((task) => task.status === 'Todo');
      this.inProgress = tasks.filter((task) => task.status === 'In Review');
      this.inReview = tasks.filter((task) => task.status === 'In Progress');
      this.completed = tasks.filter((task) => task.status === 'Completed');
    });

    this.SaveTaskService.selectproject.subscribe((project:any) => {if(project) this.p_id = project.pid});
  }
}
