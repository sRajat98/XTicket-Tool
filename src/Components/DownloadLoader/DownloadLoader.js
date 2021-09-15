import React from 'react';
import './DownloadLoader.scss';

export const DownloadLoader = () => {
    return (
        <>
            <div className="loaderContainer">
                <div className="loaderIcon spinner-border spinner-color" role="status" />
                <div className="loadertext">Downloading...</div>
            </div>
        </>
    )
}
