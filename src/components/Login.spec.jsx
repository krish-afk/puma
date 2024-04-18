import { test, expect } from '@playwright/experimental-ct-react';
import Login from './Login';
// import Search from 'src/components/Search.js';

test.use({ viewport: { width: 500, height: 500 } });

// test that map appears --> should be round trip integration
test('round trip mounting connection', async ({ mount }) => {
  const component = await mount(<Login />);
});