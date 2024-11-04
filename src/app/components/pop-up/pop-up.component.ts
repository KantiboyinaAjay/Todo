import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SaveTaskService } from '../../save-task-service';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnInit {
  operation(taskForm: NgForm) {
    this.operationButtonText == 'Save'
      ? this.update(taskForm)
      : this.save(taskForm);
  }
  constructor(
    private dialog: MatDialog,
    private taskService: SaveTaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  operationButtonText: string = '';

  ngOnInit(): void {
    this.operationButtonText = this.data.operation == 'Save' ? 'Save' : 'Add';
  }
  popUpHeading = this.data.heading;

  taskData = {
    taskName: this.data.taskName != null ? this.data.taskName : '',
    startDate: this.data.startDate != null ? this.data.startDate : '',
    endDate: this.data.deadlineDate != null ? this.data.deadlineDate : '',
    status: this.data.type,
  };

  async update(taskForm: any) {
    const isValid = taskForm.valid;
    // console.log(isValid);

    if (isValid) {
      const taskData = {
        taskName: this.taskData.taskName,
        startDate: this.taskData.startDate,
        deadlineDate: this.taskData.endDate,
        status: this.taskData.status,
        id: this.data.id,
      };
      this.taskService.update(taskData);
      this.dialog.closeAll();
    }
  }

  async save(taskForm: any) {
    const isValid = taskForm.valid;

    if (isValid) {
      const taskData = {
        taskName: this.taskData.taskName,
        startDate: this.taskData.startDate,
        deadlineDate: this.taskData.endDate,
        status: this.taskData.status,
        id: nanoid(),
      };

      this.taskService.addTask(taskData);
      this.resetTaskData();
    } 
    else {
      alert(`Data is invalid. Please check your input.`);
    }

    this.dialog.closeAll();
  }

  close() {
    this.dialog.closeAll();
  }
  
  private resetTaskData() {
    this.taskData = {
      taskName: '',
      startDate: '',
      endDate: '',
      status: this.data.type,
    };
  }
}
