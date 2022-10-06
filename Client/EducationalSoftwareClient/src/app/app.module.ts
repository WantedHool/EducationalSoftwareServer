import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { GradesComponent } from './grades/grades.component';
import { TheoryComponent } from './theory/theory.component';
import { TestsComponent } from './tests/tests.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { NewChapterComponent } from './new-chapter/new-chapter.component';
import { QuestionsComponent } from './questions/questions.component';
import { NewtestComponent } from './newtest/newtest.component';
import { StudentTestComponent } from './student-test/student-test.component';
import {MatRadioModule} from '@angular/material/radio';
import { QuestionanswersComponent } from './questionanswers/questionanswers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    GradesComponent,
    TheoryComponent,
    TestsComponent,
    StudentDetailComponent,
    ChaptersComponent,
    NewChapterComponent,
    QuestionsComponent,
    NewtestComponent,
    StudentTestComponent,
    QuestionanswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
