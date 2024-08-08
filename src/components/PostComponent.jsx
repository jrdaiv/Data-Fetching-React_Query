import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const PostComponent = () => {
    const [title, setTitle] = useState('');
    const [id, setId] = useState(1);
    const [body, setBody] = useState('');
    const [post, setPost] = useState(null);

    const createPost = async () => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify({
                id: id,
                title: title,
                body: body,
                userId: 1
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        return response.data;
    }

    const {mutate} = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            setPost(data);
            alert(`Post created with ID: ${data.id}`);
        }
    })

    const handleSumbit = (event) => {
        event.preventDefault();
        mutate();
    }


  return (
    <div>
        <h1 className='title-title'>Create Post</h1>
        <form className='create-post' onSubmit={handleSumbit}>
            <input className='title' type="text" autoComplete='off' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className='title' placeholder="Body" autoComplete='off' value={body} onChange={(e) => setBody(e.target.value)} />
            <button className='submit-btn' type="submit">Create Post</button>
        </form>
        {post && (
            <div>
                <ul>
                    <li className='post-title'>
                        <h2 >{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                </ul>
            </div>
        )}
    </div>
  )
}

export default PostComponent