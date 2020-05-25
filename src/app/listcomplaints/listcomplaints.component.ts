import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SikayetlerService} from '../services/sikayetler.service';
import {SikayetlerModel} from '../models/sikayetler.model';

@Component({
  selector: 'app-listcomplaints',
  templateUrl: './listcomplaints.component.html',
  styleUrls: ['./listcomplaints.component.css']
})
export class ListcomplaintsComponent implements OnInit {

  sikayetlerModelList: SikayetlerModel[];

  constructor(private router: Router,
              private sikayetlerService: SikayetlerService) {
  }


  ngOnInit(): void {
    this.getSikayetler();
  }

  clickEnterComp() {
    this.router.navigate(['/yeni-sikayet']);
  }

  getSikayetler(): void {
    this.sikayetlerService.getAll().pipe().subscribe((data: SikayetlerModel[]) => {
      this.sikayetlerModelList = data;
      // console.log(data);
      console.log(this.sikayetlerModelList);
    });
  }

  showDetailComp(compId: number) {
    this.router.navigate(['/sikayet-detay/' + compId]);
  }
}
