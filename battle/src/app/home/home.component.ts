import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  player1Value: boolean;
  player2Value: boolean;
  player1: any;
  player2: any;
  followers: number;
  repos: number;
  data : any;
  players: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.player1 = { username: '', score: Number, image: String};
    this.player1Value = false;
    this.player2 = { username: '', score: Number, image: String};
    this.player2Value = false;
    this.findPlayers();
  }
  findPlayers(){
    var players = this._httpService.getAll();
    players.subscribe((data: any) => {
      console.log(data);
      this.players = data.data;
    })
  }
  addNewPlayer1(){
    var player = this._httpService.findPlayer(this.player1);
    player.subscribe((data:any) => {
      this.data = data;
      this.player1.image = data.items[0].avatar_url;
      var score = this._httpService.getRepos(data.items[0].repos_url);
      score.subscribe((data: any) => {
        this.player1.score = data.length;
        var follows = this._httpService.getFollowers(this.data.items[0].followers_url);
        follows.subscribe((data: any) => {
          this.player1.score += data.length;
          this.player1.score *= 12;
          console.log(this.player1);
          var newPlayer = this._httpService.createPlayer(this.player1, this.players);
          newPlayer.subscribe((data: any) => {
            console.log(data);
            this.player1Value = true;
          })
        })
      })
    })
  }
  addNewPlayer2(){
    var player = this._httpService.findPlayer(this.player2);
    player.subscribe((data:any) => {
      this.data = data;
      this.player2.image = data.items[0].avatar_url;
      var score = this._httpService.getRepos(data.items[0].repos_url);
      score.subscribe((data: any) => {
        this.player2.score = data.length;
        var follows = this._httpService.getFollowers(this.data.items[0].followers_url);
        follows.subscribe((data: any) => {
          this.player2.score += data.length;
          this.player2.score *= 12;
          console.log(this.player2);
          var newPlayer = this._httpService.createPlayer(this.player2, this.players);
          newPlayer.subscribe((data: any) => {
            console.log(data);
            this.player2Value = true;
          })
        })
      })
    })
  }
}