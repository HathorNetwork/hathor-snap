import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
    events: true,
    assert: true,
    path: true,
    crypto: true,
    util: true,
    url: true,
    punycode: true,
    stream: true,
  },
};

export default config;
