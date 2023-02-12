import { SearchItem } from "../search-item";

export class Repo implements SearchItem {
    constructor(
        public name : string,
        public url : string,
        public description : string,
        public language : string
    ) {}
}