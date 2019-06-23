import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
    isLoggedIn: true,
    imagePath: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: '조니',
        },
        content: '첫번째 게시글',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q'
    }]
};

const Home = () => {
    return (
        <div>
            {dummy.isLoggedIn && <PostForm />}
            {dummy.mainPosts.map((c) => {
                return (
                    <PostCard key={c} post={c} />
                )
            })}
        </div>
    );
};

export default Home;