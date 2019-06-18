import React from 'react';
import Link from 'next/link'; // 라우팅

const Home = () => {
    return (
        <>
            <Link href="/about"><a>about</a></Link>
            <div>Hello next</div>
        </>
    );
};

export default Home;