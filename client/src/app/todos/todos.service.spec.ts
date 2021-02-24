import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todos } from './todos';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  // A small collection of test todos
  const testTodos: Todos[] = [
    {
      _id: 'chris_id',
      owner: 'chris',
      status: false,
      body: 'happy to help',
      category: 'workout'
    },
    {
      _id: 'pam_id',
      owner: 'pam',
      status: false,
      body: 'here to stay',
      category: 'call'
    },
    {
      _id: 'jamie_id',
      owner: 'jamie',
      status: true,
      body: 'pull that up',
      category: 'podcast'
    }
  ];
  let todosService: TodosService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todosService = new TodosService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('getTodos()', () => {

    it('calls `api/todos` when `getTodos()` is called with no parameters', () => {
      // Assert that the todos we get from this call to getTodos()
      // should be our set of test todos. Because we're subscribing
      // to the result of getTodos(), this won't actually get
      // checked until the mocked HTTP request 'returns' a response.
      // This happens when we call req.flush(testTodos) a few lines
      // down.
      todosService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL.
      const req = httpTestingController.expectOne(todosService.todosUrl);
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request had no query parameters.
      expect(req.request.params.keys().length).toBe(0);
      // Specify the content of the response to that request. This
      // triggers the subscribe above, which leads to that check
      // actually being performed.
      req.flush(testTodos);
    });
    describe('Calling getTodos() with parameters correctly forms the HTTP request', () => {

      it('correctly calls api/todos with filter parameter \'pam\'', () => {
        todosService.getTodos({ owner: 'pam' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the owner parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('owner')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the owner parameter was 'pam'
        expect(req.request.params.get('owner')).toEqual('pam');

        req.flush(testTodos);
      });

      it('correctly calls api/todos with filter parameter \'pull\'', () => {
        todosService.getTodos({ body: 'pull' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the body parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('body')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the body parameter was 'pull'
        expect(req.request.params.get('body')).toEqual('pull');

        req.flush(testTodos);
      });

      it('correctly calls api/todos with filter parameter \'category\'', () => {
        todosService.getTodos({ category: 'podcast' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the category parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('category')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the category parameter was 'podcast'
        expect(req.request.params.get('category')).toEqual('podcast');

        req.flush(testTodos);
      });

      it('correctly calls api/todos with filter parameter \'complete\'', () => {
        todosService.getTodos({ status: 'complete' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the status parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('status')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the status parameter was 'complete'
        expect(req.request.params.get('status')).toEqual('complete');

        req.flush(testTodos);
      });

      it('correctly calls api/todos with filter parameter \'limit\'', () => {

        todosService.getTodos({ limit: 2 }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('limit')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was '2'
        expect(req.request.params.get('limit')).toEqual('2');

        req.flush(testTodos);
      });

      it('correctly calls api/todos with order parameter \'orderBy\'', () => {

        todosService.getTodos({ orderBy: 'owner' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todosUrl) && request.params.has('orderBy')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was 'admin'
        expect(req.request.params.get('orderBy')).toEqual('owner');

        req.flush(testTodos);
      });

  });

  describe('getTodosByID()', () => {
    it('calls api/todos/id with the correct ID', () => {
      // We're just picking a Todos "at random" from our little
      // set of Todos up at the top.
      const targetTodos: Todos = testTodos[1];
      const targetId: string = targetTodos._id;

      todosService.getTodoById(targetId).subscribe(
        // This `expect` doesn't do a _whole_ lot.
        // Since the `targetTodos`
        // is what the mock `HttpClient` returns in the
        // `req.flush(targetTodos)` line below, this
        // really just confirms that `getTodosById()`
        // doesn't in some way modify the todos it
        // gets back from the server.
        todos => expect(todos).toBe(targetTodos)
      );

      const expectedUrl: string = todosService.todosUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(targetTodos);
    });
  });

  describe('filterTodos()', () => {
    /*
     * Since `filterTodos` actually filters "locally" (in
     * Angular instead of on the server), we do want to
     * confirm that everything it returns has the desired
     * properties. Since this doesn't make a call to the server,
     * though, we don't have to use the mock HttpClient and
     * all those complications.
     */
    it('filters by owner', () => {
      const todosName = 'i';
      const filteredTodos = todosService.filterTodos(testTodos, { owner: todosName });
      // There should be two todos with an 'i' in their
      // owner: Chris and Jamie.
      expect(filteredTodos.length).toBe(2);
      // Every returned todos owner should contain an 'i'.
      filteredTodos.forEach(todos => {
        expect(todos.owner.indexOf(todosName)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by body', () => {
      const todosBody = 'happy';
      const filteredTodos = todosService.filterTodos(testTodos, { body: todosBody });
      // There should be just one todos that has happy as their body.
      expect(filteredTodos.length).toBe(1);
      // Every returned todo's body should contain 'happy'.
      filteredTodos.forEach(todos => {
        expect(todos.body.indexOf(todosBody)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by category', () => {
      const todosCategory = 'workout';
      const filteredTodos = todosService.filterTodos(testTodos, { category: todosCategory });
      // There should be just one todos that has workout as their category.
      expect(filteredTodos.length).toBe(1);
      // Every returned todo's category should contain 'workout'.
      filteredTodos.forEach(todos => {
        expect(todos.category.indexOf(todosCategory)).toBeGreaterThanOrEqual(0);
      });
    });
  });
 });
});
