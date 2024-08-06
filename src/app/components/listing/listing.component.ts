import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  blogs: Blog[] = [];
  search: string = '';
  sortBy: string = 'username';
  sortDirection: string = 'asc';
  page: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs(this.search, this.sortBy, this.sortDirection, this.page, this.pageSize)
      .subscribe(response => {
        this.blogs = response.items;
        this.totalRecords = response.totalRecords;
      });
  }

  onSortChange(): void {
    this.loadBlogs();
  }

  onPageChange(newPage: number): void {
    if (newPage > 0 && newPage <= Math.ceil(this.totalRecords / this.pageSize)) {
      this.page = newPage;
      this.loadBlogs();
    }
  }

  onSearchChange(searchTerm: string): void {
    this.search = searchTerm;
    this.loadBlogs();
  }

  resetSearch(): void {
    this.search = '';
    this.loadBlogs();
  }

  viewBlogDetail(id: string): void {
    this.router.navigate(['/blog', id]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/create-update']);
  }

  editBlog(id: string): void {
    this.router.navigate(['/create-update', id]);
  }

  deleteBlog(id: string): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      this.loadBlogs();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }


}
