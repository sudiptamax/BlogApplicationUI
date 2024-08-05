import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import { Blog } from '../models/blog.model';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch blogs', () => {
    const dummyBlogs: Blog[] = [
      { id: '1', username: 'User1', text: 'Text1', dateCreated: new Date() },
      { id: '2', username: 'User2', text: 'Text2', dateCreated: new Date() },
    ];

    service.getBlogs().subscribe(blogs => {
      expect(blogs.length).toBe(2);
      expect(blogs).toEqual(dummyBlogs);
    });

    const req = httpMock.expectOne('https://localhost:7293/api/Blog');
    expect(req.request.method).toBe('GET');
    req.flush(dummyBlogs);
  });
});
