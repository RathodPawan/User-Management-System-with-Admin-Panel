const request = require('supertest');
const app = require('../app');  // Assuming you have app.js to start the Express app
const { User, Notification } = require('../models');
const jwt = require('jsonwebtoken');

// This is a mock function to generate a token for testing purposes
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

describe('Notification API', () => {
  let user, admin;
  let userToken, adminToken;

  // Setup before running the tests
  beforeAll(async () => {
    // Create a test user
    user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });

    // Create an admin user
    admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });

    // Generate JWT tokens for both users
    userToken = generateToken(user._id);
    adminToken = generateToken(admin._id);
  });

  afterAll(async () => {
    // Clean up: remove test users from database
    await User.deleteMany({});
    await Notification.deleteMany({});
  });

  // Test: Admin sends a notification to a user
  it('should send a notification as an admin', async () => {
    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [user._id],
        message: 'Admin test message',
        isCritical: false,
      })
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(201);
    expect(response.body.msg).toBe('Notification sent successfully');
  });

  // Test: User sends a notification to another user
  it('should send a notification as a user', async () => {
    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [admin._id],
        message: 'User test message',
        isCritical: false,
      })
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(201);
    expect(response.body.msg).toBe('Notification sent successfully');
  });

  // Test: Notification delivery when recipient is available
  it('should deliver notification immediately if recipient is available', async () => {
    await User.updateOne({ _id: user._id }, { availabilityStatus: 'available' });

    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [user._id],
        message: 'Available user test message',
        isCritical: false,
      })
      .set('Authorization', `Bearer ${adminToken}`);

    const notification = await Notification.findOne({ message: 'Available user test message' });
    expect(notification.status).toBe('delivered');
    expect(notification.deliveredAt).not.toBeNull();
  });

  // Test: Notification is queued if recipient is unavailable
  it('should queue notification if recipient is unavailable', async () => {
    await User.updateOne({ _id: user._id }, { availabilityStatus: 'unavailable' });

    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [user._id],
        message: 'Unavailable user test message',
        isCritical: false,
      })
      .set('Authorization', `Bearer ${adminToken}`);

    const notification = await Notification.findOne({ message: 'Unavailable user test message' });
    expect(notification.status).toBe('queued');
  });

  // Test: Admin sends a critical notification to a user
  it('should deliver critical notification immediately even if recipient is unavailable', async () => {
    await User.updateOne({ _id: user._id }, { availabilityStatus: 'unavailable' });

    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [user._id],
        message: 'Critical message for unavailable user',
        isCritical: true,
      })
      .set('Authorization', `Bearer ${adminToken}`);

    const notification = await Notification.findOne({ message: 'Critical message for unavailable user' });
    expect(notification.status).toBe('delivered');
    expect(notification.deliveredAt).not.toBeNull();
  });

  // Test: Recipient does not exist (invalid recipient ID)
  it('should return an error if a recipient does not exist', async () => {
    const invalidUserId = '60a5c8c7fcb1b8a123456789'; // A fake user ID

    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [invalidUserId],
        message: 'Message to invalid user',
        isCritical: false,
      })
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('One or more recipients do not exist');
  });

  // Test: Unauthorized user trying to send notification
  it('should return an error if the user is unauthorized', async () => {
    const response = await request(app)
      .post('/api/notifications')
      .send({
        recipients: [user._id],
        message: 'Unauthorized user message',
        isCritical: false,
      })
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Unauthorized');
  });
});
