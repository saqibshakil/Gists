import { BACK_TO_GRID, GET_GISTS_BY_USERNAME, GOTO_GIST_DETAIL, GOTO_NEXT_PAGE, GOTO_PREV_PAGE, RD_LOADING_GISTS, RD_LOADING_GIST_DETAIL, RD_UPDATE_GISTS, RD_UPDATE_GIST_DETAIL, START_GIST } from "./constants";

export interface IGistState {
  gists: IGist[]
  gistDetail?: IGistDetail
  gridLoading: boolean
  detailLoading: boolean
}

interface IGistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated?: boolean;
  content?: string;
}
interface IGistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
}

interface IGistOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}


interface IGistHistoryItem {
  user: IGistOwner;
  version: string;
  committed_at: string;
  change_status: {
    total: number;
    additions: number;
    deletions: number;
  };
  url: string;
}

export interface IGistDetail {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Record<string, IGistFile>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: null;
  comments_url: string;
  owner: IGistOwner;
  forks: any[]; // You might want to create a proper interface for forks
  history: IGistHistoryItem[];
  truncated: boolean;
}




export interface IGist {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Record<string, IGistFile>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: null;
  comments_url: string;
  owner: IGistOwner;
  truncated: boolean;
}


export interface IStartAction {
  type: typeof START_GIST
}

export interface IGetListOfGists {
  type: typeof GET_GISTS_BY_USERNAME
  userName: string
}

export interface IGotoNextPage {
  type: typeof GOTO_NEXT_PAGE
}

export interface IGotoPrevPage {
  type: typeof GOTO_PREV_PAGE
}

export interface IBackToGrid {
  type: typeof BACK_TO_GRID
}

export interface IGotoDetail {
  type: typeof GOTO_GIST_DETAIL
  gistId: string
}

export interface IUpdateGists {
  type: typeof RD_UPDATE_GISTS
  gists: IGist[]
}

export interface IUpdateDetail {
  type: typeof RD_UPDATE_GIST_DETAIL
  gist?: IGistDetail
}

export interface IGistsLoading {
  type: typeof RD_LOADING_GISTS
  loading: boolean
}

export interface IGistDetailLoading {
  type: typeof RD_LOADING_GIST_DETAIL
  loading: boolean
}

export type UIActions = |
  IStartAction |
  IGetListOfGists |
  IGotoNextPage |
  IGotoPrevPage |
  IBackToGrid |
  IGotoDetail

export type RDActions = |
  IUpdateGists |
  IUpdateDetail |
  IGistDetailLoading |
  IGistsLoading

