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
        };
    }
}
