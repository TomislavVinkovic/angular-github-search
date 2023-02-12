import { Component } from '@angular/core';
import { SearchItemService } from '../search-item.service';
import { GithubService } from '../github.service';
import { GithubResponseObject } from '../github-response/github-response-object';
import { userFactory } from '../User/user-factory';
import { repoFactory } from '../Repo/repo-factory';
import { GithubUser } from '../User/github-user';
import { GithubRepo } from '../Repo/GithubRepo';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {
  show_users = true;
  show_repos = false;

  public updating : boolean = false;

  constructor(
    public searchItemService : SearchItemService,
    private githubService : GithubService
  ){}
  
  //show users
  public toggleUsers() : void {
    if(this.show_users === true) return;
    this.show_users = true;
    this.show_repos = false;
  }

  //show repos
  public toggleRepos() : void {
    if(this.show_repos === true) return;
    this.show_users = false;
    this.show_repos = true;
  }

  //I need this in order to be able to use
  //the math module in templates
  public get Math() {
    return Math;
  }

  //updating the users list on page change
  updateUsersList() : void {
    this.updating = true;
    this.searchItemService.clearUsers();
    this.githubService.getUsers(null, this.users_page).subscribe(data => {
      (data as GithubResponseObject).items.forEach(node => {
        this.searchItemService.pushUser(userFactory(node as GithubUser));
      });
      this.searchItemService.total_user_count = (data as GithubResponseObject).total_count;
      this.updating = false;
    });
  }

  //updating the repos list on page change
  updateReposList() : void {
    this.updating = true;
    this.searchItemService.clearRepos();
    this.githubService.getRepos(null, this.repos_page).subscribe(data => {
      (data as GithubResponseObject).items.forEach(node => {
        this.searchItemService.pushRepo(repoFactory(node as GithubRepo));
      });
      this.searchItemService.total_repo_count = (data as GithubResponseObject).total_count;
      this.updating = false;
    });
  }

  //pagination properties
  users_page = 1;
  repos_page = 1;
}
