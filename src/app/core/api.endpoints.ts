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
        url: 'show-friend',
        method: 'POST',
      },
      getMessage: {
        url: 'show-messages',
        method: 'POST',
      },
      addFriend: {
        url: 'Add',
        method: 'POST',
      },
      online: {
        url: 'online',
        method: 'POST',
      },
      getAll: {
        url: 'getAll',
        method: 'POST',
      },
    };
  }
}
