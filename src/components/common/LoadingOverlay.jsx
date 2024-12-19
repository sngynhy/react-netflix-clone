import React from "react";
import useLoading from "hooks/useLoading";
import { FadeLoader } from "react-spinners";

// 📍 로딩 화면 생성
function LoadingOverlay () {
    const { isFetching } = useLoading()
    if (!isFetching) return null

    return (
        <div style={styles.overlay}>
            <FadeLoader color="white" />
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
    //   backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }
};

export default LoadingOverlay