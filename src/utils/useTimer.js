import { useEffect, useState } from "react";

const useTimer = () => {
    const [secsRem, setSecsRem] = useState(0);

    useEffect(() => {
        if(secsRem <= 0) {
            return;
        }

        const timeout = setTimeout(() => {
            setSecsRem(secsRem - 1);
        }, 1000);

        return () => clearTimeout(timeout);

    }, [secsRem])

    function start(secs) {
        setSecsRem(secs);
    }


    return {secsRem, start};
};

export default useTimer;