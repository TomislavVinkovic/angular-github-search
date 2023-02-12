import { GithubUser } from "./github-user";
import { User } from "./user";

export function userFactory(data : GithubUser) {
    return new User(
        data.login,
        `https://github.com/${data.login}?tab=repositories`,
        data.avatar_url
    );
}