# Next.js Client and Server Components Guide

## Overview

Next.js 13+ introduced a new model for rendering components: Server Components and Client Components. Understanding the difference between these two types of components is crucial for developing properly functioning Next.js applications.

## Server Components (Default)

In Next.js, all components are Server Components by default. They:

- Run only on the server and the HTML is rendered and sent to the client
- Cannot use browser APIs or React hooks that rely on browser functionality
- Can directly access server resources (databases, file system, etc.)
- Reduce client-side JavaScript bundle size
- Allow data fetching directly within the component

## Client Components

Client Components run on both the server (for initial HTML) and client (for hydration). They:

- Must be explicitly marked with the `'use client'` directive at the top of the file
- Can use browser APIs, event listeners, and React hooks
- Can maintain state and handle user interactions
- Cannot directly access server resources

## When to Use Each

### Use Server Components For:

- Static/dynamic pages that don't require client-side interactivity
- Data fetching directly from databases or APIs
- Keeping sensitive information (API keys, etc.) on the server
- Accessing backend resources directly

### Use Client Components For:

- Interactive UI elements that need to respond to user events
- Components using React hooks like `useState`, `useEffect`, `useContext`
- Components using browser-only APIs like `localStorage`, `window`, etc.
- Third-party libraries that rely on browser APIs

## Common Issues and How to Avoid Them

### Issue: "Attempted to call X from the server but X is on the client"

This error occurs when trying to use client-side functionality (hooks, browser APIs) in a server component.

#### Solution:

1. Add `'use client'` at the top of the file if the component needs client functionality
2. Split your component into client and server parts if possible
3. Consider passing data down from server components to client components

### Issue: Hydration Errors

These occur when the server-rendered HTML doesn't match what React expects during client hydration.

#### Solution:

1. Make state initialization consistent between server and client
2. Use `suppressHydrationWarning` for intentional differences (like timestamps)
3. Use dynamic imports with `{ ssr: false }` for purely client components

### Issue: Context Providers Not Working

Server components cannot participate in context.

#### Solution:

1. Move context providers to Client Components (with `'use client'`)
2. Create a layout or higher-order component for context providers

## Best Practices

1. **Component Organization**:
   - Keep most components as server components when possible
   - Create specific client components for interactive parts
   - Use a naming convention to identify client components (e.g., prefix with "Client" or suffix with ".client")

2. **Proper Data Flow**:
   - Fetch data in server components
   - Pass data as props to client components
   - Use React Context in client components for state that needs to be shared

3. **File Structure Strategies**:
   - Group client components together in a '/client' directory
   - Co-locate client components with their server counterparts
   - Split large components into server/client pairs

4. **Using Libraries**:
   - Check if libraries are compatible with Server Components
   - Consider alternatives designed for the server-first approach
   - Use dynamic imports for client-only dependencies

## Examples

### Client Component (Interactive)

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### Server Component (Data Fetching)

```tsx
// No 'use client' directive
import { db } from '@/lib/db';

export async function UserProfile({ userId }: { userId: string }) {
  const user = await db.users.findUnique({ where: { id: userId } });
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Mixing Server and Client Components

```tsx
// UserProfilePage.tsx (Server Component)
import { db } from '@/lib/db';
import { UserSettings } from './UserSettings';

export default async function UserProfilePage({ userId }: { userId: string }) {
  const user = await db.users.findUnique({ where: { id: userId } });
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {/* Pass data to client component */}
      <UserSettings user={user} />
    </div>
  );
}

// UserSettings.tsx (Client Component)
'use client';

import { useState } from 'react';
import type { User } from '@/types';

export function UserSettings({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
      {/* Editing UI */}
    </div>
  );
}
```

## Conclusion

Understanding the distinction between Server and Client Components is fundamental to building efficient Next.js applications. By properly separating concerns and following the patterns described in this guide, you can leverage the benefits of both approaches and avoid common pitfalls. 