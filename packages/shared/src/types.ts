export interface Profile {
  urlToken: string;
  name?: string;
}

export interface FetchProfilesOptions {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}
