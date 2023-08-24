import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { UserAttributes } from '../../types/user.type';
import dateToString from '../../util/dateToString';
import { renderWithProviders } from '../../util/jest';
import User from './User';

let user: UserAttributes;

beforeAll(() => {
  user = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe@foobar.com',
    admin: false,
    hashedPassword: '123456',
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    readings: [],
    blogs: [],
  };
});

describe('<User />', () => {
  it('should render the user with a name', () => {
    renderWithProviders(<User user={user} />);
    const name = screen.getByText('John Doe');
    expect(name).toBeInTheDocument();

    const username = screen.getByText('johndoe@foobar.com');
    expect(username).toBeInTheDocument();

    const admin = screen.queryByText('Privileges: Admin');
    expect(admin).toBeNull();

    const notAdmin = screen.queryByText('Privileges: User');
    expect(notAdmin).toBeInTheDocument();
  });

  it('should render the user with an admin', () => {
    renderWithProviders(<User user={{ ...user, admin: true }} />);

    const admin = screen.getByText('Privileges: Admin');
    expect(admin).toBeInTheDocument();

    const notAdmin = screen.queryByText('Privileges: User');
    expect(notAdmin).toBeNull();
  });

  it('should have a more button if callback onMore is provided is oneOfMany', () => {
    const onMore = jest.fn();
    renderWithProviders(<User user={user} onMore={onMore} oneOfMany />);

    const more = screen.getByLabelText('Read more');
    expect(more).toBeInTheDocument();
  });

  it('should show id, createdAt, updatedAt, Blogs and Readings, if oneOfMany is false', () => {
    renderWithProviders(<User user={user} oneOfMany={false} />);

    const id = screen.getByText('Id: 1');
    expect(id).toBeInTheDocument();

    const createdAt = screen.getByText(`Created: ${dateToString(user.createdAt)}`);
    expect(createdAt).toBeInTheDocument();

    const updatedAt = screen.getByText(`Updated: ${dateToString(user.updatedAt)}`);
    expect(updatedAt).toBeInTheDocument();

    const blogs = screen.getByText('Blogs: none');
    expect(blogs).toBeInTheDocument();

    const readings = screen.getByText('Readings: none');
    expect(readings).toBeInTheDocument();
  });
});
