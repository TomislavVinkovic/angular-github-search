import { Injectable } from '@angular/core';
import { User } from './User/user';
import { Repo } from './Repo/repo';

@Injectable({
  providedIn: 'root'
})
export class SearchItemService {
  private _total_repo_count = 0;
  private _total_user_count = 0;

  private _users : User[] = [];
  private _repos : Repo[] = [];

  constructor() {}

  //setter methods
  pushRepo(r : Repo) {
    this._repos.push(r);
    console.warn(this._repos);
  }

  pushUser(u : User) {
    this._users.push(u);
  }

  updateUsers(u : User[]) {
    this._users = u;
  }

  updateRepos(r : Repo[]) {
    this._repos = r;
  }

  clearUsers() : void {
    this._users = [];
  }

  clearRepos() : void {
    this._repos = [];
  }

  //getters and setters
  public get users() {
    return this._users;
  }

  public get repos() {
    return this._repos;
  }

  public set total_repo_count(repoCount : number) {
    this._total_repo_count = repoCount;
  }

  public set total_user_count(userCount : number) {
    this._total_user_count = userCount;
  }

  public get total_repo_count() {
    return this._total_repo_count;
  }

  public get total_user_count() {
    return this._total_user_count;
  }
}
