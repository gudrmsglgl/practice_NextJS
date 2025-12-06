"use client";

import createReviewAction from "@/app/actions/create-review.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {

    const [state, formAction, isPending] = useActionState(createReviewAction, null);

    useEffect(() => {
        if (state && state.status === false) {
            alert(state.error);
        }
    }, [state])

    return (
        <section>
            <form
                className={style.form_container}
                action={formAction}
            >
                <input name="bookId" type="hidden" value={bookId} readOnly />
                <textarea name="content" disabled={isPending} placeholder="리뷰를 입력해주세요." />
                <div className={style.submit_container}>
                    <input name="author" disabled={isPending} placeholder="작성자" />
                    <button type="submit" disabled={isPending}>{isPending ? "..." : "작성하기"}</button>
                </div>
            </form>
        </section>
    );
}