import {Bounce, ToastContainer} from "react-toastify";
import React from "react";

export default function AlertContainer() {
    return (
        <ToastContainer position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
        />
    )
}