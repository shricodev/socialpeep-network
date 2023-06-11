import { Box } from "@mui/material";

// profile image
const UserImage = ({
  imageUrl,
  size = "60px",
}: {
  imageUrl: string;
  size?: string;
}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="User"
        src="/assets/profileHead.webp"
      />
    </Box>
  );
};

export default UserImage;
