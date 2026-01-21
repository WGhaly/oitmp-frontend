"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { findDependencies } from "@/lib/entities";
import { ENTITY_LABELS } from "@/lib/constants";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  recordId: string;
  recordName?: string;
  onConfirm: () => void;
}

export function DeleteConfirmation({
  isOpen,
  onClose,
  entityName,
  recordId,
  recordName,
  onConfirm,
}: DeleteConfirmationProps) {
  const dependencies = findDependencies(entityName, recordId);
  const hasDependencies = dependencies.length > 0;

  const handleConfirm = () => {
    if (!hasDependencies) {
      onConfirm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {hasDependencies ? (
              <>
                <X className="h-5 w-5 text-red-500" />
                <span>Cannot Delete {ENTITY_LABELS[entityName] || entityName}</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span>Confirm Deletion</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {hasDependencies
              ? "This record cannot be deleted because it has dependent records."
              : "This action cannot be undone. Please confirm that you want to delete this record."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {hasDependencies ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-800">
                  <strong>{recordName || recordId}</strong> is referenced by the following
                  records. You must delete or update these records before you can delete this
                  {" " + (ENTITY_LABELS[entityName] || entityName).toLowerCase()}.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Dependencies:</h4>
                {dependencies.map((dep, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-md p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">
                        {ENTITY_LABELS[dep.entityName] || dep.entityName}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {dep.records.length} record{dep.records.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {dep.records.slice(0, 5).map((record) => (
                        <li key={record.id}>
                          {record.name || record.id}
                          <span className="text-xs text-gray-500 ml-2">
                            (via {dep.fieldName})
                          </span>
                        </li>
                      ))}
                      {dep.records.length > 5 && (
                        <li className="text-gray-500">
                          ... and {dep.records.length - 5} more
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                You are about to delete <strong>{recordName || recordId}</strong>. This action
                cannot be undone.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {hasDependencies ? "Close" : "Cancel"}
          </Button>
          {!hasDependencies && (
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
