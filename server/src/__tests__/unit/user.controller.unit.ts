import {
  createStubInstance,
  expect,
  sinon,
  StubbedInstanceWithSinonAccessor
} from '@loopback/testlab';
import {UserController} from '../../controllers';
import {User} from '../../models';
import {UserRepository} from '../../repositories';
import {BcryptHasher} from '../../services/hash.password.bcrypt';
import {JwtService} from '../../services/jwt.service';

describe('UserController (unit)', () => {
  let repository: StubbedInstanceWithSinonAccessor<UserRepository>;
  let jwtService: StubbedInstanceWithSinonAccessor<JwtService>;
  let bcryptHasher: StubbedInstanceWithSinonAccessor<BcryptHasher>;
  beforeEach(givenStubbedRepository);

  const fetchedUsers = [
    new User({
      id: 'uuid1',
      firstName: 'TF 1',
      middleName: 'TM 1',
      lastName: 'TL 1',
      address: 'TA 1',
      email: 'TE1@gmail.com',
      phoneNumber: 1111111111,
      createdAt: new Date('1990-09-13T04:16:36.382Z'),
      rolekey: 'TR1',
      customerId: 'TC1',
      username: 'TU1',
      password: '12341234'
    })
  ];

  it('fetches all the users', async () => {
    const controller = new UserController(repository, jwtService, bcryptHasher);
    repository.stubs.find.resolves(fetchedUsers);

    const users = await controller.find();

    expect(users).to.deepEqual(fetchedUsers);
    sinon.assert.calledWithMatch(repository.stubs.find);
  });

  it('deletes the user with the given id', async () => {
    const controller = new UserController(repository, jwtService, bcryptHasher);
    await controller.deleteById('uuid1');
    sinon.assert.calledWithMatch(repository.stubs.deleteById, 'uuid1');
  });

  it('get selected user with the given id', async () => {
    const controller = new UserController(repository, jwtService, bcryptHasher);
    const userSelected = new User({
      id: 'uuid1',
      firstName: 'TF 1',
      middleName: 'TM 1',
      lastName: 'TL 1',
      address: 'TA 1',
      email: 'TE1@gmail.com',
      phoneNumber: 1111111111,
      createdAt: new Date('1990-09-13T04:16:36.382Z'),
      rolekey: 'TR1',
      customerId: 'TC1',
      username: 'TU1',
      password: '12341234'
    });
    repository.stubs.find.resolves(fetchedUsers);
    const selectedUser = await controller.findById('uuid1');

    expect(selectedUser).to.deepEqual(userSelected);
    sinon.assert.calledWithMatch(repository.stubs.find);

  });

  it('edit selected user with the given id', async () => {
    const controller = new UserController(repository, jwtService, bcryptHasher);
    const userData = new User({
      id: 'uuid1',
      firstName: 'TF 1',
      middleName: 'TM 1',
      lastName: 'TL 1',
      address: 'TA 1',
      email: 'TE1@gmail.com',
      phoneNumber: 1111111111,
      createdAt: new Date('1990-09-13T04:16:36.382Z'),
      rolekey: 'TR1',
      customerId: 'TC1',
      username: 'TU1',
      password: '12341234'
    });
    await controller.updateById('uuid1', userData);
    sinon.assert.calledWithMatch(repository.stubs.updateById, 'uuid1');
  });

  function givenStubbedRepository() {
    repository = createStubInstance(UserRepository);
  }
});
