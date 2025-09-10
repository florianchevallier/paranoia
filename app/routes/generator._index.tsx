import { redirect } from "react-router";

export async function loader() {
  return redirect("/generator/1");
}

export default function GeneratorIndex() {
  return null;
}
