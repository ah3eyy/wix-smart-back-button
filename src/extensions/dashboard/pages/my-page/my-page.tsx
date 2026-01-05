import type { FC } from 'react';
import {  Page, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const DashboardPage: FC = () => {

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Smart Back Button Demo"
          subtitle="Context-aware navigation that returns users to meaningful previous pages"
        />
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;
