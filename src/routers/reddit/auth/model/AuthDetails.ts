import * as Nano from "nano";

export default class AuthDetails implements Nano.MaybeDocument {
  _id: string;
  _rev: string;
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
    token_type,
    _id?
  ) {
    if (_id) {
      this._id = _id;
    } else {
      this._id = access_token;
    }

    this.access_token = access_token;
    this.expires_in = expires_in;
    this.refresh_token = refresh_token;
    this.scope = scope;
    this.token_type = token_type;
  }

  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      // if (this.permalink) {
      //   this._id = uuhash(this.permalink);
      //   // console.log(this._id);
      // } else {
      //   this._id = response.id; //
      // }
      // We only need to update rev which changes whenever document is updated
      // this._id = response.id;
      this._rev = response.rev;
    }
  }

  getId() {
    return this._id;
  }

  setId(_id) {
    this._id = _id;
  }

  getRev() {
    return this._rev;
  }
}
