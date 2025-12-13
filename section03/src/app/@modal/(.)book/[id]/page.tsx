import { Suspense } from "react";
import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";
import BookSkeleton from "@/components/book-skeleton";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Modal>
            <Suspense fallback={<BookSkeleton />}>
                <BookPage params={params} />
            </Suspense>
        </Modal>
    )
}
