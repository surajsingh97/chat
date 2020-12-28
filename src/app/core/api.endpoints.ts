export class ApiEndpoint {
  public static data(): any {
    return {
      login: {
        url: 'login',
        method: 'POST',
      },
      signup: {
        url: 'signup',
        method: 'POST',
      },
      friend: {
        url: 'getFriend',
        method: 'POST',
      },
      getMessage: {
        url: 'show-messages',
        method: 'POST',
      },
    };
  }
}
