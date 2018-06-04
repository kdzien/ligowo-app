import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { appRoutes } from './app.routes';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';
import { MainComponent } from './main/main.component';
import { LigowoService } from 'src/app/services/ligowo.service';
import { GroupComponent } from './group/group.component';
import { ForfilterPipe } from './forfilter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from 'src/app/services/alert.service';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { WaitingComponent } from './waiting/waiting.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GroupsComponent,
    MainComponent,
    GroupComponent,
    ForfilterPipe,
    AlertComponent,
    ClickStopPropagationDirective,
    LandingComponent,
    WaitingComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule ,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, LigowoService, AlertService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
