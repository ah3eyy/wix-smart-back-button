import { app } from '@wix/astro/builders';
import myPage from './extensions/dashboard/pages/my-page/my-page.extension.ts';

import smartBackButton from './extensions/site/widgets/smart-back-button/smart-back-button.extension.ts';

export default app()
  .use(myPage).use(smartBackButton);
