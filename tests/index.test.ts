import { createServer } from '../src/utils/createServer';
import { postSchema, postsSchema } from './schema/post.schema';

const app = createServer({
  logger: false
});

it('Default server status message sould be returned', async () => {
  const response = await app.inject({
    method: 'GET',
    path: '/'
  });

  expect(response.json().message).toBeDefined();
});

describe('Posts', () => {
  it('data should be valid', async () => {
    const response = await app.inject({
      method: 'GET',
      path: '/posts'
    });

    expect(postsSchema.parse(response.json().post)).toBeTruthy();
  });

  it('should be possible to add', async () => {
    const response = await app.inject({
      method: 'POST',
      path: '/post'
    });

    expect(postSchema.parse(response.json())).toBeTruthy();
  })
});
