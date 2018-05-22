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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GroupsComponent,
    MainComponent
  ],
  imports: [
    FormsModule ,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,LigowoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
