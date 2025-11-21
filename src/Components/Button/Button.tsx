import styles from "./Button.module.css";
interface props {
  children: string;
  color: string;
  // onClick: () => void;
}

const Button = ({ children, color }: props) => {
  return <button className={"btn btn-" + color}>{children}</button>;
};

export default Button;
