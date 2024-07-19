const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Group = require('../models/Group');

describe('Group Service API', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin',
      });
    token = res.body.token;
  });

  afterAll(async () => {
    // Clean up the database
    await Group.deleteMany({});
    await mongoose.disconnect();
  });

  describe('POST /api/groups', () => {
    it('should create a new group', async () => {
      const res = await request(app)
        .post('/api/groups')
        .set('Authorization', `Bearer ${token}`)
        .send({
          groupName: 'Test Group',
          groupAdminId: '60d0fe4f5311236168a109ca',
          members: [],
          department: 'Test Department',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.group).toHaveProperty('groupName', 'Test Group');
    });
  });

  describe('GET /api/groups', () => {
    it('should get all groups', async () => {
      const res = await request(app)
        .get('/api/groups')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/groups/:id', () => {
    let groupId;

    beforeAll(async () => {
      const group = new Group({
        groupName: 'Test Group',
        groupAdminId: '60d0fe4f5311236168a109ca',
        members: [],
        department: 'Test Department',
      });
      await group.save();
      groupId = group._id.toString();
    });

    it('should get a group by ID', async () => {
      const res = await request(app)
        .get(`/api/groups/${groupId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('groupName', 'Test Group');
    });
  });

  describe('PUT /api/groups/:id/add-member', () => {
    let groupId;

    beforeAll(async () => {
      const group = new Group({
        groupName: 'Test Group',
        groupAdminId: '60d0fe4f5311236168a109ca',
        members: [],
        department: 'Test Department',
      });
      await group.save();
      groupId = group._id.toString();
    });

    it('should add a member to a group', async () => {
      const res = await request(app)
        .put(`/api/groups/${groupId}/add-member`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '60d0fe4f5311236168a109cb',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.group.members).toContain('60d0fe4f5311236168a109cb');
    });
  });

  describe('PUT /api/groups/:id/remove-member', () => {
    let groupId;

    beforeAll(async () => {
      const group = new Group({
        groupName: 'Test Group',
        groupAdminId: '60d0fe4f5311236168a109ca',
        members: ['60d0fe4f5311236168a109cb'],
        department: 'Test Department',
      });
      await group.save();
      groupId = group._id.toString();
    });

    it('should remove a member from a group', async () => {
      const res = await request(app)
        .put(`/api/groups/${groupId}/remove-member`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: '60d0fe4f5311236168a109cb',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.group.members).not.toContain('60d0fe4f5311236168a109cb');
    });
  });
});