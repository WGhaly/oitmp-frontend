"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EntityTable } from "@/components/tables/EntityTable";
import { EntityModal } from "@/components/modals/EntityModal";
import { DeleteConfirmation } from "@/components/modals/DeleteConfirmation";
import { entityMetadata, mockData } from "@/lib/entities";
import { ENTITY_LABELS } from "@/lib/constants";
import { Plus, ArrowRight, FileText, Lightbulb, BarChart, Wrench, Columns } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { AnyEntity } from "@/lib/types";

interface PageProps {
  params: Promise<{ entity: string }>;
}

// Define quick actions based on workflow
const getQuickActions = (entityName: string) => {
  const actions: Array<{ label: string; targetEntity: string; icon: any; description: string }> = [];

  switch (entityName) {
    case "research":
      actions.push(
        { label: "Create Research Output", targetEntity: "research-outputs", icon: FileText, description: "Document research results" },
        { label: "Create Invention Disclosure", targetEntity: "invention-disclosure", icon: Lightbulb, description: "Disclose potential invention" },
        { label: "Create Tech Assessment", targetEntity: "tech-assessment", icon: BarChart, description: "Assess technology readiness" },
        { label: "Create Market Assessment", targetEntity: "market-assessment", icon: BarChart, description: "Evaluate market potential" },
        { label: "Add Equipment", targetEntity: "equipment", icon: Wrench, description: "Register equipment used" }
      );
      break;
    case "research-outputs":
      actions.push(
        { label: "Create Invention Disclosure", targetEntity: "invention-disclosure", icon: Lightbulb, description: "From this output" }
      );
      break;
    case "invention-disclosure":
      actions.push(
        { label: "Conduct Prior Art Search", targetEntity: "prior-art-search", icon: FileText, description: "Verify novelty" }
      );
      break;
    case "prior-art-search":
      actions.push(
        { label: "File Patent", targetEntity: "patent-utility", icon: FileText, description: "If novel" },
        { label: "Register Design Right", targetEntity: "design-right", icon: FileText, description: "If novel" },
        { label: "Register Know-How", targetEntity: "know-how", icon: FileText, description: "If novel" },
        { label: "Create Tech Assessment", targetEntity: "tech-assessment", icon: BarChart, description: "Technical evaluation" },
        { label: "Create Market Assessment", targetEntity: "market-assessment", icon: BarChart, description: "Market analysis" }
      );
      break;
    case "patent-utility":
    case "design-right":
    case "know-how":
      actions.push(
        { label: "Create License", targetEntity: "license", icon: FileText, description: "Commercialize IP" },
        { label: "Create Tech Assessment", targetEntity: "tech-assessment", icon: BarChart, description: "Technical evaluation" },
        { label: "Create Market Assessment", targetEntity: "market-assessment", icon: BarChart, description: "Market analysis" }
      );
      break;
    case "industry-challenge":
      actions.push(
        { label: "Propose Solution", targetEntity: "challenge-solution", icon: Lightbulb, description: "Submit solution" }
      );
      break;
    case "fund":
      actions.push(
        { label: "Create Proposal", targetEntity: "proposal", icon: FileText, description: "Apply for funding" }
      );
      break;
    case "proposal":
      // Only if status is "Funded" or "Contracted"
      actions.push(
        { label: "Create Research", targetEntity: "research", icon: FileText, description: "Start funded research" }
      );
      break;
  }

  return actions;
};

