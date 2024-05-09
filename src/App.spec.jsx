import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';
// import Search from 'src/components/Search.js';

test.use({ viewport: { width: 500, height: 500 } });

////////////////////////////////////////////////
// Complete Integration Test
////////////////////////////////////////////////
test('round trip integration test', async ({ mount,page }) => {
  const component = await mount(<App />);

  // through log-in
  await page.keyboard.press('Tab')
  await page.keyboard.insertText('No')
  await page.keyboard.press('Tab')
  await page.keyboard.insertText('Fo')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // course search
  await expect(component).toContainText('Search a Class');
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.insertText('CS220')
  await page.keyboard.press('Enter')

  // course map
  await expect(component).toContainText('CS 220');
  // children nodes should be present
  await expect(component).toContainText('CICS 210');
  await expect(component).toContainText('CICS 160');

  // search new query
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.insertText('CICS110')
  await page.keyboard.press('Enter')

  // new course map
  await expect(component).toContainText('CICS 110');
  // children nodes should be present
  await expect(component).toContainText('MATH 101');
  await expect(component).toContainText('MATH 102');

});

////////////////////////////////////////////////
// Unit Testing of Log-In page
////////////////////////////////////////////////
test('should iterate through sign up page', async ({ mount,page }) => {
  const _ = await mount(<App />);
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement?.id)).toBe("usernameBox")
  
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement?.id)).toBe("passwordBox")

  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement?.id)).toBe("loginBox")

  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement?.id)).toBe("signupLink")
});

test('should contain appropriate text', async ({ mount }) => {
  const component = await mount(<App />);

  await expect(component).toContainText('Log in');
  await expect(component).toContainText('Enter Username');
  await expect(component).toContainText('Enter Password');
  await expect(component).toContainText("Don't have an account?");
});