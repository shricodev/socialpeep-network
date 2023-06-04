import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// to follow the baseUrl pattern I have set in the tsconfig.json file - https://stackoverflow.com/a/68250175
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ["react-loader-spinner"],
  },
});
