import React, { type FC, useState, useEffect, useCallback } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
  SectionHelper,
  Dropdown,
  Box,
  Text,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const SITE_WIDGETS_DOCS = 'https://dev.wix.com/docs/wix-cli/guides/extensions/site-extensions/site-widgets/site-widget-extension-files-and-code';

const Panel: FC = () => {
  const [fallbackUrl, setFallbackUrl] = useState<string>('/');
  const [buttonLabel, setButtonLabel] = useState<string>('');
  const [buttonSize, setButtonSize] = useState<string>('medium');
  const [buttonPriority, setButtonPriority] = useState<string>('secondary');

  useEffect(() => {
    // Load existing props
    Promise.all([
      widget.getProp('fallback-url'),
      widget.getProp('button-label'),
      widget.getProp('button-size'),
      widget.getProp('button-priority'),
    ])
      .then(([fallback, label, size, priority]) => {
        setFallbackUrl(fallback || '/');
        setButtonLabel(label || '');
        setButtonSize(size || 'medium');
        setButtonPriority(priority || 'secondary');
      })
      .catch(error => console.error('Failed to fetch props:', error));
  }, []);

  const handleFallbackUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFallbackUrl(newValue);
    widget.setProp('fallback-url', newValue);
  }, []);

  const handleButtonLabelChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setButtonLabel(newValue);
    widget.setProp('button-label', newValue);
  }, []);

  const handleButtonSizeChange = useCallback((option: { id: string; value: string }) => {
    setButtonSize(option.id);
    widget.setProp('button-size', option.id);
  }, []);

  const handleButtonPriorityChange = useCallback((option: { id: string; value: string }) => {
    setButtonPriority(option.id);
    widget.setProp('button-priority', option.id);
  }, []);

  const sizeOptions = [
    { id: 'small', value: 'Small' },
    { id: 'medium', value: 'Medium' },
    { id: 'large', value: 'Large' },
  ];

  const priorityOptions = [
    { id: 'primary', value: 'Primary' },
    { id: 'secondary', value: 'Secondary' },
    { id: 'basic', value: 'Basic' },
  ];

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300" height="100vh">
        <SidePanel.Content noPadding stretchVertically>
          <Box padding="SP4" direction="vertical" gap="SP4">
            <Text size="medium" weight="bold">Smart Back Button Settings</Text>
            <SectionHelper appearance="standard" fullWidth>
              <Text size="small">
                The Smart Back Button automatically tracks navigation and intelligently returns users to meaningful previous pages (e.g., from product pages back to categories).
              </Text>
            </SectionHelper>
          </Box>
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;
