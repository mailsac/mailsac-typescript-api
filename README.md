# mailsac-typescript-api

Official Mailsac TypeScript and JavaScript Client Library

Compiled JavaScript files are published here, as well as TypeScript files and .d typings.

This library is generated from the openapi spec for mailsac
which can be seen at https://mailsac.com/openapi.yml or https://mailsac.com/openapi.json.

## Usage

```shell
npm install @mailsac/api
```

The official Mailsac API spec documentation which includes usage examples for this library:

https://mailsac.com/docs/api

or see the guides:

https://docs.mailsac.com

### [List of all mailsac client methods](methodList.md)

### Usage Example

Get started by instantiating a client library instance with an API key:

```typescript
import { Mailsac } from "@mailsac/api";
// or for javascript
// const { Mailsac } = require("@mailsac/api");

const mailsac = new Mailsac({ headers: {  "Mailsac-Key": process.env.MAILSAC_KEY } }); // api key from mailsac.com/v2/credentials
```

Then you can use the client to make requests:

```typescript
// list public messages on a public inbox (no need to create the inbox first!)
const messages = await mailsac.addresses.listMessages('test-public@mailsac.com');
console.log({ messages }); // [{...}, {...}, ...]

// reserve an enhanced private address - everybody starts with a free one.
const address = await mailsac.addresses.createAddress('test-private@mailsac.com');
console.log({ address }); // { _id: "test-private@mailsac-com", ... }
const myAddresses = await mailsac.addresses.list();
console.log({ myAddresses }); // [{ _id: "test-private@mailsac-com", ... }]

// got to your email client, send an email to the address....
// ...then check the mail
const messages = await mailsac.messages.listMessages('test-private@mailsac.com');
console.log({ messages }); // [{...}, {...}, ...]

```

There are many more API endpoints which are supported by the client library. Look at
`./mailsac-client.ts` under the `Mailsac` class to learn more.

Mailsac has features like custom subdomains of `msdc.co` which require no DNS config, so you can be receiving
private email for testing in seconds.
