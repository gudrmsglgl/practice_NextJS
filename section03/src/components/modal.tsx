"use client";

import { createPortal } from "react-dom";
import { ReactNode, useRef, useEffect } from "react";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

export default function Modal(
    { children }: { children: ReactNode }
) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const focusSinkRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        window.history.scrollRestoration = 'manual'

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();

            requestAnimationFrame(() => {
                focusSinkRef.current?.focus({ preventScroll: true });
            });

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
                    window.location.href = window.location.pathname;
                }
            }}
            onClose={() => router.back()}
            className={style.modal}
            ref={dialogRef}>
            <div
                ref={focusSinkRef}
                tabIndex={-1}
                aria-hidden="true"
                style={{
                    position: "fixed",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    opacity: 0,
                    pointerEvents: "none",
                }}
            />
            {children}
        </dialog>,
        document.getElementById("modal-root") as HTMLElement
    )
}