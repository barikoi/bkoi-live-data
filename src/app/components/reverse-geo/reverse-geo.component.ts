import { Component, OnInit } from '@angular/core';
import { ReverseGeoService } from 'src/app/services/reverse-geo.service';
import { Usage } from '../../model/Usage';

@Component({
  selector: 'app-reverse-geo',
  templateUrl: './reverse-geo.component.html',
  styleUrls: ['./reverse-geo.component.scss']
})
export class ReverseGeoComponent implements OnInit {

  usage: Usage[];

  constructor(private reverseGeoService: ReverseGeoService) { }

  ngOnInit() {
    this.reverseGeoService.getUsage().subscribe(data => {
      this.usage = data;
    },
    (error: any) => {console.log(error); });
    // this.usage = this.reverseGeoService.golddigeer();
  }

}
