import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';
// import Search from 'src/components/Search.js';

test.use({ viewport: { width: 1000, height: 1000 } });

////////////////////////////////////////////////
// Integration Test of Course Search Use Case
////////////////////////////////////////////////
test('round trip integration test', async ({ mount,page }) => {
  const component = await mount(<App />);

  // Navigating the Log-In Front-End
  await expect(component).toContainText('Log In');
  await page.keyboard.press('Tab')
  // username and password pair, 'Noo' & 'Foo' valid in the database
  await expect(component).toContainText('Enter Username');
  await page.keyboard.insertText('Noo')
  await page.keyboard.press('Tab')
  await expect(component).toContainText('Enter Password');
  await page.keyboard.insertText('Foo')
  await page.keyboard.press('Tab')
  await expect(component).toContainText('Log In');
  await page.keyboard.press('Enter')

  // course search
  await expect(component).toContainText('Search a Class');
  await page.keyboard.press('Tab') // hamburger menu
  await page.keyboard.press('Tab')
  await page.keyboard.insertText('CS220')
  await page.keyboard.press('Enter')

  // course map
  await expect(component).toContainText('CS 220 — Programming Methodology');
  // children nodes should be present
  await expect(component).toContainText('CICS 210');
  await expect(component).toContainText('CICS 160');

  // test pop-up
  const parent = await page.$('li');
  expect(parent).not.toBe(null);
  const firstDivInLi = await parent.$('div');
  expect(firstDivInLi).not.toBe(null);
  await firstDivInLi.click();
  const popupBody = await page.waitForSelector('.popup-body');
  expect(popupBody).not.toBe(null);
  const popupBodyText = await popupBody.innerText();
  expect(popupBodyText).toContain('The goal of COMPSCI 220');

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