import { Box, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResult } from "types/SearchResult";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

const SearchResultWidget = ({
  searchResult,
}: {
  searchResult: SearchResult[];
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const alt = palette.background.alt;

  useEffect(() => {
    // just to give a shuttle feel of loading
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {loading ? (
        <WidgetWrapper alt={alt}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height={35}
          />
          <Skeleton
            animation="pulse"
            variant="rectangular"
            width={150}
            height={35}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={150}
            height={35}
          />
        </WidgetWrapper>
      ) : (
        <WidgetWrapper alt={alt}>
          {searchResult.map(({ firstName, lastName, location, userId }) => (
            <FlexBetween>
              <FlexBetween gap="1rem">
                <UserImage imageUrl={"/assets/profileHead.webp"} size="55px" />
                <Box
                  onClick={() => {
                    navigate(`/profile/${userId}`);
                    // to refresh the component. not a very ideal way
                    navigate(0);
                  }}
                >
                  <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        opacity: 0.8,
                        transition: "150ms all ease-out",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {firstName} {lastName}
                  </Typography>
                  <Typography color={medium} fontSize="0.75rem">
                    {location}
                  </Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>
          ))}
        </WidgetWrapper>
      )}
    </>
  );
};

export default SearchResultWidget;
