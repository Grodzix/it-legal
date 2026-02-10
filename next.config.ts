import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
// NOTE: disabled for local dev on Windows - spawns orphaned workerd.exe console window
// Uncomment if you need Cloudflare APIs (D1, KV, R2) in dev mode:
// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// initOpenNextCloudflareForDev();
