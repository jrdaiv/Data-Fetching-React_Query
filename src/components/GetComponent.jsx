import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const GetComponent = () => {
    const fetchdata = async () => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            return response.data;
        }catch(error){
            console.log(error);
        }
    }

    const { data: fetchingData, refetch, isLoading, isError, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchdata,
        enabled: false,
        retry: 3,
    })

    const handleSubmit = () => {
        refetch();
    };

    // const handleDeleteSuccess = (deletePostId) => {
    //     refetch();
    // }

    if (isLoading) return <h3>Loading...</h3>
    if (isError) return <h3>{error.message}</h3>

  return (
    <div>
        <h1 className='fetch-title'>Get Component</h1>
        <button className='fetch-btn' onClick={handleSubmit}>Fetch Posts</button>
        {fetchingData?.map((post) => (
            <div key={post.id}>
                <h3 className='title'>{post.title}</h3>
                <p className='body-post'>{post.body}</p>
                
            </div>
        ))}
    </div>
  );
};

export default GetComponent