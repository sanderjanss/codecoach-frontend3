import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HomeComponent} from "../components/home/home.component";
import { LoginComponent } from '../components/login/login.component';
import { CoachGalleryComponent } from '../components/coachees/overview/coachee-gallery/coach-gallery.component';
import { CoacheeDetailsEditComponent } from '../components/coachees/specific/coachee-details-edit/coachee-details-edit.component';
import { SpecificCoacheeComponent } from '../components/coachees/specific/coachee-specific/specific-coachee.component';
import {RequestCoachComponent} from "../components/coach/request-coach/request-coach.component";
import {AboutComponent} from "../components/about/about.component";
import {ContactComponent} from "../components/contact/contact.component";
import { AddSessionComponent } from '../components/sessions/add-session/add-session.component';
import { SessionOverviewComponent } from '../components/sessions/session-overview/session-overview.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'coaches', component: CoachGalleryComponent},
  {path: 'coachees/:id', component: SpecificCoacheeComponent},
  {path: 'coachees/:id/edit', component: CoacheeDetailsEditComponent},
  {path: 'coachrequest/:id', component: RequestCoachComponent},
  {path: 'sessions', component: SessionOverviewComponent },
  {path: 'sessions/:id', component: AddSessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
