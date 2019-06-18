import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Signup = () => {
    return (
        <>
            <Head>
                <title>choWitter</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout>
                <div>signup</div>
            </AppLayout>
        </>
    );
};

export default Signup;