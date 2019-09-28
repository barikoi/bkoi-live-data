import { Component, OnInit } from '@angular/core';
import { ReverseGeoService } from 'src/app/services/reverse-geo.service';
import * as d3 from 'd3';
import { Usage } from '../../model/Usage';
import { environment } from '../../../environments/environment';

declare let L;

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {
  usage: Usage[];
  checkReverseGeo = 0;

  constructor(private usageService: ReverseGeoService) {}

  ngOnInit() {
    let update;

    setInterval(() => {
      this.usageService.getUsage().subscribe(
        data => {
          console.log(data['Reverse Geocode']);
          if (data['Reverse Geocode'] > this.checkReverseGeo) {
            // update();
          }
          this.checkReverseGeo = data['Reverse Geocode'];
        },
        (error: any) => {
          console.log(error);
        }
      );
    }, 10000);

    const center = [23.799125, 90.41663];

    const bkoiUrl = 'https://map.barikoi.com/styles/osm-bright/{z}/{x}/{y}.png';
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
      zoom: 13
    });

    const options = {
      duration: 800
    };

    const pingLayer = L.pingLayer(options).addTo(map);
    pingLayer.radiusScale().range([2, 18]);
    pingLayer.opacityScale().range([1, 0]);

    pingLayer.lng(d => d[0]).lat(d => d[1]);

    function getRandomInRange(from, to, fixed) {
      return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    update = () => {
      let latFn = getRandomInRange(23.85, 23.72, 3);
      let longFn = getRandomInRange(90.39, 90.41, 3);
      pingLayer.ping([longFn, latFn], 'green');
      window.setTimeout(update, +2000);
    };

    update();
  }
}
