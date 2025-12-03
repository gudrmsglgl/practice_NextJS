"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error(
    { error, reset }: { error: Error; reset: () => void },

) {
    const router = useRouter();

    return (
        <div>
            <h3>오류가 발생했습니다.</h3>
            <button onClick={() => {
                startTransition(() => {
                    router.refresh();
                    reset();
                });
            }}>다시 시도</button>
            <h5>{`에러 메세지: ${error.message}, 에러네임 :${error.cause}`}</h5>
        </div>
    )
}