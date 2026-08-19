import type { ThemeConfig } from "antd";

export const BRAND = {
  red: "#D7263D",
  redDark: "#A81B2E",
  redSoft: "#FBE7E9",
  cream: "#FDF8F0",
  creamDeep: "#F6EEE1",
  charcoal: "#1F1D1B",
  gray: "#6E6963",
  white: "#FFFFFF",
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: BRAND.red,
    colorLink: BRAND.red,
    colorInfo: BRAND.red,
    colorTextBase: BRAND.charcoal,
    colorBgBase: BRAND.white,
    colorBgLayout: BRAND.cream,
    colorBorder: "#EADFCF",
    colorBorderSecondary: "#F0E7DA",
    borderRadius: 12,
    borderRadiusLG: 16,
    fontFamily:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontSize: 15,
    controlHeight: 40,
    boxShadowSecondary: "0 8px 30px rgba(31, 29, 27, 0.08)",
  },
  components: {
    Button: {
      fontWeight: 600,
      primaryShadow: "0 6px 18px rgba(215, 38, 61, 0.24)",
    },
    Card: {
      headerFontSize: 17,
    },
    Layout: {
      headerBg: BRAND.white,
      bodyBg: BRAND.cream,
      footerBg: BRAND.charcoal,
      siderBg: BRAND.white,
    },
    Menu: {
      itemSelectedBg: BRAND.redSoft,
      itemSelectedColor: BRAND.red,
      itemBorderRadius: 10,
    },
    Rate: {
      starColor: BRAND.red,
    },
    Statistic: {
      titleFontSize: 14,
    },
  },
};
