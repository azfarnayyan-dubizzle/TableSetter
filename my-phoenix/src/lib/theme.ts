import type { ThemeConfig } from "antd";

export const BRAND = {
  red: "#D7263D",
  redDark: "#A81B2E",
  redDeep: "#8E1626",
  redSoft: "#FBE7E9",
  redTint: "rgba(215, 38, 61, 0.10)",
  redTintStrong: "rgba(215, 38, 61, 0.16)",
  cream: "#F6EEE1",
  creamDeep: "#F6EEE1",
  creamDarker: "#F2E8D8",
  surface: "#F6EEE1",
  surfaceAlt: "#F6EEE1",
  charcoal: "#1F1D1B",
  gray: "#6E6963",
  grayLight: "#96908A",
  white: "#FFFFFF",
  border: "rgba(31, 29, 27, 0.08)",
  borderStrong: "rgba(31, 29, 27, 0.14)",
  shadowSm: "0 1px 2px rgba(31, 29, 27, 0.04), 0 4px 14px rgba(168, 27, 46, 0.06)",
  shadowMd: "0 2px 6px rgba(31, 29, 27, 0.05), 0 14px 32px rgba(168, 27, 46, 0.10)",
  shadowLg: "0 8px 20px rgba(31, 29, 27, 0.08), 0 32px 64px rgba(168, 27, 46, 0.16)",
  gradientPrimary: "linear-gradient(135deg, #E0304A 0%, #B81E33 100%)",
} as const;

export const FONT_DISPLAY = "'Fraunces', 'Iowan Old Style', Georgia, serif";
export const FONT_BODY =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export const TYPE = {
  hero: "clamp(40px, 6vw, 60px)",
  pageTitle: "clamp(28px, 4vw, 36px)",
  section: 23,
  cardTitle: 17,
  body: 16,
  meta: 13,
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: BRAND.red,
    colorLink: BRAND.red,
    colorLinkHover: BRAND.redDark,
    colorInfo: BRAND.red,
    colorTextBase: BRAND.charcoal,
    colorTextSecondary: BRAND.gray,
    colorBgBase: BRAND.white,
    colorBgLayout: BRAND.cream,
    colorBgContainer: BRAND.surface,
    colorBorder: BRAND.borderStrong,
    colorBorderSecondary: BRAND.border,
    borderRadius: 12,
    borderRadiusLG: 16,
    fontFamily: FONT_BODY,
    fontSize: 15,
    lineHeight: 1.6,
    controlHeight: 42,
    boxShadow: BRAND.shadowSm,
    boxShadowSecondary: BRAND.shadowMd,
    motionDurationMid: "0.18s",
  },
  components: {
    Button: {
      fontWeight: 600,
      paddingInline: 20,
      paddingInlineLG: 28,
      controlHeightLG: 48,
      primaryShadow: "0 6px 18px rgba(215, 38, 61, 0.22)",
      defaultShadow: "none",
      defaultBorderColor: "rgba(215, 38, 61, 0.35)",
      defaultColor: BRAND.red,
      defaultHoverBorderColor: BRAND.red,
      defaultHoverColor: BRAND.redDark,
      defaultHoverBg: BRAND.redSoft,
      borderRadius: 12,
    },
    Card: {
      headerFontSize: TYPE.cardTitle,
      borderRadiusLG: 18,
      colorBorderSecondary: BRAND.border,
      boxShadowTertiary: BRAND.shadowSm,
      paddingLG: 24,
    },
    Layout: {
      headerBg: "rgba(253, 248, 240, 0.88)",
      bodyBg: BRAND.cream,
      footerBg: BRAND.charcoal,
      siderBg: BRAND.creamDeep,
    },
    Menu: {
      itemSelectedBg: BRAND.redTint,
      itemSelectedColor: BRAND.red,
      itemHoverBg: "rgba(215, 38, 61, 0.06)",
      itemBorderRadius: 10,
      itemHeight: 42,
      fontSize: 15,
    },
    Rate: {
      starColor: BRAND.red,
      starSize: 16,
    },
    Input: {
      colorBgContainer: BRAND.surfaceAlt,
      activeBorderColor: BRAND.red,
      hoverBorderColor: "rgba(215, 38, 61, 0.45)",
      activeShadow: "0 0 0 3px rgba(215, 38, 61, 0.14)",
      borderRadius: 12,
    },
    InputNumber: {
      colorBgContainer: BRAND.surfaceAlt,
      activeBorderColor: BRAND.red,
      activeShadow: "0 0 0 3px rgba(215, 38, 61, 0.14)",
    },
    Select: {
      colorBgContainer: BRAND.surfaceAlt,
      optionSelectedBg: BRAND.redTint,
      optionSelectedColor: BRAND.red,
      borderRadius: 12,
    },
    DatePicker: {
      colorBgContainer: BRAND.surfaceAlt,
      activeBorderColor: BRAND.red,
    },
    Modal: {
      borderRadiusLG: 20,
      boxShadow: BRAND.shadowLg,
      titleFontSize: 20,
    },
    Drawer: {
      boxShadow: BRAND.shadowLg,
    },
    Statistic: {
      titleFontSize: TYPE.meta,
      contentFontSize: 30,
    },
    Tag: {
      borderRadiusSM: 999,
    },
    Alert: {
      borderRadiusLG: 14,
    },
    Switch: {
      colorPrimary: BRAND.red,
      colorPrimaryHover: BRAND.redDark,
    },
    Table: {
      headerBg: BRAND.creamDeep,
      headerColor: BRAND.gray,
      borderColor: BRAND.border,
    },
    Slider: {
      trackBg: BRAND.red,
      trackHoverBg: BRAND.redDark,
      handleColor: BRAND.red,
      dotActiveBorderColor: BRAND.red,
    },
    Pagination: {
      itemActiveBg: BRAND.redSoft,
      colorPrimary: BRAND.red,
    },
    Typography: {
      titleMarginBottom: "0.5em",
    },
  },
};
