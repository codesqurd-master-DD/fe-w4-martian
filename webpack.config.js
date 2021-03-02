import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const __dirname = path.resolve();

export default {
  mode: "development",
  devtool: "source-map",
  entry: ["./src/js/main.js"],
  watch: true,
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
