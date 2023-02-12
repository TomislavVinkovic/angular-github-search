import { Component, Input } from '@angular/core';
import { Repo } from '../Repo/repo';

@Component({
  selector: 'app-repo-list-item',
  templateUrl: './repo-list-item.component.html',
  styleUrls: ['./repo-list-item.component.css']
})
export class RepoListItemComponent {
  @Input() repo? : Repo;
}
