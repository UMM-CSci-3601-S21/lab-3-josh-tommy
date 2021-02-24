import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { Todos } from './todos';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  providers: []
})
export class TodosListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredTodos: Todos[];
  public filteredTodos: Todos[];

  public todosOwner: string;
  public todosBody: string;
  public todosCategory: string;
  public todosStatus: string;
  public todosLimit: number;
  public viewType: 'card' | 'list' = 'card';

  // Inject the TodoService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.
  constructor(private todosService: TodosService, private snackBar: MatSnackBar) {

  }

  getTodosFromServer() {
    this.todosService.getTodos({
      owner: this.todosOwner,
      body: this.todosBody,
      category: this.todosCategory,
      status: this.todosStatus,
      limit: this.todosLimit,
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      // If there was an error getting the Todos, display
      // a message.
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });
      // I (Nic) feel like we should throw an error here, but
      // I can't figure out how to test that at the moment,
      // so I'm going to leave it out. If someone knows
      // how to make this work that would be great.
      //
      // Now throw an error, which will show up in the browser
      // JavaScript console and allow us to examine the stack
      // trace.
      //
      // throw new Error('Failed to connect to the server: ' + err);
    });
  }
  public updateFilter() {
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { owner: this.todosOwner, body: this.todosBody, category: this.todosCategory });
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
