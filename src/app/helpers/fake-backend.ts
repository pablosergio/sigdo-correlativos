import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        const testUser = { username: 'palvarado', password: 'palvarado', firstName: 'Test', lastName: 'User' };
        const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhbHZhcmFkbyIsInBhc3N3b3JkIjoicGFsdm' +
          'FyYWRvIiwibWVudSI6W3sibWVudV9vcGNpb25faWQiOjEsIm9wY2lvbiI6IkluaWNpbyIsImhyZWYiOiJyYWR0b29scy5ob21lIiwiYWxpYX' +
          'MiOm51bGwsInRvb2x0aXAiOm51bGwsImljb25vIjoiaW9uIGlvbi1pb3MtaG9tZSIsIm9wY2lvbl9wYWRyZSI6bnVsbCwicG9zaWNpb24' +
          'iOjEsImVzdGFkbyI6IkFDVElWTyIsInVzdWFyaW9fbWVudV9vcGNpb25faWQiOjEsInVzZXJuYW1lIjoicGFsdmFyYWRvIiwiZmVjaGFf' +
          'cmVnaXN0cm8iOiIyMDE3LTAxLTAyVDIzOjM3OjIxLjM5MVoifSx7Im1lbnVfb3BjaW9uX2lkIjoyLCJvcGNpb24iOiJHZW5lcmFyIiwiaH' +
          'JlZiI6InJhZHRvb2xzLmJ1aWx0IiwiYWxpYXMiOm51bGwsInRvb2x0aXAiOm51bGwsImljb25vIjoiaW9uIGlvbi1zZXR0aW5ncyIsIm9wY' +
          '2lvbl9wYWRyZSI6bnVsbCwicG9zaWNpb24iOjIsImVzdGFkbyI6IkFDVElWTyIsInVzdWFyaW9fbWVudV9vcGNpb25faWQiOjIsInVzZXJuY' +
          'W1lIjoicGFsdmFyYWRvIiwiZmVjaGFfcmVnaXN0cm8iOiIyMDE3LTAxLTAyVDIzOjM3OjIxLjM5MVoiLCJzdWJtZW51IjpbeyJtZW51X29wY2' +
          'lvbl9pZCI6Mywib3BjaW9uIjoiQXJjaGl2b3MiLCJocmVmIjoicmFkdG9vbHMuZmlsZXMiLCJhbGlhcyI6bnVsbCwidG9vbHRpcCI6bnVsbCw' +
          'iaWNvbm8iOiJpb24gaW9uLWRvY3VtZW50LXRleHQiLCJvcGNpb25fcGFkcmUiOjIsInBvc2ljaW9uIjoxLCJlc3RhZG8iOiJBQ1RJVk8iLCJ1c' +
          '3VhcmlvX21lbnVfb3BjaW9uX2lkIjozLCJ1c2VybmFtZSI6InBhbHZhcmFkbyIsImZlY2hhX3JlZ2lzdHJvIjoiMjAxNy0wMS0wMlQyMzozNzoy' +
          'MS4zOTFaIn1dfV0sImlhdCI6MTUwNDg5MTg5MCwiZXhwIjoxNTA0OTc4MjkwfQ.X2a-_wLawikjBnbvvIv89V4EKA_jVyUfpavkYDvlV9o';
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/login') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                const params = JSON.parse(connection.request.getBody());
                // check user credentials and return fake jwt token if valid
                if (params.username === testUser.username && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { success: true, token: TOKEN } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

            // fake users api end point
            if (connection.request.url.startsWith('/api/correlativos') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                 if (connection.request.headers.get('Authorization') === 'Bearer ' + TOKEN) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: {
                                  success: true,
                                  rows: [
                                    { id: 1, correlativo: 'CEN-10001', creation_date: new Date(), isPrinted: false }
                                  ],
                                  total: 1
                                }
                        })
                    ));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }

        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
