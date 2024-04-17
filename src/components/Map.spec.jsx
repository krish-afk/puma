import { test, expect } from '@playwright/experimental-ct-react';
import Map from 'src/components/Map.js';
// import Search from 'src/components/Search.js';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(<Map />);
  await expect(component).toContainText('CS');
});