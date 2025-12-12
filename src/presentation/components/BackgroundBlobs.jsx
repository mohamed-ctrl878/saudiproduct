import React from 'react';

const BackgroundBlobs = () => {
    return (
        <div className="blob-container">
            <div className="blob" style={{
                top: '-10%',
                left: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'var(--blob-1)',
                animationDelay: '0s'
            }}></div>
            <div className="blob" style={{
                top: '40%',
                right: '-20%',
                width: '60vw',
                height: '60vw',
                background: 'var(--blob-2)',
                animationDelay: '4s'
            }}></div>
            <div className="blob" style={{
                bottom: '-20%',
                left: '20%',
                width: '40vw',
                height: '40vw',
                background: 'var(--blob-3)',
                animationDelay: '8s'
            }}></div>
        </div>
    );
};

export default BackgroundBlobs;
