import { Component } from '@angular/core';
import { GithubService } from '../github.service';
import { SearchItemService } from '../search-item.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { requireOneCheckboxValidator } from '../requireOneCheckboxValidator';
import { OnInit } from '@angular/core';
import { Repo } from '../Repo/repo';
import { User } from '../User/user';
import { repoFactory } from '../Repo/repo-factory';
import { userFactory } from '../User/user-factory';
import { GithubResponseObject } from '../github-response/github-response-object';
import { GithubRepo } from '../Repo/GithubRepo';
import { GithubUser } from '../User/github-user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(
    private githubService : GithubService,
    private fb : FormBuilder,
    private searchItemService : SearchItemService
  ) {}
  
  searchForm = this.fb.group({
    searchTerm: ['', Validators.required],
    checks : this.fb.group({
      users : [true],
      repos : [false]
    }, { validators: requireOneCheckboxValidator() })
  });

  get searchTerm() {
    return this.searchForm.get('searchTerm');
  }

  get users() {
    return this.searchForm.get('checks')?.get('users');
  }
  
  get repos() {
    return this.searchForm.get('checks')?.get('repos');
  }

  ngOnInit() {
    this.searchForm.markAsPristine();
  }

  onSubmit() : void {
    let users = this.searchForm.get('checks')!.get('users')!.value!;
    let repos = this.searchForm.get('checks')!.get('repos')!.value!;
    let searchTerm = this.searchForm.get('searchTerm')!.value!;

    let repo_arr : Repo[] = [];
    let user_arr : User[] = [];

    this.searchItemService.clearRepos();
    this.searchItemService.clearUsers();

    if(users && repos) {
      this.githubService.getUsersAndRepos(searchTerm).subscribe(data => {
        //repos
        (data[0] as GithubResponseObject).items.forEach(node => {
          this.searchItemService.pushRepo(repoFactory(node as GithubRepo));
        });
        this.searchItemService.total_repo_count = (data[0] as GithubResponseObject).total_count;

        //users
        (data[1] as GithubResponseObject).items.forEach(node => {
          this.searchItemService.pushUser(userFactory(node as GithubUser));
        });
        this.searchItemService.total_user_count = (data[1] as GithubResponseObject).total_count;
      });
    }

    else if(users) {
      this.githubService.getUsers(searchTerm).subscribe(data => {
        (data as GithubResponseObject).items.forEach(node => {
          this.searchItemService.pushUser(userFactory(node as GithubUser));
        });
        this.searchItemService.total_user_count = (data as GithubResponseObject).total_count;
      });
      
    }

    else if(repos) {
      this.githubService.getRepos(searchTerm).subscribe(data => {
        (data as GithubResponseObject).items.forEach(node => {
          this.searchItemService.pushRepo(repoFactory(node as GithubRepo));
        });
        this.searchItemService.total_repo_count = (data as GithubResponseObject).total_count;
      });
    }
  }
}
