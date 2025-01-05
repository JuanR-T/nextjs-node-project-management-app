/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:
                    "project-management-mind-hive-s3-images.s3.eu-west-3.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};
