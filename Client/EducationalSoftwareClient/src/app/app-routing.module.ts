import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register/Student', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home/Teacher', component: HomeComponent},
  { path: 'home/Teacher/grades', component: HomeComponent},
  { path: 'home/Teacher/tests', component: HomeComponent},
  { path: 'home/Teacher/theory', component: HomeComponent},
  { path: 'home/Student', component: HomeComponent},
  { path: 'home/Student/Grades', component: HomeComponent},
  { path: 'home/Student/Tests', component: HomeComponent},
  { path: 'home/Student/Theory', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
