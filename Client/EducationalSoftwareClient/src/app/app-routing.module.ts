import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaptersComponent } from './chapters/chapters.component';
import { GradesComponent } from './grades/grades.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewChapterComponent } from './new-chapter/new-chapter.component';
import { RegisterComponent } from './register/register.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { TestsComponent } from './tests/tests.component';
import { TheoryComponent } from './theory/theory.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register/Student', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home/Teacher', component: HomeComponent},
  { path: 'home/Teacher/grades', component: GradesComponent},
  { path: 'home/Teacher/tests', component: TestsComponent},
  { path: 'home/Teacher/theory', component: ChaptersComponent},
  { path: 'home/Student', component: HomeComponent},
  { path: 'home/Student/Grades', component: GradesComponent},
  { path: 'home/Student/GradeDetail', component: StudentDetailComponent},
  { path: 'home/Student/Tests', component: TestsComponent},
  { path: 'home/Student/Theory', component: ChaptersComponent},
  { path: 'home/Teacher/Theory/CreateNew', component: NewChapterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
