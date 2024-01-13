import { useState } from 'react';

interface RequestParams {
    url: string;
    header?: {
        Authorization: string;
        mercureAuthorization?: string;
    };
    method: string;
    body?: string;
}

interface AsyncRequestButtonProps {
    requestParams: RequestParams;
    mode: 'create' | 'delete';
}

const AsyncRequestButton = ({
    requestParams,
    mode,
}: AsyncRequestButtonProps): JSX.Element => {
    const [isWorking, setIsWorking] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const asyncHandler = async (): Promise<void> => {
        setIsWorking(true);

        try {
            const response = await fetch(requestParams.url, {
                method: requestParams.method,
                headers: requestParams.header,
                body: requestParams.body,
            });

            if (!response.ok) {
                setHasError(true);

                setIsWorking(false);

                return;
            }

            setIsWorking(false);
        } catch (error) {
            setHasError(true);
        }
    };

    if (isWorking) {
        return (
            <button
                className="loading loading-dots loading-xs bg-black rounded-full p-2 mx-2 
                "
            ></button>
        );
    }

    if (hasError) {
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
                onClick={asyncHandler}
            >
                {mode === 'delete' && (
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
                )}

                {mode === 'create' && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#fff"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                )}
            </button>
        </>
    );
};

export default AsyncRequestButton;
