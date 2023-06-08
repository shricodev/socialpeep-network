import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { WidgetWrapperProps } from "interfaces/WidgetWrapperProps";

const WidgetWrapper = styled((props: WidgetWrapperProps) => <Box {...props} />)(
  ({ alt }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: alt,
    borderRadius: "0.75rem",
  })
);

export default WidgetWrapper;
