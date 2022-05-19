import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class TestService {
    URL ="http://localhost:3000/posts"
    URLStudent ="http://localhost:3000/students"
  constructor(private http:HttpClient){}
  samp():string[] {
      return ["samp",'aaa']
  }

  getposts():Observable <Post[]> {
    return this.http.get<Post[]>(this.URL);
  }

  getpost(id:number):Observable <Post> {
    return this.http.get<Post>(this.URL + "/" + id);
  }

  delpost(id:number):Observable <Post> {
    return this.http.delete<Post>(this.URL + "/" + id);
  }
   /** POST: add a new post to the database */
addPost(post: Post): Observable<Post> {
    console.log('test - ser')
    return this.http.post<Post>(this.URL, post)
  }
}
