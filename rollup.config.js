import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "pack-to-ui",
  },
  external: [
    "react", 
    "react-dom", 
    "@ckeditor/ckeditor5-react",
    "@ckeditor/ckeditor5-build-classic",
    "axios", 
    "ClassicEditor", 
    "react-select", 
    "react-loading", 
    "react-hook-form", 
    "react-icons",
  ],
  plugins: [typescript({ tsconfig: "tsconfig.json" })],
});