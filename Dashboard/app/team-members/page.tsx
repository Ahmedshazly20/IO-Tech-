'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { TeamMemberForm } from '@/components/TeamMemberForm';
import { TeamMembersList } from '@/components/TeamMembersList';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { TeamMember } from '@/types';

export default function TeamMembersPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingMember(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingMember(null);
    setShowForm(true);
  };
  return (
    <div className="space-y-6">
      {showForm ? (
        <>
          <PageHeader
            title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
            description={editingMember ? 'Update team member information' : 'Add a new team member to your organization'}
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingMember(null);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to List
              </Button>
            }
          />
          
          <TeamMemberForm
            onSuccess={handleFormSuccess}
            initialData={editingMember ? {
              Name: editingMember.Name,
              Role: editingMember.Role,
              Email: editingMember.Email,
              Phone: editingMember.Phone,
              WhatsApp: editingMember.WhatsApp,
            } : undefined}
            teamMemberId={editingMember?.id.toString()}
            mode={editingMember ? 'edit' : 'create'}
          />
        </>
      ) : (
        <>
          <PageHeader
            title="Team Members"
            description="Manage your team members and their information"
            action={
              <Button onClick={handleAddNew}>
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            }
          />
          
          <TeamMembersList 
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
          />
        </>
      )}
    </div>
  );
}