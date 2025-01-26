'use client';

import {
  Center,
  Table as MantineTable,
  ScrollAreaAutosize,
  ScrollAreaAutosizeProps,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';

export type Column<T extends Record<string, any>> = {
  key?: string & keyof T;
  header: React.ReactNode;
  cell?: (row: { data: T }) => React.ReactNode;
  width?: number;
  align?: 'center' | 'left' | 'right' | 'justify' | 'char';
};

export function createColumns<Row extends Record<string, any>>(columns: Column<Row>[]) {
  return columns;
}

export function Table<T extends Record<string, any>>(props: {
  columns: Column<T>[];
  data: T[];
  maxHeight?: ScrollAreaAutosizeProps['mah'];
  maxWidth?: ScrollAreaAutosizeProps['maw'];
  cellHeight?: number;
}) {
  const { columns, data } = props;
  const rows = data.map((row, index) => {
    return (
      <TableTr key={`${index}-${row.id}`}>
        {columns.map((column, index) => {
          const CellComponent = column.cell
            ? () => column.cell?.({ data: row })
            : () => row[column?.key ?? ''];

          return (
            <TableTd key={`${index}-${column.header}`} style={{ height: props.cellHeight ?? 80 }}>
              <CellComponent />
            </TableTd>
          );
        })}
      </TableTr>
    );
  });

  const emptyRow = (
    <TableTr h={50}>
      <TableTd colSpan={columns.length}>
        <Center>---</Center>
      </TableTd>
    </TableTr>
  );

  return (
    <ScrollAreaAutosize mah={props.maxHeight ?? 500} maw={props.maxWidth ?? '100vw'} type="auto">
      <MantineTable>
        <TableThead>
          <TableTr style={{ backgroundColor: 'var(--mantine-color-gray-1)' }}>
            {columns.map((column, index) => (
              <TableTh
                key={column.key || index}
                style={{ width: column.width ?? 200 }}
                align={column.align}
              >
                {column.header}
              </TableTh>
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>{rows.length === 0 ? emptyRow : rows}</TableTbody>
      </MantineTable>
    </ScrollAreaAutosize>
  );
}
