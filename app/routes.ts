import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/generator", "routes/generator.tsx", [
    index("routes/generator._index.tsx"),
    route(":step", "routes/generator.$step.tsx"),
    route("sheet", "routes/generator.sheet.tsx"),
  ]),
] satisfies RouteConfig;
