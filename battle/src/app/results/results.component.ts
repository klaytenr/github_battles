import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  players: any;
  winner1: any;
  winner2: any;
  loser: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.findTwo();
  }
  findTwo(){
    var two = this._httpService.getTwo();
    two.subscribe((data: any) => {
      console.log(data);
      this.players = data.data;
      this.battle();
    })
  }
  battle(){
    if(this.players[0].score > this.players[1].score){
      this.winner1 = this.players[0];
      this.loser = this.players[1];
    }else if(this.players[0].score == this.players[1].score){
      this.winner1 = this.players[0];
      this.winner2 = this.players[1];
    }else{
      this.winner1 = this.players[1 ];
      this.loser = this.players[0];
    }
  }
}
