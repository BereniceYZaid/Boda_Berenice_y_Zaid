import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import {useQueryClient} from "@tanstack/react-query";

import LoginModal from "../Modals/LoginModal.jsx";
import AlertConfirmation from "../Commons/AlertConfirmation.jsx";
import {showAlertSuccess} from "../Commons/AlertSuccess.jsx";
import {showAlertError} from "../Commons/AlertError.jsx";

export default function Footer({ isAdmin, isLoading, error }) {
    const queryClient = useQueryClient();
    const [loginModal, setLoginModal] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);

    const handleCloseLoginModal = () => {
        setLoginModal(false);
    };

    const handleOpenLoginModal = () => {
        setLoginModal(true);
    };

    const handleOpenLogoutDialog = () => {
        setLogoutDialog(true);
    };

    const handleConfirmLogout = async () => {
        try {
            localStorage.setItem("token", "");
            await queryClient.invalidateQueries({queryKey: ["adminStatus"]});
            setLogoutDialog(false);
            showAlertSuccess("Se cerro sesion exitosamente!");
        } catch (error) {
            console.log(error);
            showAlertError("Hubo un error desconocido al cerrar sesion");
        }
    };

    const handleAuthButtonClick = () => {
        if (!isAdmin) {
            handleOpenLoginModal();
        } else {
            handleOpenLogoutDialog();
        }
    };

    const baseButtonStyles = `
    h-10 rounded-full border px-2 flex items-center shadow-sm 
    whitespace-nowrap font-medium truncate transition duration-300 ease-in-out
    cursor-pointer hover:brightness-90
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100
  `;

    const buttonVariantStyles = !isAdmin
        ? "bg-white text-gray-700 border-gray-200"
        : "bg-rose-500 text-white";

    return (
        <>
            <footer className="bg-white border-t border-rose-100 py-8 mt-16">
                <div className="items-center gap-4 flex justify-center">
                    <button
                        disabled={isLoading || error}
                        className={`${baseButtonStyles} ${buttonVariantStyles}`}
                        onClick={handleAuthButtonClick}
                        aria-label={!isAdmin ? "Iniciar sesión" : "Cerrar sesión"}
                    >
                        {!isAdmin ? (
                            <LogIn className="w-6 h-6 mx-auto" />
                        ) : (
                            <LogOut className="w-6 h-6 mx-auto" />
                        )}
                    </button>

                    <p className="font-sans text-sm text-gray-500">
                        Página creada por&nbsp;
                        <span className="font-medium text-gray-700">
                            Juan Diego Quijada Castillo
                        </span>
                    </p>
                </div>

                {isAdmin && (
                    <div className="text-center pt-4">
                        <p className="font-sans text-sm text-purple-500 font-bold">
                            SE INICIÓ SESIÓN COMO ADMINISTRADOR
                        </p>
                    </div>
                )}
            </footer>

            {loginModal && (
                <LoginModal closeModal={handleCloseLoginModal} />
            )}

            <AlertConfirmation
                isOpenDialog={logoutDialog}
                setIsOpenDialog={setLogoutDialog}
                handleConfirmation={handleConfirmLogout}
                titleMessage="¿Quieres cerrar sesión?"
                descriptionMessage="Se cerrará tu sesión de administrador y tendrás que volver a iniciar sesión para acceder."
                cancelMessage="Cancelar"
                actionMessage="Cerrar sesión"
            />
        </>
    );
}
