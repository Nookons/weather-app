import React from 'react';

const Skeleton = ({ height = 60 }: { height?: number }) => {
    return (
        <div
            style={{ height }}
            className="w-full block z-50 bg-gray-100 opacity-10 animate-pulse rounded"
        ></div>
    );
};

export default Skeleton;
