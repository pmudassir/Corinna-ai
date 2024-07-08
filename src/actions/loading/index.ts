"use server"

import axios from "axios";

export const onGetBlogPosts = async () => {
  try {
    const postArray:
      | {
        title: string;
        images: string;
        content: string;
        createdAt: Date;
      }[] = []

    const postUrl = process.env.CLOUDWAYS_POSTS_URL
    if (!postUrl) return
    const posts = await axios.get(postUrl)
  } catch (error) {

  }
}