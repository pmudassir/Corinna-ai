"use server"

import axios from "axios";

export const onGetBlogPosts = async () => {
  try {
    const postArray: {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[] = []

    const postUrl = process.env.CLOUDWAYS_POSTS_URL
    if (!postUrl) return
    const posts = await axios.get(postUrl)

    const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL
    if (!featuredImages) return

    let i = 0
    while (i < posts.data.length) {
      const image = await axios.get(`${featuredImages}/${posts.data[i].featured_media}`)
      if (image) {
        // we push a post object to the array
        const post: {
          id: string;
          title: string;
          image: string;
          content: string;
          createdAt: Date;
        } = {
          id: posts.data[i].id,
          title: posts.data[i].title.rendered,
          image: image.data.media_details.file,
          content: posts.data[i].content.rendered,
          createdAt: new Date(posts.data[i].date),
        }

        postArray.push(post)
      }
      i++
    }

    if (posts.data) return postArray
  } catch (error) {
    console.log(error);
  }
}

export const onGetBlogPost = async (id: string) => {
  try {
    const post = await axios.get(`${process.env.CLOUDWAYS_POSTS_URL}/${id}`)
    if (post.data) {
      const author = await axios.get(`${process.env.CLOUDWAYS_USERS_URL}${post.data.author}`)
      if (author.data) {
        return {
          id: post.data.id,
          title: post.data.title.rendered,
          content: post.data.content.rendered,
          createdAt: new Date(post.data.date),
          author: author.data.name
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}