import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface DeleteButtonProps {
    url: string;
    reduxStoreAction?: {
        type: string;
        payload: object;
    };
    token: string;
}

const AsyncDeleteButton = ({
    url,
    reduxStoreAction,
    token,
}: DeleteButtonProps): JSX.Element => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [errorOnDelete, setErrorOnDelete] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleReduxStoreUpdate = (): void => {
        if (reduxStoreAction) {
            dispatch(reduxStoreAction);
        }
    };

    const handleDelete = async (): Promise<void> => {
        setIsDeleting(true);

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setErrorOnDelete(true);

                setIsDeleting(false);

                return;
            }

            setIsDeleting(false);

            handleReduxStoreUpdate();
        } catch (error) {
            setErrorOnDelete(true);
        }
    };

    if (isDeleting) {
        return (
            <button
                className="loading loading-dots loading-xs bg-black rounded-full p-2 mx-2 
                "
            ></button>
        );
    }

    if (errorOnDelete) {
        return (
            <button className="bg-red-600 hover:bg-red-400 text-white rounded-full p-2 mr-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        );
    }

    return (
        <>
            <button
                className="bg-gray-600 hover:bg-gray-800 text-white rounded-full p-2 mr-4"
                onClick={handleDelete}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                    />
                </svg>
            </button>
        </>
    );
};

export default AsyncDeleteButton;
