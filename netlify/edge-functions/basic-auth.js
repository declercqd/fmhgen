// Edge function disabled — using Netlify Identity instead
export default async function handler(req, context) {
  return context.next();
}
export const config = { path: "/__disabled__" };
