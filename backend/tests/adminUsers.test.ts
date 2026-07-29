import { updateUser, deleteUser } from '../src/controllers/adminController';
import User from '../src/models/User';

jest.mock('../src/models/User');

// Minimal Express res mock
const makeRes = () => {
  const res: any = {};
  res.statusCode = 200;
  res.body = undefined;
  res.status = jest.fn((c: number) => { res.statusCode = c; return res; });
  res.json = jest.fn((b: any) => { res.body = b; return res; });
  res.send = jest.fn(() => res);
  return res;
};
const next = jest.fn();

describe('Admin user management', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('updateUser', () => {
    it('updates a user\'s details and role', async () => {
      const user: any = {
        id: 'u1', firstName: 'A', lastName: 'B', email: 'a@b.ma', role: 'client',
        update: jest.fn(async function (this: any, patch: any) { Object.assign(this, patch); return this; }),
        toJSON() { return { id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email, role: this.role, password: 'secret' }; },
      };
      (User.findByPk as jest.Mock).mockResolvedValue(user);
      const req: any = { params: { id: 'u1' }, body: { firstName: 'New', role: 'admin' }, user: { id: 'admin-id', role: 'admin' } };
      const res = makeRes();

      await updateUser(req, res, next);

      expect(user.update).toHaveBeenCalled();
      expect(res.body.role).toBe('admin');
      expect(res.body.firstName).toBe('New');
      expect(res.body.password).toBeUndefined(); // password never leaked
    });

    it('blocks an admin from removing their OWN admin role', async () => {
      const user: any = { id: 'me', role: 'admin', update: jest.fn() };
      (User.findByPk as jest.Mock).mockResolvedValue(user);
      const req: any = { params: { id: 'me' }, body: { role: 'client' }, user: { id: 'me', role: 'admin' } };
      const res = makeRes();

      await updateUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(user.update).not.toHaveBeenCalled();
    });

    it('returns 404 when the user does not exist', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);
      const req: any = { params: { id: 'ghost' }, body: {}, user: { id: 'admin', role: 'admin' } };
      const res = makeRes();
      await updateUser(req, res, next);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('deleteUser', () => {
    it('deletes another user', async () => {
      const user: any = { id: 'u2', destroy: jest.fn().mockResolvedValue(undefined) };
      (User.findByPk as jest.Mock).mockResolvedValue(user);
      const req: any = { params: { id: 'u2' }, user: { id: 'admin-id', role: 'admin' } };
      const res = makeRes();

      await deleteUser(req, res, next);

      expect(user.destroy).toHaveBeenCalled();
      expect(res.statusCode).toBe(204);
    });

    it('blocks an admin from deleting THEIR OWN account', async () => {
      const user: any = { id: 'me', destroy: jest.fn() };
      (User.findByPk as jest.Mock).mockResolvedValue(user);
      const req: any = { params: { id: 'me' }, user: { id: 'me', role: 'admin' } };
      const res = makeRes();

      await deleteUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(user.destroy).not.toHaveBeenCalled();
    });
  });
});