export default function EntityPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const entityName = resolvedParams.entity;
  
  const [data, setData] = useState<AnyEntity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AnyEntity | null>(null);
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);
  const [prefillData, setPrefillData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  const metadata = entityMetadata[entityName];
  const quickActions = getQuickActions(entityName);

  // Filter available fields for column selection
  const availableFields = metadata?.fields.filter(
    (field) =>
      !["multifile", "file", "textarea", "multiforeignkey"].includes(field.type) &&
      field.name !== "password"
  ) || [];

  // Initialize visible columns
  useEffect(() => {
    if (availableFields.length > 0 && visibleColumns.length === 0) {
      setVisibleColumns(availableFields.slice(0, 6).map(f => f.name));
    }
  }, [availableFields, visibleColumns.length]);

  // Toggle column visibility
  const toggleColumn = (columnName: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnName)
        ? prev.filter(name => name !== columnName)
        : [...prev, columnName]
    );
  };

  // Filter data based on search
  const filteredData = data.filter((record: any) => {
    const searchLower = searchTerm.toLowerCase();
    return Object.values(record).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchLower);
      }
      return false;
    });
  });

  useEffect(() => {
    // Load data for this entity
    if (mockData[entityName]) {
      setData(mockData[entityName]);
    }
  }, [entityName]);

  if (!metadata) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Entity Not Found</h1>
          <p className="text-gray-600">The entity "{entityName}" does not exist.</p>
        </div>
      </div>
    );
  }

  const handleQuickAction = (action: string, record: AnyEntity) => {
    // Navigate to the target entity's create page with prefill data
    const prefill: any = {};
    
    // Set the foreign key based on the source entity
    switch (entityName) {
      case "research":
        prefill.research_id = record.id;
        break;
      case "research-outputs":
        prefill.research_id = (record as any).research_id;
        break;
      case "invention-disclosure":
        prefill.invention_disclosure_id = record.id;
        break;
      case "prior-art-search":
        prefill.prior_art_search_id = record.id;
        break;
      case "patent-utility":
        prefill.patent_utility_id = record.id;
        break;
      case "industry-challenge":
        prefill.industry_challenge_id = record.id;
        break;
      case "fund":
        prefill.fund_id = record.id;
        break;
      case "proposal":
        prefill.proposal_id = record.id;
        break;
    }
    
    setSelectedQuickAction(action);
    setPrefillData(prefill);
    setIsCreateModalOpen(true);
  };

  const handleCreate = (formData: any) => {
    const newRecord = {
      ...formData,
      id: `${entityName}_${Date.now()}`,
    };
    setData([...data, newRecord]);
    toast.success(`${ENTITY_LABELS[entityName] || entityName} created successfully!`);
  };

  const handleEdit = (formData: any) => {
    setData(
      data.map((record) =>
        record.id === selectedRecord?.id ? { ...record, ...formData } : record
      )
    );
    toast.success(`${ENTITY_LABELS[entityName] || entityName} updated successfully!`);
  };

  const handleDelete = () => {
    if (selectedRecord) {
      setData(data.filter((record) => record.id !== selectedRecord.id));
      toast.success(`${ENTITY_LABELS[entityName] || entityName} deleted successfully!`);
    }
  };

  const handleView = (record: AnyEntity) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (record: AnyEntity) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (record: AnyEntity) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {ENTITY_LABELS[entityName] || entityName}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all {(ENTITY_LABELS[entityName] || entityName).toLowerCase()} records
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-brand-blue hover:bg-brand-navy"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Records</div>
          <div className="text-2xl font-bold text-brand-navy">{data.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {data.filter((r: any) => r.status === "Active" || r.status === "Approved").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {data.filter((r: any) => r.status === "Pending" || r.status === "In Progress").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Inactive</div>
          <div className="text-2xl font-bold text-gray-600">
            {data.filter((r: any) => r.status === "Inactive" || r.status === "Rejected").length}
          </div>
        </div>
      </div>

      {/* Quick Actions - Workflow Based */}
      {quickActions.length > 0 && (
        <div className="bg-gradient-to-r from-brand-blue to-brand-lightBlue rounded-lg p-6 text-white">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Quick Actions - Next Steps in Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (data.length > 0) {
                      // Use the first record as context for the quick action
                      handleQuickAction(action.targetEntity, data[0]);
                    } else {
                      toast.error(`Please create a ${ENTITY_LABELS[entityName]} record first`);
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg p-4 text-left transition-all border border-white/20"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5" />
                    <div>
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm text-white/80 mt-1">{action.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Column Selector */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableFields.map((field) => (
              <DropdownMenuCheckboxItem
                key={field.name}
                checked={visibleColumns.includes(field.name)}
                onCheckedChange={() => toggleColumn(field.name)}
              >
                {field.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="text-sm text-gray-600">
          {filteredData.length} {filteredData.length === 1 ? "record" : "records"}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <EntityTable
          data={filteredData}
          fields={metadata.fields}
          onView={handleView}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          quickActions={quickActions}
          onQuickAction={handleQuickAction}
          searchTerm={searchTerm}
          visibleColumns={visibleColumns}
        />
      </div>

      {/* Create Modal */}
      <EntityModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedQuickAction(null);
          setPrefillData(null);
        }}
        mode="create"
        entityName={selectedQuickAction || entityName}
        fields={selectedQuickAction ? entityMetadata[selectedQuickAction]?.fields || metadata.fields : metadata.fields}
        record={prefillData ? { ...prefillData, id: '', creation_user_id: 'u1', creation_timestamp: new Date().toISOString() } : undefined}
        onSave={(data) => {
          if (selectedQuickAction) {
            // Handle quick action creation - add to the target entity's data
            const targetEntity = selectedQuickAction;
            const newRecord = {
              ...data,
              id: `${targetEntity}_${Date.now()}`,
            };
            // In a real app, this would be an API call
            toast.success(`${ENTITY_LABELS[targetEntity] || targetEntity} created successfully from ${ENTITY_LABELS[entityName]}!`);
            // Could navigate to the new entity page
            router.push(`/dashboard/${targetEntity}`);
          } else {
            handleCreate(data);
          }
        }}
      />

      {/* Edit Modal */}
      {selectedRecord && (
        <EntityModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          mode="edit"
          entityName={entityName}
          record={selectedRecord}
          fields={metadata.fields}
          onSave={handleEdit}
        />
      )}

      {/* View Modal */}
      {selectedRecord && (
        <EntityModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          mode="view"
          entityName={entityName}
          record={selectedRecord}
          fields={metadata.fields}
          onSave={() => {}}
        />
      )}

      {/* Delete Confirmation */}
      {selectedRecord && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          entityName={entityName}
          recordId={selectedRecord.id}
          recordName={
            (selectedRecord as any).name || (selectedRecord as any).title || selectedRecord.id
          }
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
