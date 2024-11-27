import React from "react";
import useLoading from "hooks/useLoading";

// 📍 로딩 화면 생성
function LoadingOverlay () {
    const { isLoading } = useLoading()
    // if (!isLoading) return null

    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}>Loading...</div>
        </div>
    )
}

const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    },
    spinner: {
      color: "#fff",
      fontSize: "24px",
      fontWeight: "bold",
    },
};

export default LoadingOverlay