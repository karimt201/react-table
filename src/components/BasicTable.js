import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import './table.css';
import './SearchBar.css';

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="search-container">
        <div className="search-modal">
            <input
                value={filter || ''}
                onChange={e => setFilter(e.target.value)}
                placeholder="Type to search..."
                className="search-input"
            />
        </div>
    </div>

    );
};

const ColumnFilter = ({ column }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { filterValue, setFilter } = column;

    const handleClickOutside = (e) => {
        if (e.target.className === 'search-overlay') {
            setIsOpen(false);
        }
    };

    return (
        <div className="search-container">
            <button className="search-button" onClick={() => setIsOpen(true)}>
                <i className="fas fa-search">{`${column.Header}`}</i>
            </button>

            {isOpen && (
                <div className="search-overlay" onClick={handleClickOutside}>
                    <div className="search-modal">
                        <span>
                            <input
                                value={filterValue || ''}
                                onChange={e => setFilter(e.target.value)}
                                placeholder={`Search ${column.Header}`}
                                className="search-input"
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};


export const BasicTable = ({ columns, data }) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const memoizedColumns = useMemo(() => columns.map(col => ({
        ...col,
        Filter: ColumnFilter,
    })), [columns]);
    const memoizedData = useMemo(() => data, [data]);
    const tableInstance = useTable(
        {
            columns: memoizedColumns,
            data: memoizedData,
            globalFilter,
            setGlobalFilter,
        },
        useGlobalFilter,
        useFilters
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter: setFilter,
        setAllFilters,  
    } = tableInstance;

   
    const resetFilters = () => {
        setFilter(''); 
        setAllFilters([]);
    };

    return (
        <>
            <GlobalFilter filter={state.globalFilter} setFilter={setFilter} />
            <button onClick={resetFilters} className="reset-button">Reset Filters</button>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
