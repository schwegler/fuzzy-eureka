const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./server');
const Post = require('./models/Post');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Post.deleteMany({});
});

describe('Post API', () => {
  it('should create a text post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        type: 'text',
        content: 'Hello World',
        tags: ['first']
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.type).toBe('text');
    expect(res.body.content).toBe('Hello World');
    expect(res.body.tags).toContain('first');
  });

  it('should create a photo post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        type: 'photo',
        url: 'http://example.com/photo.jpg',
        tags: ['photo']
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.type).toBe('photo');
    expect(res.body.url).toBe('http://example.com/photo.jpg');
  });

  it('should fetch all posts', async () => {
    await Post.create({ type: 'text', content: 'Post 1' });
    await Post.create({ type: 'text', content: 'Post 2' });

    const res = await request(app).get('/api/posts');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].content).toBe('Post 2'); // Sorted by createdAt desc
  });

  it('should add a comment to a post', async () => {
    const post = await Post.create({ type: 'text', content: 'Post with comment' });

    const res = await request(app)
      .post(`/api/posts/${post._id}/comments`)
      .send({ content: 'Nice post!' });

    expect(res.statusCode).toBe(200);
    expect(res.body.comments.length).toBe(1);
    expect(res.body.comments[0].content).toBe('Nice post!');
  });
});
