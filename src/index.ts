import { fetchBlogPosts } from "./blog";
import { configToml } from "./config";
import { publishBlogPost } from "./discord";

console.log("Keeping an eye.");
let lastBlogPostDate = new Date((await fetchBlogPosts())[0]!.createdAt);

setInterval(async () => {
    const blogPost = (await fetchBlogPosts())[0]!;
    const createdAtDate = new Date(blogPost.createdAt);

    if (createdAtDate.getTime() > lastBlogPostDate.getTime()) {
        lastBlogPostDate = createdAtDate;
        await publishBlogPost(blogPost);
    }
}, configToml.interval * 1000);