import React from 'react'
import { poweredByLogo } from '../Images/base64Images';

const pdfUrl = "https://pg-egov-assets.s3.ap-south-1.amazonaws.com/Upyog+Code+and+Copyright+License_v1.pdf";

const Footer = () => {
    return (
        <div style={{ width: '100%', bottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: "#22394d" }}>
                <div onClick={() => {
                    window.open('https://niua.in/cdg/UPYOG', '_blank').focus();
                }}>
                    Powered By
                    <span style={{ margin: "0 10px" }}>UPYOG</span>
                    <img style={{ cursor: "pointer", display: "inline-flex", height: '1.4em' }} alt={"UPYOG"} src={poweredByLogo} />
                </div>
                <span style={{ margin: "0 10px" }}>|</span>
                <span style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400" }} onClick={() => { window.open('https://niua.in/', '_blank').focus(); }}>2023©Ksmart</span>
                <span style={{ margin: "0 10px" }}>|</span>
                <a style={{ cursor: "pointer", fontSize: "16px", fontWeight: "400" }} href={pdfUrl} target='_blank'>UPYOG License</a>
            </div>
        </div>
    )
}

export default Footer