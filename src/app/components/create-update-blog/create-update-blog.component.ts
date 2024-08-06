import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-blog',
  templateUrl: './create-update-blog.component.html',
  styleUrls: ['./create-update-blog.component.css']
})
export class CreateUpdateBlogComponent implements OnInit, AfterViewInit {
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  blogForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.blogForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      text: ['', Validators.required],
      dateCreated: [new Date()]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.blogService.getBlogById(id).subscribe(blog => {
        this.blogForm.patchValue(blog);
      });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isEdit) {
      this.renderer.selectRootElement(this.usernameInput.nativeElement).focus();
    }
  }

  saveBlog(): void {
    if (this.blogForm.valid) {
      const blogData: Blog = this.blogForm.value;
      if (this.isEdit) {
        this.blogService.updateBlog(blogData.id, blogData).subscribe(
          () => this.router.navigate(['/list']),
          error => console.error('Error updating blog:', error)
        );
      } else {
        this.blogService.createBlog(blogData).subscribe(
          () => this.router.navigate(['/list']),
          error => console.error('Error creating blog:', error)
        );
      }
    }
  }
}

