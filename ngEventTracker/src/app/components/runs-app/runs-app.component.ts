import { Component, OnInit } from '@angular/core';
import { Run } from 'src/app/models/run';

import { NgForm } from '@angular/forms';
import { RunService } from 'src/app/services/run.service';


@Component({
  selector: 'app-runs-app',
  templateUrl: './runs-app.component.html',
  styleUrls: ['./runs-app.component.css']
})
export class RunsAppComponent implements OnInit {

  // F i e l d s

  runs: Run[] = [];
  editRun: Run = null;
  totalMiles = 0;


  // C o n s t r u c t o r

  constructor(private runSvc: RunService) { }

  // M e t h o d s

  ngOnInit() {
    this.loadRuns();
  }

  loadRuns() {

    this.runSvc.index().subscribe(
      data => {
        console.log(data);
        this.runs = data;
        for (let i = 0; i < this.runs.length; i++) {
          this.totalMiles += this.runs[i].distance;
        }
      },
      err => {
      console.error(err);
      }
    );
  }


  addRun(form: NgForm) {
    const myNewRun = new Run();

    myNewRun.distance = form.value.distance;
    myNewRun.duration = form.value.duration;
    myNewRun.date = form.value.date;

    // this.pokemons.push(myNewPoke);
    console.log(myNewRun);
    this.runSvc.create(myNewRun).subscribe(
      data => {
        console.log(data);
        this.loadRuns();
      },
      err => {
        console.error(err);
      }
    );
  }

  updateRun(run: Run) {
    console.log(run);
    this.runSvc.update(run).subscribe(
      data => {
        this.loadRuns();
        this.editRun = null;
      },
      err => {
        console.error('RunsAppComponenent.updateRun(): error updating run');
        console.error(err);
      }
    );
  }

  deleteRun(id: number) {
    this.runSvc.delete(id).subscribe(
      data => {
        this.loadRuns();
        this.editRun = null;
      },
      error => {
        console.error('RunsAppComponenent.deleteRun(): error deleting run');
        console.error(error);
      }
    );
 }
}

