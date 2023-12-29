import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
    EventSourceMessage,
    fetchEventSource,
} from '@microsoft/fetch-event-source';

export default function useMercureHub(): void {
    const mercureToken = useSelector((state: RootState) => state.mercure.token);

    const topics = useSelector((state: RootState) => state.mercure.topics);

    /*     const getTopics = useCallback((): string[] => {
        const topics: string[] = [];

        for (const channel of channels) {
            topics.push(`/channels/${channel.id}`);
        }

        return topics;
    }, [channels]); */

    const handleMessage = (event: EventSourceMessage): void => {
        const data = JSON.parse(event.data);
        console.log('[useMercureHub]', data);
    };

    const logMessageOnOpen = (res: Response): void => {
        if (res.ok && res.status === 200) {
            console.log('[useMercureHub] Connection established');
        } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
        ) {
            console.log('[useMercureHub] Client side error ', res);
        } else {
            console.log('[useMercureHub] Server side error ', res);
        }
    };

    const connectToMercureHub = useCallback(
        async (controller: AbortController, url: URL): Promise<void> => {
            const { signal } = controller;

            await fetchEventSource(url.toString(), {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + mercureToken,
                },
                signal: signal,
                onclose: () => {
                    console.log(
                        '[useMercureHub] Connection closed by the server'
                    );
                },
                onerror: (err) => {
                    console.log(
                        '[useMercureHub] There was an error from server',
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
        },
        [mercureToken]
    );

    useEffect(() => {
        console.log('[useMercureHub] UseEffect');

        if (!mercureToken) {
            console.log('[useMercureHub] No token');
            return;
        }

        if (topics.length === 0) {
            console.log('[useMercureHub] No topics');
            return;
        }

        const controller = new AbortController();

        const url = new URL('http://localhost:1234/.well-known/mercure');

        for (const topic of topics) {
            url.searchParams.append('topic', topic);
        }

        connectToMercureHub(controller, url);

        return () => {
            console.log('[useMercureHub] Closing connection');
            controller.abort();
        };
    }, [connectToMercureHub, topics, mercureToken]);
}
