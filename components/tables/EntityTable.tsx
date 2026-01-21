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
import { MoreVertical, Eye, Edit, Trash2, Columns } from "lucide-react";
import type { AnyEntity, FieldMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  // Filter available fields for column selection (exclude complex types and password)
  const availableFields = fields.filter(
    (field) =>
      !["multifile", "file", "textarea", "multiforeignkey"].includes(field.type) &&
      field.name !== "password"
  );

  // Get visible fields based on selection
  const visibleFields = availableFields.filter(field => visibleColumns.includes(field.name));

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
    <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
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
                  colSpan={visibleFields.length + 1}
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
  );
}
