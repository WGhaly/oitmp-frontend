# OITMP Frontend - Office of Innovation and Technology Management Platform

A comprehensive Next.js frontend application for managing innovation and technology transfer operations.

## Features

- **21 Entity Types** with full CRUD operations
- **Dynamic Entity Pages** - Single page component handles all entity types
- **Dependency-Aware Deletion** - Prevents deletion of records with dependencies
- **Metadata-Driven Architecture** - Forms and tables generated from entity metadata
- **Modern UI** with Tailwind CSS and Shadcn UI components
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Brand Colors** - Custom styling with organizational colors

## Technology Stack

- **Framework**: Next.js 15.1.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form (configured)
- **Validation**: Zod (configured)
- **Icons**: Lucide React
- **Notifications**: Sonner

## Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── register/page.tsx       # Registration page
│   ├── dashboard/
│   │   ├── [entity]/page.tsx       # Dynamic entity page (handles all 21 entities)
│   │   ├── layout.tsx              # Dashboard layout with sidebar
│   │   └── page.tsx                # Dashboard home with stats
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   └── globals.css                 # Global styles
├── components/
│   ├── forms/
│   │   └── EntityForm.tsx          # Generic form component
│   ├── layout/
│   │   ├── Header.tsx              # Top navigation bar
│   │   └── Sidebar.tsx             # Collapsible sidebar navigation
│   ├── modals/
│   │   ├── DeleteConfirmation.tsx  # Dependency-aware delete modal
│   │   └── EntityModal.tsx         # View/Edit modal
│   ├── tables/
│   │   └── EntityTable.tsx         # Generic table component
│   └── ui/                         # Shadcn UI components
├── lib/
│   ├── constants.ts                # Brand colors, entity labels
│   ├── entities.ts                 # Entity metadata and mock data
│   ├── types.ts                    # TypeScript type definitions
│   └── utils.ts                    # Utility functions
└── package.json
```

## Entity Types

The system manages 21 different entity types organized into 6 categories:

### Research & Innovation
- User
- Entity
- Research
- Research Area
- Research Outputs

### Intellectual Property
- Invention Disclosure
- Prior Art Search
- Patent Utility
- Design Right
- Know-How
- License

### Assessments
- Technology Assessment
- Market Assessment

### Support Services
- Consultation
- Equipment
- Events

### Funding
- Fund Type
- Fund
- Proposal

### Industry Collaboration
- Industry Challenge
- Challenge Solution

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Key Features

### Dynamic Entity Management

All entity pages are handled by a single dynamic route (`/dashboard/[entity]/page.tsx`) that:
- Loads entity metadata and data based on the URL parameter
- Renders appropriate tables and forms
- Handles CRUD operations with proper state management

### Intelligent Deletion

The delete confirmation modal:
- Checks for dependent records before deletion
- Displays a list of all dependencies grouped by entity type
- Prevents deletion if dependencies exist
- Shows user-friendly messages explaining the dependencies

### Generic Components

- **EntityTable**: Displays any entity's data with search, sorting, and actions
- **EntityForm**: Renders forms dynamically based on entity field metadata
- **EntityModal**: Handles view and edit modes with proper formatting

### Field Types Supported

- Text inputs (text, email, number, date)
- Textareas for long text
- Booleans (checkboxes)
- Select dropdowns
- Foreign key relationships (single select)
- Multi-foreign key relationships (checkbox list)
- File uploads (single and multiple)

## Brand Colors

The application uses the following brand colors:

- **Navy**: `#10112f` - Primary brand color
- **Blue**: `#243996` - Secondary brand color
- **Light Blue**: `#4a81f6` - Accent color
- **White**: `#ffffff` - Background
- **Black**: `#161616` - Text

These are configured in `tailwind.config.ts` and available as:
- `bg-brand-navy`, `text-brand-navy`
- `bg-brand-blue`, `text-brand-blue`
- `bg-brand-lightBlue`, `text-brand-lightBlue`

## Mock Data

The application includes mock data for demonstration:
- 3 Users
- 3 Entities
- 2 Research Areas
- 2 Research Projects
- And sample records for other entity types

Mock data is defined in `/lib/entities.ts` and includes proper relationships between entities.

## State Management

Currently using React's built-in state management with:
- `useState` for local component state
- Props for data passing
- Mock data stored in memory

For production, consider implementing:
- Server state management (React Query/SWR)
- API integration
- Database persistence

## Future Enhancements

- [ ] Real API integration
- [ ] User authentication and authorization
- [ ] Role-based access control
- [ ] Advanced search and filtering
- [ ] Export functionality (CSV, Excel, PDF)
- [ ] Bulk operations
- [ ] Audit trail
- [ ] File upload to cloud storage
- [ ] Email notifications
- [ ] Reporting and analytics
- [ ] Dark mode support

## Development Guidelines

### Adding a New Entity

1. Define TypeScript interface in `/lib/types.ts`
2. Add entity metadata in `/lib/entities.ts` with fields configuration
3. Add mock data (optional)
4. Add entity label in `/lib/constants.ts`
5. Add to appropriate group in Sidebar component

The dynamic routing will automatically handle the new entity!

### Styling Guidelines

- Use Tailwind utility classes
- Follow the brand color scheme
- Maintain consistent spacing (gap-4, p-4, etc.)
- Use provided UI components from `/components/ui`

## License

Proprietary - Office of Innovation and Technology Management

## Support

For questions or issues, contact the development team.
