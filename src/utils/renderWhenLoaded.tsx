type RenderWhenLoaded = {
    isLoading: boolean;
    loadedComponent: JSX.Element;
};

const renderWhenLoaded = ({
    isLoading = false,
    loadedComponent = <></>,
}: RenderWhenLoaded): JSX.Element => {
    return (
        <>
            {isLoading && (
                <div className="w-full h-auto flex justify-center items-center">
                    <div className="loading"></div>
                </div>
            )}
            {!isLoading && loadedComponent}
        </>
    );
};

export default renderWhenLoaded;
