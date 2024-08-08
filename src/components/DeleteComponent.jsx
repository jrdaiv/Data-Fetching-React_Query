import React from 'react';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';


const deletePost = async (postId) => {
    const {data} = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return data;
}
const DeleteComponent = ({ postId, onDeleteSuccess }) => {
    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            alert('Post deleted successfully');
            onDeleteSuccess(postId);
        }
    });



    const handleDelete = (event) => {
        event.preventDefault();
        mutation.mutate();
    }

  return (
    <div>
        <button className='delete-btn' onClick={handleDelete} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Deleting...' : 'Delete Post'}
        </button>
    </div>
  )
}

export default DeleteComponent