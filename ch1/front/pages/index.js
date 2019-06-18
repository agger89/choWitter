import React from 'react';
import Link from 'next/link'; // 라우팅
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
    return (
        <>
            <Head>
                <title>choWitter</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout>
                <Link href="/about"><a>about</a></Link>
                <div>hello next</div>
            </AppLayout>
        </>
    );
};

export default Home;