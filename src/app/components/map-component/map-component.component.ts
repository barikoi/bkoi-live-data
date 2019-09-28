import { Component, OnInit } from '@angular/core';
import { ReverseGeoService } from 'src/app/services/reverse-geo.service';
// import * as d3 from 'd3';
import { environment } from '../../../environments/environment';

declare let L;

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})

export class MapComponentComponent implements OnInit {

  constructor(private usageService: ReverseGeoService) {}

  ngOnInit() {
    const center = [23.80136607530170, 90.39241790771484];

    const bkoiAttrib =
      '<a href="https://www.mapbox.com/">Mapbox</a> | <a href="https://Barikoi.com">Barikoi</a>';

    const mapboxKey = environment.MAPBOX_TOKEN;
    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=${mapboxKey}`;

    const osm = L.tileLayer(mapboxUrl, {
      maxZoom: 18,
      attribution: bkoiAttrib
    });

    const map = new L.Map('map', {
      layers: [osm],
      center: new L.LatLng(center[0], center[1]),
      zoom: 12
    });

    const options = {
      duration: 800
    };

    const pingLayer = L.pingLayer(options).addTo(map);
    pingLayer.radiusScale().range([2, 18]);
    pingLayer.opacityScale().range([1, 0]);

    pingLayer.lng(d => d[0]).lat(d => d[1]);

    setInterval(() => {
      this.usageService.getUsage().subscribe(data => {
        update(data);
      },
      (error: any) => { console.log(error); });

    }, 1000);

    function update(data) {
      pingLayer.ping([parseFloat(data.lon), parseFloat(data.lat)], 'green');
    }
  }
}
