import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  players: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    var players = this._httpService.getAll();
    players.subscribe((data: any) => {
      this.players = data.data;
    })
  }
}
