import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ProjectType{
  title: string;
  pid:string;
  tasks: string;
}

@Injectable({
  providedIn: 'root',
})

export class SaveTaskService {
  private tasksSubject = new BehaviorSubject<any[]>(this.loadTasks(''));
  private titleSubject = new BehaviorSubject<string>('My Project');
  private selectedProject = new BehaviorSubject<ProjectType | null>(null);
  
  tasks_list = this.tasksSubject.asObservable();
  current_title = this.titleSubject.asObservable();
  selectproject = this.selectedProject.asObservable();

  constructor(private http : HttpClient){}

  public isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public loadTasks(project_id: string): any[] {
    let current: any[] = [];

    if (this.isLocalStorageAvailable()) {
        const dummy_project = JSON.parse(localStorage.getItem('project') || '[]');
        const index = dummy_project.findIndex((temp: any) => temp.id === project_id);

        if (index !== -1) {
            const task_current = dummy_project[index].task || [];
            current = [...task_current];
        }
    }

    // this.http.get<any[]>(`http://localhost:9000/api/getTasks/${project_id}`).subscribe(
    //   (res) => {
    //     current = res;
    //   }
    // );
    return current;
  }

  addTask(task: any) {
    let p_id: string = '';
    this.selectproject.subscribe((project) => { if (project) p_id = project.pid });
  
    const currentTasks = this.loadTasks(p_id);
    currentTasks.push(task);

    if (this.isLocalStorageAvailable()) {
        let dummy_project = JSON.parse(localStorage.getItem('project') || '[]');
        const index = dummy_project.findIndex((project: any) => project.id === p_id);

        if (index !== -1) {
            dummy_project[index].task = [...currentTasks];
            localStorage.setItem('project', JSON.stringify(dummy_project));
        }
    }

    this.tasksSubject.next(currentTasks);
  }


  update(task: any) {
    var p_id: string = '';
    this.selectproject.subscribe((project) => {if(project) p_id = project.pid});

    var tasks = this.loadTasks(p_id);
    const task_index = tasks.findIndex((t:any) => t.id === task.id);
    
    if(task_index !== -1)
    {
      tasks[task_index] = {...tasks[task_index] , ...task};
      if(this.isLocalStorageAvailable())
      {
        let dummy_project = JSON.parse(localStorage.getItem('project') || '[]');
        const project_index = dummy_project.findIndex((project:any) => project.id === p_id);
        if(project_index !== -1)
        {
          dummy_project[project_index].task = tasks;
          localStorage.setItem('project' , JSON.stringify(dummy_project));
        }
      }
    }
    this.tasksSubject.next(tasks);
  }

  updatetitle(title: any){
    title = title.toUpperCase();
    this.titleSubject.next(title);
  }


  setSelectedProject(project: ProjectType): void {
    this.selectedProject.next(project);
    const task = this.loadTasks(project.pid);
    this.tasksSubject.next(task);
  }
}
