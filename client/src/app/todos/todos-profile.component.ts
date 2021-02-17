import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todos } from './todos';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos-profile',
  templateUrl: './todos-profile.component.html',
  styleUrls: ['./todos-profile.component.scss']
})
export class TodosProfileComponent implements OnInit {
  todo: Todos;
  id: string;

  constructor(private route: ActivatedRoute, private todoService: TodosService) { }

  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested todo.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.todoService.getTodoById(this.id).subscribe(user => this.todo = user);
    });
  }



}
