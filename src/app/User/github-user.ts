import { GithubSearchItem } from "../github-search-item";

export interface GithubUser extends GithubSearchItem {
    login : string;
    avatar_url : string;
    repos_url : string;
}