import { useEffect, useState } from "react";

function useAsync<T>(asyncFn: () => Promise<T>, dependencies: any[] = []) {
    const [value, setValue] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        asyncFn()
            .then((result) => {
                if (isMounted) {
                    setValue(result);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, dependencies);

    return { value, loading, error };
}

export default useAsync;