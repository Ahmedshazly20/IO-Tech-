# Redux Toolkit + RTK Query Implementation

This directory contains the Redux Toolkit setup with RTK Query for fetching data from Strapi CMS.

## Files Structure

```
src/store/
├── store.ts                 # Main Redux store configuration
├── api/
│   └── apiSlice.ts         # RTK Query API slice with all endpoints
└── README.md               # This file

src/types/
└── strapi.ts               # TypeScript types for Strapi API responses
```

## API Endpoints

The API slice includes the following endpoints:

### Services
- `getServices` - Fetch all services with populated relations
- `getServiceById` - Fetch a single service by ID

### Team Members
- `getTeamMembers` - Fetch all team members with populated relations
- `getTeamMemberById` - Fetch a single team member by ID

## Usage

### 1. Import the hooks

```typescript
import { 
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetTeamMembersQuery,
  useGetTeamMemberByIdQuery 
} from '../store/api/apiSlice';
```

### 2. Use in components

```typescript
const { data, error, isLoading } = useGetServicesQuery();

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error occurred</div>;
if (!data) return <div>No data</div>;

return (
  <div>
    {data.data.map(service => (
      <div key={service.id}>
        <h3>{service.attributes.title}</h3>
        <p>{service.attributes.description}</p>
      </div>
    ))}
  </div>
);
```

### 3. Handle different states

- `isLoading` - Shows loading state
- `error` - Contains error information
- `data` - Contains the fetched data

## Data Structure

The API returns data in Strapi v4 format:

```typescript
{
  data: [
    {
      id: 1,
      attributes: {
        title: "Service Title",
        description: "Service Description",
        photo: {
          data: {
            attributes: {
              url: "/uploads/photo.jpg"
            }
          }
        }
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 1
    }
  }
}
```

## Image URLs

For images, prefix with the Strapi base URL:

```typescript
const imageUrl = `http://localhost:1337${photo.data.attributes.url}`;
```

## Caching

RTK Query automatically caches responses and provides:
- Automatic refetching
- Background updates
- Optimistic updates
- Request deduplication

## Example Components

See the example components in:
- `src/components/ServicesList.tsx`
- `src/components/TeamList.tsx`
- `src/components/examples/ServiceExample.tsx`
- `src/components/examples/TeamMemberExample.tsx`

Visit `/examples` to see all components in action.
