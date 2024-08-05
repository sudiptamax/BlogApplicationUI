import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListingComponent } from './components/listing/listing.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { CreateUpdateBlogComponent } from './components/create-update-blog/create-update-blog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListingComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'create-update', component: CreateUpdateBlogComponent },
  { path: 'create-update/:id', component: CreateUpdateBlogComponent }, // This is important

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
