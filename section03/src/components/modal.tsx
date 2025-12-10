"use client";

import { createPortal } from "react-dom";
import { ReactNode, useRef, useEffect } from "react";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

export default function Modal(
    { children }: { children: ReactNode }
) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            dialogRef.current?.scrollTo({
                top: 0,
            })
        }
        return () => {
            document.body.style.overflow = prev;
        }
    }, [])
    return createPortal(
        <dialog
            onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest("button")) {
                    return;
                }

                if (target.nodeName === "DIALOG") {
                    router.back();
                } else {
                    window.history.scrollRestoration = 'manual'
                    window.location.reload();
                }
            }}
            onClose={() => router.back()}
            className={style.modal}
            ref={dialogRef}>{children}
        </dialog>,
        document.getElementById("modal-root") as HTMLElement
    )
}