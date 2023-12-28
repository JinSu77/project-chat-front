import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    EventSourceMessage,
    fetchEventSource,
} from '@microsoft/fetch-event-source';

export default function useMercureHub(topics: string[]): void {
    const mercureToken = useSelector(
        (state: RootState) => state.authentication.mercureToken
    );

    const handleMessage = (event: EventSourceMessage): void => {
        const data = JSON.parse(event.data);
        console.log('[useMercureHub]', data);
    };

    const logMessageOnOpen = (res: Response): void => {
        if (res.ok && res.status === 200) {
            console.log('[useMercureHub]', 'Connection established');
        } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
        ) {
            console.log('[useMercureHub]', 'Client side error ', res);
        } else {
            console.log('[useMercureHub]', 'Server side error ', res);
        }
    };

    useEffect(() => {
        console.log('[useMercureHub] UseEffect');

        if (!mercureToken) {
            console.log('[useMercureHub] No token');
            return;
        }

        const controller = new AbortController();

        const { signal } = controller;

        const url = new URL('http://localhost:1234/.well-known/mercure');

        url.searchParams.append('topic', topics.join(','));

        const connectToMercureHub = async (): Promise<void> => {
            await fetchEventSource(url.toString(), {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + mercureToken,
                },
                signal: signal,
                onclose: () => {
                    console.log(
                        '[useMercureHub]',
                        'Connection closed by the server'
                    );
                },
                onerror: (err) => {
                    console.log(
                        '[useMercureHub]',
                        'There was an error from server',
                        err
                    );
                },
                onmessage: (event: EventSourceMessage) => {
                    handleMessage(event);
                },
                onopen: (res: Response) => {
                    return new Promise<void>((resolve) => {
                        logMessageOnOpen(res);

                        resolve();
                    });
                },
            });
        };

        connectToMercureHub();

        return () => {
            console.log('[useMercureHub] Closing connection');
            controller.abort();
        };
    }, [mercureToken, topics]);
}
