import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { Article } from "types/Article";

const NewsWidget = ({ articles }: { articles: Article[] }) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const alt = palette.background.alt;

  return (
    <>
      <WidgetWrapper alt={alt}>
        <FlexBetween mb="0.8rem">
          <Typography color={dark} variant="h5" fontWeight="500">
            Top Tech News for Today!
          </Typography>
          <a
            href="https://www.bing.com/news/search?q=Sci%2fTech"
            target="_blank"
          >
            <Typography
              onClick={() => {
                navigate("/news/today");
              }}
              color={medium}
              sx={{ cursor: "pointer" }}
            >
              View More
            </Typography>
          </a>
        </FlexBetween>
        {articles.map((article, index) => (
          <>
            <a href={article.url}>
              <img
                width="100%"
                height="100%"
                alt="advertisement"
                src={article.urlToImage}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
              />
              <FlexBetween>
                <Typography color={main}>{article.title}</Typography>
              </FlexBetween>
              <Typography
                color={medium}
                m="0.5rem 0"
                sx={{
                  width: "355px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {article.description}
              </Typography>
            </a>
            <Box m="1rem 2rem 0 0" />
            {index !== 1 && <Divider />}
          </>
        ))}
      </WidgetWrapper>
    </>
  );
};

export default NewsWidget;
