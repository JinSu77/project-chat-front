interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps): JSX.Element => {
    return (
        <button
            className="bg-gray-600 hover:bg-gray-800 text-white rounded-full p-2 mr-4"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
};

export default DeleteButton;
