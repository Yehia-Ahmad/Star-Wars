export interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<any>;
}
