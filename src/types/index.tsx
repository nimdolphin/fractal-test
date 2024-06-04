export enum SelectOption {
  USER = "user",
  REPO = "repo",
}

export interface IUser {
  login: string;
  name: string;
  public_repos: number;
}

export interface IRepo {
  name: string;
  full_name: string;
  stargazers_count: number;
}
