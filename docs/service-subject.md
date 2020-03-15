# Servicio con notificaciones

Este patrón aprovecha la tecnología reactiva (RxJs).

Los componentes no piden los datos, sino que piden un observable de los datos y se suscriben a él.

```ts
getUsers$: Observable<User[]> {
  return this.users$.asObservable();
}
```

El servicio se encargará de notificar a los componentes suscritos cada vez que haya algún cambio en los datos.

```ts
  add(user: User): void {
    this.http.post<User>(this.url_api, user).subscribe(
      user => {
        this.users.push(user);
        this.users$.next(this.users);
      }
    );
  }
```

Como se puede observar, el método add ya no hace un return de un observable como en los otros patrones, sino que hace un next() del Subject.

```ts
@Injectable({
  providedIn: "root"
})
export class UserService {
  url_api: string = environment.api_url + "users";

  private users: User[] = [];
  private selectedUser: User;
  private message: string;
  private lastIndex = 10;

  private users$: Subject<User[] | null> = new Subject();
  private selectedUser$: Subject<User | null> = new Subject();
  private message$: Subject<string> = new Subject();
  private lastIndex$: Subject<number> = new Subject();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(this.url_api);
    if (this.games) {
      return of(this.games);
    }
    return this.http.get<User[]>(this.url_api);
    .pipe(
      tap( data => this.users = data ),
      tap( data => this.users$.next(data) ),
    );
  }

  getUsers$: Observable<User[]> {
    return this.users$.asObservable();
  }

  getFiltered(filter = ""): Observable<User[]> {
    return this.http.get<User[]>(this.url_api + "?" + filter);
  }

  get(id): Observable<User> {
    return this.http.get<User>(this.url_api + "/" + id);
  }

  add(user: User): void {
    this.http.post<User>(this.url_api, user).subscribe(
      user => {
        this.users.push(user);
        this.users$.next(this.users);
      }
    );
  }

  edit(user: User): Observable<User> {
    return this.http.put<User>(this.url_api + "/" + user.id, user);
  }

  delete(user: User): Observable<any> {
    return this.http.delete(this.url_api + "/" + user.id);
  }
}
```
