import { HomeComponent } from './home/home.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ResultsComponent } from './results/results.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'rankings',component: RankingsComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }