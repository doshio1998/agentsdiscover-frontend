// src/lib/AntdRegistry.tsx
//
// AntD theming. Per design-system MASTER.md, we use AntD ONLY for niche
// interactive primitives (Drawer, Modal, DatePicker, Tooltip, Notification,
// Upload, Tour). All those components inherit theme tokens from this provider,
// so when (and only when) we drop one in, it carries the AgentsDiscover
// brand instead of AntD's default blue.
'use client';

import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, App } from 'antd';
import 'antd/dist/reset.css';

export default function AntdRegistry({ children }: { children: React.ReactNode }) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#D32323',           // Yelp-red brand
            colorPrimaryHover: '#AF1F1F',
            colorLink: '#0073BB',
            colorLinkHover: '#0073BB',
            colorText: '#0F1111',
            colorTextSecondary: '#595959',
            colorBorder: '#E5E5E5',
            colorBgContainer: '#FFFFFF',
            colorBgElevated: '#FFFFFF',
            colorError: '#D32323',
            colorSuccess: '#16A34A',
            colorWarning: '#D97706',
            borderRadius: 8,
            borderRadiusLG: 12,
            borderRadiusSM: 4,
            fontFamily: 'var(--font-sans), Inter, system-ui, sans-serif',
            fontSize: 15,
          },
          components: {
            Drawer: { paddingLG: 24 },
            Modal: { borderRadiusLG: 12 },
          },
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </StyleProvider>
  );
}
