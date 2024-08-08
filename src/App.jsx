import React from 'react'
import  {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import PostComponent from './components/PostComponent';
import GetComponent from './components/GetComponent';
import UpdateComponent from './components/UpdateComponent';
import DeleteComponent from './components/DeleteComponent';
import './App.css'



function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PostComponent/>
        <GetComponent/>
        <UpdateComponent/>
        <DeleteComponent/>
      </QueryClientProvider>
      
    </>
  )
}

export default App
