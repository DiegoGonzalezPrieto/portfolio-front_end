import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppInfoComponent} from './components/app-info/app-info.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {EducationComponent} from './components/education/education.component';
import {LanguageSkillComponent} from './components/language-skill/language-skill.component';
import {PageNotFoundComponentComponent} from './components/page-not-found-component/page-not-found-component.component';
import {FullProfileComponent} from './components/profile/full-profile/full-profile.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProjectComponent} from './components/project/project.component';
import {SkillComponent} from './components/skill/skill.component';
import {WorkExperienceComponent} from './components/work-experience/work-experience.component';

const routes: Routes = [
	{path: '', redirectTo: '/perfil/1', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'sign-up', component: SignUpComponent},
	{path: 'info', component: AppInfoComponent},
	{path: 'perfil/:id', component: ProfileComponent, children : [
		{path: 'ver', component: FullProfileComponent },
		{path: 'experiencia-laboral', component: WorkExperienceComponent },
		{path: 'formacion', component: EducationComponent },
		{path: 'habilidades', component: SkillComponent },
		{path: 'idiomas', component: LanguageSkillComponent },
		{path: 'proyectos', component: ProjectComponent },
	]},
	{ path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
