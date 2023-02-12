import { GithubSearchItem } from "../github-search-item";

export interface GithubRepo extends GithubSearchItem {
    full_name : string;
    url : string;
    description : string;
    language : string;
}