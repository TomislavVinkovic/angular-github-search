import { Repo } from "./repo";
import { GithubRepo } from "./GithubRepo";

export function repoFactory (data : GithubRepo) {
    return new Repo(
        data.full_name,
        `https://github.com/${data.full_name}`,
        data.description,
        data.language
    );
}