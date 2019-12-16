import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunsAppComponent } from './components/runs-app/runs-app.component';



const routes: Routes = [
  {path: '', component: RunsAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
