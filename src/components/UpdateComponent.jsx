import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const updatePost = async (updatedPost) => {
    const { id, ...rest } = updatedPost;
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, rest, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
    return data;
};

const UpdateComponent = () => {
    const [updatedPost, setUpdatedPost] = useState({ id: '', title: '', body: '' });
    const mutation = useMutation({ mutationFn: updatePost });    
    console.log(mutation);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(updatedPost);
    };

    return (
        <div>
            <h1 className='update-title'>Update Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className='update-input' type="text" name="id" placeholder='ID' value={updatedPost.id} onChange={handleChange} required />
                </div>
                <div>
                    <input className='update-input' type="text" name="title" placeholder='Title' value={updatedPost.title} onChange={handleChange} required />
                </div>
                <div>
                    <input className='update-input' type="text" name="body" placeholder='Body' value={updatedPost.body} onChange={handleChange} required />
                </div>
                <button className='update-button' type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
            {mutation.isError && <p style={{ color: 'red' }}>Error: {mutation.error.message}</p>}
            {mutation.isSuccess && <p style={{ color: 'white' }}>Success! Post updated: {JSON.stringify(mutation.data)}</p>}
        </div>
    );
};

export default UpdateComponent;