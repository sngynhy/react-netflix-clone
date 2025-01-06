import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchModal = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('personId')
    // console.log('SearchModal', id)
    
    const navigate = useNavigate()

    const closeModal = () => navigate(-1) // 이전 위치로 돌아가기

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h2>Modal Content</h2>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}

const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
};
