"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EntityForm } from "@/components/forms/EntityForm";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import type { AnyEntity, FieldMetadata } from "@/lib/types";
import { mockData } from "@/lib/entities";
import { ENTITY_LABELS } from "@/lib/constants";

interface EntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | "create";
  entityName: string;
  record?: AnyEntity;
  fields: FieldMetadata[];
  onSave: (data: any) => void;
}

export function EntityModal({
  isOpen,
  onClose,
  mode,
  entityName,
  record,
  fields,
  onSave,
}: EntityModalProps) {
  const handleSave = (data: any) => {
    onSave(data);
    onClose();
  };

  const formatValue = (value: any, field: FieldMetadata): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">Not set</span>;
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
        if (field.foreignEntity) {
          const foreignData = mockData[field.foreignEntity] || [];
          const foreignRecord = foreignData.find((item: any) => item.id === value);
          return (
            <span className="text-brand-blue">
              {foreignRecord
                ? (foreignRecord as any).name || (foreignRecord as any).title || value
                : value}
            </span>
          );
        }
        return value;
      case "multiforeignkey":
        if (field.foreignEntity && Array.isArray(value)) {
          const foreignData = mockData[field.foreignEntity] || [];
          return (
            <div className="flex flex-wrap gap-1">
              {value.map((id) => {
                const foreignRecord = foreignData.find((item: any) => item.id === id);
                return (
                  <Badge key={id} variant="outline">
                    {foreignRecord
                      ? (foreignRecord as any).name || (foreignRecord as any).title || id
                      : id}
                  </Badge>
                );
              })}
            </div>
          );
        }
        return <span className="text-gray-400">None</span>;
      case "multifile":
        if (Array.isArray(value)) {
          return (
            <div className="space-y-1">
              {value.map((file, index) => (
                <div key={index} className="text-sm text-brand-blue">
                  📎 {file}
                </div>
              ))}
            </div>
          );
        }
        return value;
      case "textarea":
        return <div className="whitespace-pre-wrap">{value}</div>;
      default:
        return String(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" && `Create ${ENTITY_LABELS[entityName] || entityName}`}
            {mode === "edit" && `Edit ${ENTITY_LABELS[entityName] || entityName}`}
            {mode === "view" && `View ${ENTITY_LABELS[entityName] || entityName}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" && "Fill in the information below to create a new record."}
            {mode === "edit" && "Update the information below to modify this record."}
            {mode === "view" && "Detailed information about this record."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {mode === "view" ? (
            <div className="space-y-4">
              {fields
                .filter((field) => field.name !== "password")
                .map((field) => (
                  <div key={field.name} className="grid grid-cols-3 gap-4">
                    <Label className="font-semibold text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <div className="col-span-2">
                      {formatValue((record as any)?.[field.name], field)}
                    </div>
                  </div>
                ))}
              
              {/* Metadata */}
              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <Label className="font-semibold">Created By</Label>
                  <div className="col-span-2">{(record as any)?.creation_user_id}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-2">
                  <Label className="font-semibold">Created At</Label>
                  <div className="col-span-2">
                    {(record as any)?.creation_timestamp &&
                      new Date((record as any).creation_timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EntityForm
              fields={fields}
              initialData={mode === "edit" ? record : undefined}
              onSubmit={handleSave}
              onCancel={onClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
