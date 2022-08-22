import { Component } from '@angular/core';
import { Post } from './models/post';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private test:TestService){
        // console.table(test.samp())
  }
  posts:Post[]=[]
  
  addPost(){
    const post=new Post()   
    post.author ='katy'
    post.title ='samp'
    this.test.addPost(post).subscribe(post => this.posts.push(post));
  }
  ngOnInit():void {
    this.test.getposts().subscribe(data => {
    this.posts = data
    console.log(data)
    })
  }
}
