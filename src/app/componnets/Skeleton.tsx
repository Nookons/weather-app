import React from 'react';

const Skeleton = ({height}: {height: number}) => {
    return (
        <div className={`w-full h-${height || 60} bg-gray-100 my-2 opacity-10 animate-pulse rounded`}></div>
    );
};

export default Skeleton;