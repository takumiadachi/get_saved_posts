// interface Details {
//   access_token: string;
//   token_type?: string;
//   expires_in: number;
//   refresh_token: string;
//   scope: string;
// }

export default class Details {
  access_token: string;
  token_type?: string;
  expires_in: number;
  refresh_token: string;
  scope: string;

  constructor(
    access_token,
    expires_in,
    refresh_token,
    scope,
    token_type = null
  ) {
    this.access_token = access_token;
    this.expires_in = expires_in;
    this.refresh_token = refresh_token;
    this.scope = scope;
    this.token_type = token_type;
  }
}
