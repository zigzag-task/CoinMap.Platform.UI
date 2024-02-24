export class UserService {
  public state: any;

  public IsAuthenticated() {
    return JSON.parse(sessionStorage.getItem("token")!) !== null;
  }

  public get Message() {
    return this.state.message;
  }
}
