const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./blog_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {

    // clear database
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'testUser',
        password: 'testPassword',
        name: 'Test User',
      }
    })
    await request.post('/api/blogs', {
      data: {
        title: 'initial title',
        author: 'initial author',
        url: 'initial url',
        userId: 'mock-id',
      }
    })

  await page.goto('/')

  })
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { content: 'Log in to application' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'testPassword')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'wrongPassword')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser', 'testPassword')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await expect(page.getByText('A new blog test title by test author added')).toBeVisible()
      await expect(page.getByText('test title test author')).toBeVisible()
    })

    test('a user cannot remove a blog', async ({ page }) => {
      await expect(page.getByText('initial title initial author')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    describe('and a blog is viewed', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'test title', 'test author', 'test url')
        await expect(page.getByText('test title test author')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
      })

      test('the like button is visible', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
      })

      test('the like button can be clicked', async ({ page }) => {
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a user can remove a blog', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        await page.getByRole('button', { name: 'remove' }).click()
        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm');
          expect(dialog.message()).toBe('Remove blog test title by test author?');
          await dialog.accept();
        });
        await expect(page.getByText('test title test author')).not.toBeVisible()
      })
    })
  })


})