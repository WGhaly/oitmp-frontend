"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldMetadata, AnyEntity } from "@/lib/types";
import { mockData } from "@/lib/entities";
import { ENTITY_LABELS } from "@/lib/constants";

interface EntityFormProps {
  fields: FieldMetadata[];
  initialData?: Partial<AnyEntity>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function EntityForm({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
}: EntityFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    initialData as Record<string, any>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add metadata fields
    const submitData = {
      ...formData,
      id: initialData?.id || `temp_${Date.now()}`,
      creation_user_id: "u1", // Would come from auth context
      creation_timestamp: new Date().toISOString(),
    };
    onSubmit(submitData);
  };

  const updateField = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderField = (field: FieldMetadata) => {
    const value = formData[field.name];

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            type={field.type}
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            required={field.required}
          />
        );

      case "date":
        return (
          <Input
            type="date"
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            required={field.required}
            rows={4}
          />
        );

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value || false}
              onCheckedChange={(checked) => updateField(field.name, checked)}
            />
            <span className="text-sm text-gray-600">
              {field.description || "Enable this option"}
            </span>
          </div>
        );

      case "select":
        return (
          <Select
            value={value || ""}
            onValueChange={(val) => updateField(field.name, val)}
            required={field.required}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "foreignkey":
        const foreignData = field.foreignEntity
          ? mockData[field.foreignEntity] || []
          : [];
        return (
          <Select
            value={value || ""}
            onValueChange={(val) => updateField(field.name, val)}
            required={field.required}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {foreignData.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name || item.title || item.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiforeignkey":
        const multiForeignData = field.foreignEntity
          ? mockData[field.foreignEntity] || []
          : [];
        const selectedValues = Array.isArray(value) ? value : [];
        
        return (
          <div className="space-y-2 border rounded-md p-3 max-h-48 overflow-y-auto">
            {multiForeignData.map((item: any) => {
              const isChecked = selectedValues.includes(item.id);
              return (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const newValues = checked
                        ? [...selectedValues, item.id]
                        : selectedValues.filter((id) => id !== item.id);
                      updateField(field.name, newValues);
                    }}
                  />
                  <span className="text-sm">
                    {item.name || item.title || item.id}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case "file":
        return (
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateField(field.name, file.name);
              }
            }}
            required={field.required}
          />
        );

      case "multifile":
        return (
          <Input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              updateField(
                field.name,
                files.map((f) => f.name)
              );
            }}
            required={field.required}
          />
        );

      default:
        return (
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            required={field.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {fields
          .filter((field) => field.name !== "password" || !initialData?.id) // Hide password on edit
          .map((field) => (
            <div
              key={field.name}
              className={field.type === "textarea" ? "md:col-span-2" : ""}
            >
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.description && (
                <p className="text-xs text-gray-500 mt-1">{field.description}</p>
              )}
              <div className="mt-2">{renderField(field)}</div>
            </div>
          ))}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData?.id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
