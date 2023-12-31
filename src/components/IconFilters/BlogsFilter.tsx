import IconButton from '../IconButton/IconButton';
import IconFilter, { IconFilterProps } from './IconFilter';

type FilterProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<IconFilterProps, 'label'> & {
    showMyBlogsOnly: boolean;
    toggle: () => void;
  };

const BlogsFilter = ({ showMyBlogsOnly, toggle, ...props }: FilterProps) => {
  return (
    <>
      <IconFilter {...props}>
        <IconButton
          iconProps={{ icon: 'person' }}
          onClick={() => toggle()}
          label={showMyBlogsOnly ? 'Show all blogs' : 'Show my blogs'}
          tooltipId={`blogs-filter`}
          inverted={showMyBlogsOnly}
        />
      </IconFilter>
    </>
  );
};

export default BlogsFilter;
