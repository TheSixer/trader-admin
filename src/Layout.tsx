import {
  Layout as RALayout,
  LayoutProps,
} from "react-admin";
import { Menu } from './Menu';

export const Layout = (props: LayoutProps) => (
  <RALayout {...props} menu={Menu} />
);
