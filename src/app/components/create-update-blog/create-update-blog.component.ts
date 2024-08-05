import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';



@Component({
  selector: 'app-create-update-blog',
  templateUrl: './create-update-blog.component.html',
  styleUrls: ['./create-update-blog.component.css']
})
export class CreateUpdateBlogComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  blog: Blog = { id: '', username: '', text: '', dateCreated: new Date() };
  isEdit: boolean = false;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.blogService.getBlogById(id).subscribe(blog => {
        this.blog = blog;
      });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isEdit) {
      this.renderer.selectRootElement(this.usernameInput.nativeElement).focus();
    }
  }

saveBlog(): void {
  if (this.isEdit) {
    this.blogService.updateBlog(this.blog.id, this.blog).subscribe(
      () => this.router.navigate(['/list']),
      error => console.error('Error updating blog:', error)
    );
  } else {
    this.blogService.createBlog(this.blog).subscribe(
      () => this.router.navigate(['/list']),
      error => console.error('Error creating blog:', error)
    );
  }
}
}