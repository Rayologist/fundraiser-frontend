import { AppShell, AppShellHeader, AppShellMain, Paper } from '@mantine/core';
import { Footer } from '../Footer/Footer';
import { LeftSection } from '../Header/LeftSection/LeftSection';
import { RightSection } from '../Header/RightSection/RightSection';
import classes from './AppShell.module.css';

export function Layout(props: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 80 }}>
      <AppShellHeader
        pr="xl"
        pl="md"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <LeftSection />
        <RightSection />
      </AppShellHeader>

      <AppShellMain className={classes.main}>
        <Paper className={classes.content}>{props.children}</Paper>
      </AppShellMain>
      <Footer />
    </AppShell>
  );
}
