"use client";

import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomDataTypeDialog } from "@/features/inference/components/custom-data-type-dialog";
import { useCustomType } from "@/features/inference/hooks/use-custom-type";
import { useFileData } from "@/features/inference/hooks/use-file-data";

const dataTypeMap = {
  bool: "True/False",
  string: "Text",
  int64: "Integer",
  float64: "Decimal Number",
  category: "Category",
  "datetime64[us]": "Date/Time",
  "timedelta64[ns]": "Time Interval",
  complex128: "Complex Number",
};

type ColumnMeta = {
  dataType: string;
};

export const DataTable = () => {
  const { data, isPending } = useFileData();
  const { setCustomType, setColumnName } = useCustomType();
  const columnHelper = createColumnHelper<Record<string, string>>();

  const columns = React.useMemo(() => {
    if (!data?.sample_data?.[0]) return [];

    return Object.keys(data.sample_data[0]).map((key) => {
      return columnHelper.accessor(key, {
        header: () => (
          <div className="flex flex-col items-center justify-center py-2">
            <span className="font-semibold">{key}</span>
          </div>
        ),
        meta: {
          dataType:
            dataTypeMap[
              data.effective_types[
                key
              ].toLowerCase() as keyof typeof dataTypeMap
            ] ?? data.overridden_types?.[key],
        } satisfies ColumnMeta,
        cell: (info) => {
          const value = info.getValue();
          const isNaN = value === "nan" || value === "None";
          return (
            <div className="text-center text-sm">{isNaN ? "-" : value}</div>
          );
        },
      });
    });
  }, [
    data?.sample_data,
    data?.effective_types,
    data?.overridden_types,
    columnHelper,
  ]);

  const table = useReactTable({
    data: data?.sample_data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-sm">Loading data...</p>
      </div>
    );
  }

  if (!data?.sample_data?.length) {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-sm">No data available</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inferred Data</CardTitle>
        <CardDescription>
          Showing 5 rows of sample data. Click on the data type to change it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
              <TableRow>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableHead key={`${header.id}-type`} className="border-t">
                    <CustomDataTypeDialog>
                      <Button
                        variant="ghost"
                        className="w-full text-xs"
                        onClick={() => {
                          setCustomType(
                            (header.column.columnDef.meta as ColumnMeta)
                              .dataType,
                          );
                          setColumnName(header.id);
                        }}
                      >
                        {(header.column.columnDef.meta as ColumnMeta)
                          .dataType || "-"}
                      </Button>
                    </CustomDataTypeDialog>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
