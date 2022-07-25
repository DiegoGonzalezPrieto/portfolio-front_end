import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EducationComponent } from './components/education/education.component';
import { EducationItemComponent } from './components/education/education-item/education-item.component';
import { AddButtonComponent } from './components/buttons/add-button/add-button.component';
import { EducationFormComponent } from './components/education/education-form/education-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';
import { DelButtonComponent } from './components/buttons/del-button/del-button.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { WorkExpFormComponent } from './components/work-experience/work-exp-form/work-exp-form.component';
import { WorkExpItemComponent } from './components/work-experience/work-exp-item/work-exp-item.component';
import { LanguageSkillComponent } from './components/language-skill/language-skill.component';
import { LangSkillItemComponent } from './components/language-skill/lang-skill-item/lang-skill-item.component';
import { LangSkillFormComponent } from './components/language-skill/lang-skill-form/lang-skill-form.component';
import { SkillComponent } from './components/skill/skill.component';
import { SkillItemComponent } from './components/skill/skill-item/skill-item.component';
import { SkillFormComponent } from './components/skill/skill-form/skill-form.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectItemComponent } from './components/project/project-item/project-item.component';
import { ProjectFormComponent } from './components/project/project-form/project-form.component';
import { AboutComponent } from './components/about/about.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginButtonComponent } from './components/buttons/login-button/login-button.component';
import { AboutFormComponent } from './components/about/about-form/about-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { IndexComponent } from './components/index/index.component';
import {interceptorProvider} from './shared/services/interceptors/http-interceptor.service';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { FullProfileComponent } from './components/profile/full-profile/full-profile.component';
import { AppInfoComponent } from './components/app-info/app-info.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    EducationComponent,
    EducationItemComponent,
    AddButtonComponent,
    EducationFormComponent,
    EditButtonComponent,
    DelButtonComponent,
    WorkExperienceComponent,
    WorkExpFormComponent,
    WorkExpItemComponent,
    LanguageSkillComponent,
    LangSkillItemComponent,
    LangSkillFormComponent,
    SkillComponent,
    SkillItemComponent,
    SkillFormComponent,
    ProjectComponent,
    ProjectItemComponent,
    ProjectFormComponent,
    AboutComponent,
    ContactInfoComponent,
    NavbarComponent,
    LoginButtonComponent,
    AboutFormComponent,
    LoginComponent,
    SignUpComponent,
    IndexComponent,
    ProfileComponent,
    PageNotFoundComponentComponent,
    FullProfileComponent,
    AppInfoComponent,
    UserDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
//	FormsModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
