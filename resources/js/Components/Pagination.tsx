import type { ReactNode } from 'react';

export type PaginationProps = {
    totalData: number
    maxButton?: number,
    currentPage?: number,
    handlePageChange: Function
}

export default function Pagination({ totalData, maxButton = 7, currentPage = 1, handlePageChange }: PaginationProps): ReactNode {
    const totalPages = Math.ceil(totalData / 10)

    const renderPageButtons = () => {
        const buttons = [];
        const middleButtonIndex = Math.floor(maxButton / 2);
        const startPage = Math.max(1, currentPage - middleButtonIndex);
        const endPage = Math.min(totalPages, startPage + maxButton - 1);

        if (startPage > 1) {
            buttons.push(
                <button key="start" className="join-item btn btn-sm" onClick={() => handlePageChange(1)}>
                    1
                </button>
            );

            if (startPage > 2) {
                buttons.push(
                    <button key="ellipsis-start" className="join-item btn btn-sm btn-disabled" disabled>
                        ...
                    </button>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`join-item btn btn-sm ${i === currentPage ? 'btn-disabled' : ''}`}
                    disabled={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <button key="ellipsis-end" className="join-item btn btn-sm btn-disabled" disabled>
                        ...
                    </button>
                );
            }

            buttons.push(
                <button
                    key="end"
                    className="join-item btn btn-sm"
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return <>
        <div className="join">
            <button
                className="join-item btn btn-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageButtons()}
            <button
                className="join-item btn btn-sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    </>;
}
