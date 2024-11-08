import { Component, OnInit } from '@angular/core';
import { SaveTaskService } from '../../save-task-service';
import { nanoid } from 'nanoid';
import Toastify from 'toastify-js';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ProjectType {
  title: string;
  pid:string;
  tasks: string;
}

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css'],
})
export class LeftSideComponent implements OnInit {
  
  project: any[] = [];
  showinput: boolean = false;
  inputvalue: string = '';

  constructor(private savelocal: SaveTaskService , private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:9000/getProjects').subscribe(
      (res) => {
        this.project = res;
      }
    );
  }

  saveinput() {
    if (this.inputvalue.trim()) {
      const data_project = {
        title: this.inputvalue.trim(),
        pid: nanoid(),
        tasks:""
      }
      this.http.post('http://localhost:9000/addProject' , data_project).subscribe(
        (response) => {
          this.project.push(data_project);
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
      );
      this.inputvalue = '';
      this.showinput = false;
    }
  }

  delete(i: string): void {
    this.http.delete(`http://localhost:9000/deleteProject/${i}`).subscribe(
      (res) => {
        this.project = this.project.filter((pro) => pro.pid !== i);
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
    );
  }
  
  store_title(project: ProjectType): void {
    this.savelocal.updatetitle(project.title);
    this.savelocal.setSelectedProject(project);
  }

  toggleinput() {
    this.showinput = !this.showinput;
  }
}
