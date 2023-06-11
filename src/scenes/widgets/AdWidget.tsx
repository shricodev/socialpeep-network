import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const alt = palette.background.alt;

  return (
    <WidgetWrapper alt={alt}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advertisement"
        src="/assets/advertise.webp"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Coca Cola</Typography>
        <Typography color={medium}>cocacola.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Have a break, Have a CocaCola
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
