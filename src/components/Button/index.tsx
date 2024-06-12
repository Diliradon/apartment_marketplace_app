import './index.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classNames?: string;
  title?: string;
}

export const Button: React.FC<Props> = ({
  classNames = '',
  title,
  ...rest
}) => {
  return (
    <button className={`button ${classNames}`} {...rest}>
      {title}
    </button>
  );
};
