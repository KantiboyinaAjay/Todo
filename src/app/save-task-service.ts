import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ProjectType {
  title: string;
  pid: string;
  tasks: string;
}

@Injectable({
  providedIn: 'root',
})
export class SaveTaskService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  private titleSubject = new BehaviorSubject<string>('My Project');
  private selectedProject = new BehaviorSubject<ProjectType | null>(null);

  tasks_list = this.tasksSubject.asObservable();
  current_title = this.titleSubject.asObservable();
  selectproject = this.selectedProject.asObservable();

  constructor(private http: HttpClient) {}

  public loadTasks(project_id: string): void {
    this.http.get<any[]>(`https://task-backend-kerz.onrender.com/getTasks/${project_id}`).subscribe(
      (res) => {
        console.log(res);
        this.tasksSubject.next(res);
      },
      (error) => {
        console.error("Failed to load tasks:", error);
      }
    );
  }

  addTask(task: any) {
    this.selectproject.subscribe((project) => {
      if (project) {
        task.pid = project.pid;
        this.http.post('https://task-backend-kerz.onrender.com/addTask', task).subscribe(
          (res) => {
            this.loadTasks(project.pid);
          },
          (error) => {
            console.error("Failed to add task:", error);
          }
        );
      }
    });
  }

  update(task: any) {

    this.selectproject.subscribe((project) => {
      if (project) {
        console.log(task);
        this.http.put(`https://task-backend-kerz.onrender.com/updateTask`, task).subscribe(
          (res) => {
            this.loadTasks(project.pid);
          },
          (error) => {
            console.error("Failed to update task:", error);
          }
        );
      }
    });
  }

  updatetitle(title: string) {
    this.titleSubject.next(title.toUpperCase());
  }

  setSelectedProject(project: ProjectType): void {
    this.selectedProject.next(project);
    this.loadTasks(project.pid);
  }
}
