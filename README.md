# Interurbanos decrypt

Decryptor for the api.interurbanos.info API.

## Example

```js
import fetch from 'node-fetch'
import { decrypt } from 'interurbanos-decrypt'

const result = await fetch('https://api.interurbanos.info/31/api/citram?codStop=8_12477')
    .then((r) => r.text())
    .then((t) => decrypt())
    .then((t) => JSON.parse(t))
```
