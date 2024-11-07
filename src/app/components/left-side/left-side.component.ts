import { Component, OnInit } from '@angular/core';
import { SaveTaskService } from '../../save-task-service';
import { nanoid } from 'nanoid';
import Toastify from 'toastify-js';

interface ProjectType {
  id: string;
  projecttitle: string;
  task: any[];
}

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css'],
})
export class LeftSideComponent implements OnInit {
  
  project: ProjectType[] = [];
  showinput: boolean = false;
  inputvalue: string = '';

  constructor(private savelocal: SaveTaskService) {}
  ngOnInit(): void {
    if (this.savelocal.isLocalStorageAvailable()) {
      const saved_projects = localStorage.getItem('project');
      if (saved_projects) {
        this.project = JSON.parse(saved_projects);
      }
    }
  }

  store_title(project: ProjectType): void {
    this.savelocal.updatetitle(project.projecttitle);
    this.savelocal.setSelectedProject(project);
  }

  toggleinput() {
    this.showinput = !this.showinput;
  }

  saveinput() {
    if (this.inputvalue.trim()) {
      const new_project: ProjectType = {
        id: nanoid(),
        projecttitle: this.inputvalue.trim(),
        task: [],
      };
      this.project.push(new_project);
      this.inputvalue = '';
      this.showinput = false;
      if (this.savelocal.isLocalStorageAvailable())
        localStorage.setItem('project', JSON.stringify(this.project));

      Toastify({
        text: "✅ Project Created.",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
          background: "rgb(235, 252, 236)",
          color: "black"
        }
      }).showToast();
    }
  }

  delete(i: number): void {
    this.project.splice(i, 1);
    if (this.savelocal.isLocalStorageAvailable())
      localStorage.setItem('project', JSON.stringify(this.project));

    Toastify({
      text: "✅ Project Deleted Successfully.",
      duration: 5000,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        background: "rgb(235, 252, 236)",
        color: "black"
      }
    }).showToast();
  }
}
