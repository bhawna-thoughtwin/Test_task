import { useMemo, useState } from "react";
import styles from "./DataTable.module.css";
import type { DataTableProps } from "./DataTable.types";

type SortDirection = "asc" | "desc";

function DataTable<T>({
    columns,
    data,
    onRowSelect,
}: DataTableProps<T>) {
    const [selectedRow, setSelectedRow] = useState<T | null>(null);

    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] =
        useState<SortDirection>("asc");
    const [searchText, setSearchText] = useState("");




    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };
    const sortedData = useMemo(() => {
        if (!sortKey) return data;

        return [...data].sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];
            if (valueA == null || valueB == null) return 0;
            if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
            if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortKey, sortDirection]);

    const filteredData = useMemo(() => {
        if (!searchText) return sortedData;

        const lowerSearch = searchText.toLowerCase();

        return sortedData.filter((row) =>
            columns.some((col) => {
                const value = row[col.key];
                return String(value).toLowerCase().includes(lowerSearch);
            })
        );
    }, [searchText, sortedData, columns]);

    const highlightText = (text: string, search: string) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <mark key={index}>{part}</mark>
            ) : (
                part
            )
        );
    };

    const handleRowClick = (row: T) => {
        const isSame = selectedRow === row;
        setSelectedRow(isSame ? null : row);
        onRowSelect?.(isSame ? null : row);
    };
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                onClick={() => handleSort(col.key)}
                                className={styles.sortableHeader}
                            >
                                <div className={styles.headerContent}>
                                    {sortKey === col.key && (
                                        <span className={styles.sortIconTop}>
                                            {sortDirection === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                    <span>{col.label}</span>
                                </div>
                            </th>

                        ))}
                    </tr>
                </thead>


                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className={styles.emptyState}>
                                No data found
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((row, index) => (
                            <tr
                                className={selectedRow === row ? styles.selectedRow : ""}
                                onClick={() => handleRowClick(row)}
                            >

                                {columns.map((col) => (
                                    <td key={String(col.key)}>
                                        {highlightText(String(row[col.key]), searchText)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>



            </table>
        </div>
    );
}

export default DataTable;
