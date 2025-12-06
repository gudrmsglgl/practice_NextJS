"use client";

import { useActionState, useRef, useEffect } from "react";
import deleteReviewAction from "@/app/actions/delete-review.action";

export default function ReviewItemDeleteButton(
    { reviewId, bookId }: { reviewId: number; bookId: number }
) {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

    useEffect(() => {
        if (state && state.status === false) {
            alert(state.error);
        }
    }, [state])

    return (
        <form
            ref={formRef}
            action={formAction}
        >
            <input name="reviewId" type="hidden" value={reviewId} readOnly />
            <input name="bookId" type="hidden" value={bookId} readOnly />
            {isPending ?
                <div>...</div> :
                <div onClick={() => formRef.current?.requestSubmit()}>
                    삭제하기
                </div>
            }
        </form>
    )

} 