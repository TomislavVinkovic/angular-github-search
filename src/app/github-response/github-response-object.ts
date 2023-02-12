import { GithubSearchItem } from "../github-search-item";

export interface GithubResponseObject {
    total_count : number;
    items : GithubSearchItem[];
    incomplete_results : boolean;
}