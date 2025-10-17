import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogOverlay
} from "../ui/alert-dialog.jsx";

export default function AlertConfirmation({
                                              isOpenDialog,
                                              setIsOpenDialog,
                                              handleConfirmation,
                                              titleMessage,
                                              descriptionMessage,
                                              cancelMessage,
                                              actionMessage,
                                          }) {
    return (
        <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <AlertDialogOverlay className="bg-black/80" />
            <AlertDialogContent className="bg-white rounded-2xl p-8 max-w-lg shadow-hover border-none">
                <AlertDialogHeader className="space-y-4">
                    <AlertDialogTitle className="font-sans text-2xl font-semibold text-gray-800 text-left">
                        {titleMessage}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-inter text-sm text-gray-600 text-left">
                        {descriptionMessage}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-3 pt-6 sm:gap-3">
                    <AlertDialogCancel className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 cursor-pointer font-medium">
                        {cancelMessage}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirmation}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 text-white rounded-xl shadow-soft hover:shadow-hover transition-all-smooth cursor-pointer font-medium border-none"
                    >
                        {actionMessage}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}