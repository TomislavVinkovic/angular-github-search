import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Repo } from './Repo/repo';
import { User } from './User/user';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private token = "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";
  private rootURL = 'https://api.github.com'
  private latestSearch : string = "";

  //TODO: Add typing

  //GET
  getRepos(searchStr : string | null, page : number = 1) {
    //TODO: add piping(tap, catchError)
    if(searchStr != null) this.latestSearch = searchStr;
    return this.http.get(`${this.rootURL}/search/repositories?q=${this.latestSearch}&page=${page}`);
  }

  //GET
  getUsers(searchStr : string | null, page : number = 1){
    //TODO: add piping(tap, catchError)
    if(searchStr != null) this.latestSearch = searchStr;
    return this.http.get(`${this.rootURL}/search/users?q=${this.latestSearch}&page=${page}`);
  }

  //GET
  getUsersAndRepos(searchStr : string) {
    return forkJoin([
      this.http.get(`${this.rootURL}/search/repositories?q=${searchStr}`),
      this.http.get(`${this.rootURL}/search/users?q=${searchStr}`)
    ]);
  }

  constructor(
    private http : HttpClient
  ) { }
}
