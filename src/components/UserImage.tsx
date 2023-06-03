import { Box } from "@mui/material";

// profile image
const UserImage = ({
  image,
  size = "60px",
}: {
  image: string;
  size?: string;
}) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="User"
        src={`${import.meta.env.VITE_APPWRITE_API}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
