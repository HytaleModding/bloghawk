import { getBlogPostURL, type BlogPost } from "./blog";
import { configToml } from "./config";

export async function publishBlogPost(blogPost: BlogPost) {
    const response = await fetch(configToml.webhook, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: `<@&${configToml.newsRole}> [**New blog post!**](${getBlogPostURL(blogPost)})`,
            allowed_mentions: {
                roles: [configToml.newsRole]
            }
        }),
        method: "POST"
    });

    if (!response.ok) {
        console.error(`An error occurred publishing a new blog post.`, blogPost);
        console.error(await response.text());
    }
}