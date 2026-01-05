import { extensions } from '@wix/astro/builders';

export default extensions.customElement({
  id: 'e57d389c-41f5-443f-9e72-489efd253b7e',
  name: 'SmartBack Button',
  width: {
    defaultWidth: 150,
    allowStretch: true
  },
  height: {
    defaultHeight: 40
  },
  installation: {
    autoAdd: true
  },
  presets: [
    {
      id: '0f41510e-a39c-4b97-94b3-65df62e686a0',
      name: 'Smart Back Button',
      thumbnailUrl: '{{BASE_URL}}/smart-back-button-thumbnail.png',
    },
  ],
  
  tagName: 'smart-back-button',
  element: './extensions/site/widgets/smart-back-button/smart-back-button.tsx',
  settings: './extensions/site/widgets/smart-back-button/smart-back-button.panel.tsx',
});
