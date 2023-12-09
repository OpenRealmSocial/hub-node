# @openrealm/hub-node

A lightweight, fast Typescript interface for Openrealm Hubs. Designed to work with [Hub](https://github.com/openrealmxyz/hub/) and any other Hub that implements the [Openrealm protocol](https://github.com/openrealmxyz/protocol).

## Features

- Call any Hub endpoint from a NodeJS environment.
- Serializes and deserializes Openrealm protobufs into Javascript objects.
- Has helpers to create and sign Openrealm messages.
- Written entirely in TypeScript, with strict types for safety.

## Installation

Install @openrealm/hub-node with the package manager of your choice

```bash
npm install @openrealm/hub-node
yarn add @openrealm/hub-node
pnpm install @openrealm/hub-node
```

## Quickstart

### Fetching Data from Hubs

```typescript
import { getSSLHubRpcClient } from '@openrealm/hub-node';

client.$.waitForReady(Date.now() + 5000, async (e) => {
  if (e) {
    console.error(`Failed to connect to ${hubRpcEndpoint}:`, e);
    process.exit(1);
  } else {
    console.log(`Connected to ${hubRpcEndpoint}`);
    const castsResult = await client.getCastsByQid({ qid: 8928 });
    castsResult.map((casts) => casts.messages.map((cast) => console.log(cast.data?.castAddBody?.text)));
    client.close();
  }
});
```

## License

MIT License
