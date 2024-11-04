import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Toastify from 'toastify-js';

interface ProjectType{
  id:string;
  projecttitle: string;
  task: any[];
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
    return current;
  }

  addTask(task: any) {
    let p_id: string = '';
    this.selectproject.subscribe((project) => { if (project) p_id = project.id });
    
    if(p_id === '')
    {
      Toastify({
        text: "⚠️Select or create a project before adding a task⚠️",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "dark",
      }).showToast();
    }
    else
    {
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
  }


  update(task: any) {
    var p_id: string = '';
    this.selectproject.subscribe((project) => {if(project) p_id = project.id});

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
    const task = this.loadTasks(project.id);
    this.tasksSubject.next(task);
  }
}
