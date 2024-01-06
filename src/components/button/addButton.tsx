interface AddButtonProps {
    onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps): JSX.Element => {
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
                stroke="#fff"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                />
            </svg>
        </button>
    );
};

export default AddButton;
