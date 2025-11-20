const blogURL = "https://hytale.com/api/blog/post/published";
const cdnURL = "https://cdn.hytale.com"

export async function fetchBlogPosts(): Promise<BlogPost[]> {
    const response = await fetch(blogURL);
    return await response.json() as BlogPost[];
}

export function getBlogPostURL({ publishedAt: rawPublishedAt, slug }: BlogPost): string {
    const publishedAt = new Date(rawPublishedAt);
    return `https://hytale.com/news/${publishedAt.getUTCFullYear()}/${publishedAt.getUTCMonth()}/${slug}`;
}

export function getBlogPostCoverURL({ coverImage }: BlogPost, variant: ImageVariant): string {
    return `${cdnURL}/variants/${variant}_${coverImage.s3Key}`;
}

export type BlogPost = {
    featured: boolean;
    tags: string[];
    _id: string;
    author: string;
    title: string;
    publishedAt: string;
    coverImage: CoverImage;
    createdAt: string;
    slug: string;
    bodyExcerpt: string;
}

export type ImageVariant = "blog_thumb" | "blog_cover";

export type CoverImage = {
    variants: ImageVariant[];
    _id: string;
    s3Key: string;
    mimeType: string;
    attached: boolean;
    createdAt: string;
    __v: number;
    contentId: string | null;
    contentType: string | null;
}