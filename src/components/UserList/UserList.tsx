import { UserAttributes } from '../../types/user.type';
import Grid from '../Grid/Grid';
import InternalLink from '../Link/InternalLink';
import User, { UserCallbacks } from '../User/User';

interface Props extends UserCallbacks {
  data: UserAttributes[];
}

const UserList = ({ data, onSave, onDelete }: Props) => {
  return (
    data && (
      <Grid>
        {data.map((user) => (
          <Grid.Item key={user.id}>
            <User user={user} onSave={onSave} onDelete={onDelete}>
              <div>
                <InternalLink to={`/users/${user.id}`}>Read more</InternalLink>
              </div>
            </User>
          </Grid.Item>
        ))}
      </Grid>
    )
  );
};

export default UserList;
