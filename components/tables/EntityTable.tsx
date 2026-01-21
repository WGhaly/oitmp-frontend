"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Eye, Edit, Trash2, Columns, Download, Copy } from "lucide-react";
import type { AnyEntity, FieldMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EntityTableProps {
  data: AnyEntity[];
  fields: FieldMetadata[];
  onView: (record: AnyEntity) => void;
  onEdit: (record: AnyEntity) => void;
  onDelete: (record: AnyEntity) => void;
  quickActions?: Array<{ label: string; targetEntity: string; icon: any; description: string }>;
  onQuickAction?: (action: string, record: AnyEntity) => void;
  searchTerm: string;
  visibleColumns: string[];
}

export function EntityTable({ data, fields, onView, onEdit, onDelete, quickActions, onQuickAction, searchTerm, visibleColumns }: EntityTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Filter available fields for column selection (exclude complex types and password)
  const availableFields = fields.filter(
    (field) =>
      !["multifile", "file", "textarea", "multiforeignkey"].includes(field.type) &&
      field.name !== "password"
  );

  // Get visible fields based on selection
  const visibleFields = availableFields.filter(field => visibleColumns.includes(field.name));

  // Toggle single row selection
  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  // Toggle all rows
  const toggleAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((r) => r.id)));
    }
  };

  // Mass actions
  const handleMassExport = () => {
    const selectedData = data.filter(r => selectedRows.has(r.id));
    const csv = [
      visibleFields.map(f => f.label).join(","),
      ...selectedData.map(record =>
        visibleFields.map(field => String(record[field.name] || "")).join(",")
      )
    ].join("\\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${Date.now()}.csv`;
    a.click();
    toast.success(`Exported ${selectedRows.size} records`);
  };

  const handleMassDelete = () => {
    if (confirm(`Delete ${selectedRows.size} selected records?`)) {
      selectedRows.forEach(id => {
        const record = data.find(r => r.id === id);
        if (record) onDelete(record);
      });
      setSelectedRows(new Set());
      toast.success(`Deleted ${selectedRows.size} records`);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((record: any) => {
    const searchLower = searchTerm.toLowerCase();
    return Object.values(record).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchLower);
      }
      return false;
    });
  });

  const formatCellValue = (value: any, field: FieldMetadata): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>;
    }

    switch (field.type) {
      case "boolean":
        return (
          <Badge variant={value ? "default" : "secondary"}>
            {value ? "Yes" : "No"}
          </Badge>
        );
      case "select":
        return <Badge variant="outline">{value}</Badge>;
      case "date":
        return new Date(value).toLocaleDateString();
      case "foreignkey":
        return <span className="text-brand-blue">{value}</span>;
      default:
        return String(value).length > 50
          ? String(value).substring(0, 50) + "..."
          : String(value);
    }
  };

  return (
    <>
      {/* Mass Actions Bar */}
      {selectedRows.size > 0 && (
        <div className="bg-brand-blue text-white px-4 py-2 rounded-t-md flex items-center justify-between">
          <span className="text-sm font-medium">{selectedRows.size} selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={handleMassExport} className="h-7">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
            <Button size="sm" variant="destructive" onClick={handleMassDelete} className="h-7">
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className={cn("rounded-md border bg-white", selectedRows.size > 0 && "rounded-t-none")}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.size === data.length && data.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {visibleFields.map((field) => (
                <TableHead key={field.name} className="font-semibold">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </TableHead>
              ))}
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((record: any) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(record.id)}
                      onCheckedChange={() => toggleRow(record.id)}
                    />
                  </TableCell>
                  {visibleFields.map((field) => (
                    <TableCell key={field.name}>
                      {formatCellValue(record[field.name], field)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => onView(record)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(record)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(record)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        {quickActions && quickActions.length > 0 && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-xs text-gray-500">Quick Actions</DropdownMenuLabel>
                            {quickActions.map((action, idx) => {
                              const Icon = action.icon;
                              return (
                                <DropdownMenuItem
                                  key={idx}
                                  onClick={() => onQuickAction && onQuickAction(action.targetEntity, record)}
                                  className="text-brand-blue focus:text-brand-blue"
                                >
                                  <Icon className="mr-2 h-4 w-4" />
                                  {action.label}
                                </DropdownMenuItem>
                              );
                            })}
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visibleFields.length + 2}
                  className="h-24 text-center"
                >
                  <div className="text-gray-500">
                    {searchTerm ? "No records found matching your search." : "No records yet."}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
