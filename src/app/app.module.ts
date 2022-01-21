// MODULES
//   ANGULAR
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpParamsOptions } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
//   CUSTOM
import { LayoutModule } from './modules/layout.module';
import { MaterialModule } from './modules/material.module';
// COMPONENTS
//   ANGULAR
import { AppComponent } from './app.component';
//   LOGIN & REGISTER
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
//   HOME
import { HomeComponent } from './components/home/home.component';
//   COACHEES
import { CoacheeCardComponent } from './components/coachees/overview/coachee-card/coachee-card.component';
import { CoachGalleryComponent } from './components/coachees/overview/coachee-gallery/coach-gallery.component';
import { SpecificCoacheeComponent } from './components/coachees/specific/coachee-specific/specific-coachee.component';
import { CoacheeDetailsEditComponent } from './components/coachees/specific/coachee-details-edit/coachee-details-edit.component';
import { RequestCoachComponent } from './components/coach/request-coach/request-coach.component';

//   COACHES
import { CoachDetailsComponent } from './components/coach/coach-details/coach-details.component';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthenticationInterceptor } from './services/authentication/authenticationInterceptor';
import {
  CoacheeFeedbackDialog, CoachFeedbackDialog, MyCoacheeFeedbackDialog, MyCoachFeedbackDialog,
  SessionOverviewComponent
} from './components/sessions/session-overview/session-overview.component';
import { AddSessionComponent } from './components/sessions/add-session/add-session.component';
import { SessionCardComponent } from './components/sessions/session-overview/session-card/session-card.component';
// SERVICES
//   3RD PARTY
import { ParallaxDirective } from 'src/app/directives/parallax.directive';
import {InterceptorService} from "./loader/interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CoachGalleryComponent,
    CoacheeCardComponent,
    SpecificCoacheeComponent,
    CoachDetailsComponent,
    RequestCoachComponent,
    ParallaxDirective,
    CoacheeDetailsEditComponent,
    AboutComponent,
    ContactComponent,
    SessionOverviewComponent,
    AddSessionComponent,
    SessionCardComponent,


    CoacheeFeedbackDialog,
    CoachFeedbackDialog,
    MyCoacheeFeedbackDialog,
    MyCoachFeedbackDialog

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    { provide: LOCALE_ID, useValue: 'nl-BE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
