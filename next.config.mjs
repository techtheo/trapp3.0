/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fabulous-barracuda-271.convex.cloud",
			  },
			  {
				protocol: "https",
				hostname: "oaidalleapiprodscus.blob.core.windows.net",
			  },
		],
	},
};

export default nextConfig;
