import React from "react";
import useLoading from "hooks/useLoading";
import { BounceLoader } from "react-spinners";

// 📍 로딩 화면 생성
function LoadingOverlay () {
    const { isLoading } = useLoading()
    if (!isLoading) return null

    return (
        <div style={styles.overlay}>
            <BounceLoader color="rgba(150, 152, 163, 0.5)" />
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
      backdropFilter: 'blur(10px)',
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      // backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }
};

export default LoadingOverlay