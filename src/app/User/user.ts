import { SearchItem } from "../search-item";

export class User implements SearchItem {
    constructor(
        public username : string,
        public repos_url : string,
        public avatar_url : string
    ) {}

};