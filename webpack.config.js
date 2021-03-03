import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
const __dirname = path.resolve();

export default {
  mode: "development",
  devtool: "source-map",
  entry: ["./src/js/main.js"],
  watch: true,
  devServer: {
    hot: true,
  },

  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebPackPlugin({
      template: "./dist/index.html",
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g)$/,
        loader: "url-loader",
        options: {
          limit: 8000,
          name: "images/[hash]-[name].[ext]",
        },
      },

    ],
  },
};
