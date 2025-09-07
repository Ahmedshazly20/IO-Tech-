const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export const strapiApi = {
  // Create team member with file upload
  async createTeamMember(formData: FormData) {
    const response = await fetch(`${STRAPI_URL}/api/ourteams`, {
      method: 'POST',
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to create team member');
    }

    return response.json();
  },

  // Get all team members
  async getTeamMembers() {
    const response = await fetch(`${STRAPI_URL}/api/ourteams?populate=photo`, {
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team members');
    }

    return response.json();
  },

  // Get single team member
  async getTeamMember(id: string) {
    const response = await fetch(`${STRAPI_URL}/api/ourteams/${id}?populate=photo`, {
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team member');
    }

    return response.json();
  },

  // Update team member
  async updateTeamMember(id: string, formData: FormData) {
    const response = await fetch(`${STRAPI_URL}/api/ourteams/${id}`, {
      method: 'PUT',
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to update team member');
    }

    return response.json();
  },

  // Delete team member
  async deleteTeamMember(id: string) {
    const response = await fetch(`${STRAPI_URL}/api/ourteams/${id}`, {
      method: 'DELETE',
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete team member');
    }

    return response.json();
  },
};

export { STRAPI_URL };