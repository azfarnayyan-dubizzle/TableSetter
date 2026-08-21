import type { ThemeConfig } from "antd";

export const BRAND = {
  red: "#D7263D",
  redDark: "#A81B2E",
  redDeep: "#7E1222",
  redSoft: "#FCEBEC",
  redTint: "rgba(215, 38, 61, 0.10)",
  redTintStrong: "rgba(215, 38, 61, 0.16)",
  amber: "#C98A2B",
  cream: "#FAF4EA",
  creamDeep: "#F5EDE0",
  creamDarker: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceAlt: "#FFFCF7",
  charcoal: "#1A1817",
  gray: "#6B655F",
  grayLight: "#96908A",
  white: "#FFFFFF",
  border: "rgba(26, 24, 23, 0.07)",
  borderStrong: "rgba(26, 24, 23, 0.12)",
  shadowSm: "0 1px 2px rgba(26,24,23,0.04), 0 6px 16px rgba(140,20,38,0.05)",
  shadowMd: "0 2px 8px rgba(26,24,23,0.05), 0 18px 40px rgba(140,20,38,0.09)",
  shadowLg: "0 10px 24px rgba(26,24,23,0.08), 0 40px 80px rgba(140,20,38,0.16)",
  gradientPrimary: "linear-gradient(135deg, #E8384F 0%, #B81E33 55%, #8E1626 100%)",
  gradientInk: "linear-gradient(135deg, #1A1817 0%, #2E1A1D 55%, #3A1A20 100%)",
  gradientCream: "linear-gradient(180deg, #FFFFFF 0%, #FDF7EE 100%)",
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
    colorBgElevated: BRAND.white,
    colorBorder: BRAND.borderStrong,
    colorBorderSecondary: BRAND.border,
    borderRadius: 12,
    borderRadiusLG: 18,
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
      headerBg: "rgba(255, 255, 255, 0.72)",
      bodyBg: BRAND.cream,
      footerBg: BRAND.charcoal,
      siderBg: BRAND.white,
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
      headerBg: BRAND.surfaceAlt,
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
