import { rootsSvg, rootVariants, type RootVariant } from "@/lib/kintsugiRoots";

// Each root artwork is rendered once at build time and served as a static file.
export const dynamicParams = false;

export function generateStaticParams() {
  return rootVariants.map((variant) => ({ variant: `${variant}.svg` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  return new Response(rootsSvg(variant.replace(/\.svg$/, "") as RootVariant), {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
