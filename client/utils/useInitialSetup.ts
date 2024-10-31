import { useEffect, useRef } from 'react';

// Runs a callback once, when the component is first rendered.
export default function useInitialSetup(callback: () => void) {
    const done = useRef(false);

    useEffect(() => {
        if (!done.current) {
            done.current = true;
            callback();
        }
    }, [callback]);
}
