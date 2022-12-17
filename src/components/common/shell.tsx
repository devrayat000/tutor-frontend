import { AppShell } from "@mantine/core";
import CustomHeader from "./header";
import CustomFooter from "./footer";

type Props = {
  children?: React.ReactNode;
};

const Shell = (props: Props) => {
  return (
    <AppShell header={<CustomHeader />} footer={<CustomFooter />}>
      {props.children}
    </AppShell>
  );
};

export default Shell;
