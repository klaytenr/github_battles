import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  findPlayer(player){
    console.log(player.username);
    return this._http.get('https://api.github.com/search/users?q=' + player.username);
  }
  getRepos(url){
    return this._http.get(url)
  }
  getFollowers(url){
    return this._http.get(url);
  }
  createPlayer(player, players){
    for(let x = 0; x < players.length; x++){
      if(players[x].username == player.username){
        player = players[x];
        return this._http.get('/player/' + players[x].username);
      }
    }
    return this._http.post('/create', player);
  }
  getAll(){
    return this._http.get('/players');
  }
  getTwo(){
    return this._http.get('/two');
  }
}
