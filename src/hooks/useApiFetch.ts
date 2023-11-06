import { useState } from 'react';

export type FetchProps = {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: object;
};

export type FetchResult = {
    data?: Record<string, unknown>;
    error?: string;
    isLoading: boolean;
};

const useApiFetch = (): [
    (props: FetchProps) => Promise<FetchResult>,
    FetchResult,
] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<Record<string, unknown>>();

    const fetchData = async ({
        url,
        method,
        headers,
        body,
    }: FetchProps): Promise<FetchResult> => {
        setIsLoading(true);
        setError('');
        setData(undefined);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(body),
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.data.error) {
                    setError(responseData.data.error);
                } else if (responseData.data.errors) {
                    setError(responseData.data.errors);
                } else {
                    setError(
                        '[useFetch] An api side unhandled error has occured'
                    );
                }
            } else {
                setData(responseData.data);
            }
        } catch (err) {
            setError('[useFetch] An unknown error has been catched');
            console.error(err);
        } finally {
            setIsLoading(false);
        }

        return { data, error, isLoading };
    };

    return [fetchData, { data, error, isLoading }];
};

export default useApiFetch;
