import { RequestLogger, RequestMock } from 'testcafe';

const homeUrl = 'http://hw.com:1234';
const logger = RequestLogger(homeUrl);
const mock = RequestMock()
    .onRequestTo(homeUrl)
    .respond('<html><body><h1>Hello HW</h1></body></html>');

fixture `test`
    .page(homeUrl);

test
    .requestHooks(logger, mock)
    ('test', async t => {

        // Ensure that the response has been received and that its status code is 200.
        await t.expect(logger.contains(record => record.response.statusCode === 200)).ok();

        const logRecord = logger.requests[0];
        await t.expect(logRecord.request.url).eql(`${homeUrl}/`);
        await t.expect(logRecord.response.statusCode).eql(200);

        console.log(logRecord);           // Chrome 63.0.3239 / Windows 8.1.0.0
        console.log(logRecord.request);         // http://api.example.com
        console.log(logRecord.response); // 304
    });
