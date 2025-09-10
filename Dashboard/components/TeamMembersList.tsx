'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetTeamMembers, useDeleteTeamMember } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';
import { User, Mail, Phone, MessageCircle, Edit, Trash2, AlertCircle } from 'lucide-react';
import { TeamMember } from '@/types';
import Image from 'next/image';

interface TeamMembersListProps {
  onEdit?: (member: TeamMember) => void;
  refreshTrigger?: number;
}

export function TeamMembersList({ onEdit, refreshTrigger }: TeamMembersListProps) {
  const { data: teamMembers, isLoading, error: queryError, refetch } = useGetTeamMembers();
  const { mutate: deleteMember, isPending: isDeleting, isError: deleteError, error: deleteMemberError } = useDeleteTeamMember();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (refreshTrigger) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    deleteMember(id.toString(), {
      onSuccess: () => {
        setDeletingId(null);
      },
      onError: (err) => {
        console.error('Error deleting team member:', err);
        alert(`Failed to delete team member: ${err.message}`);
        setDeletingId(null);
      },
    });
  };

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-gray-600">Loading team members...</span>
      </div>
    );
  }

  if (queryError) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">
            {queryError instanceof Error ? queryError.message : 'Failed to fetch team members'}
          </p>
          <Button onClick={handleRetry} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const members = teamMembers?.data || [];

  if (members.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No team members found.</p>
          <p className="text-sm text-gray-400 mt-2">Add your first team member using the form above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members ({members.length})</h2>
      <div className="grid gap-6">
        {members.map((member:any) => {
          const photoUrl = member.Photo?.url ? member.Photo.url : null;
          return (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {photoUrl ? (
                      <Image
                        width={64}
                        height={64}
                        src={photoUrl}
                        alt={member.Photo?.alternativeText || member.Name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {member.Name}
                        </h3>
                        <p className="text-primary font-medium mb-2">
                          {member.Role}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit?.(member)}
                          className="hover:bg-primary hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(member.id, member.Name)}
                          disabled={isDeleting && deletingId === member.id}
                        >
                          {isDeleting && deletingId === member.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <a
                          href={`mailto:${member.Email}`}
                          className="hover:text-primary truncate"
                        >
                          {member.Email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <a
                          href={`tel:${member.Phone}`}
                          className="hover:text-primary"
                        >
                          {member.Phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MessageCircle className="w-4 h-4 mr-2 text-gray-400" />
                        <a
                          href={`https://wa.me/${member.WhatsApp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400">
                        Added: {formatDate(new Date(member.createdAt))}
                        {member.updatedAt !== member.createdAt && (
                          <span className="ml-4">
                            Updated: {formatDate(new Date(member.updatedAt))}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}