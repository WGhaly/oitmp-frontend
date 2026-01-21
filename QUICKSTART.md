# OITMP Frontend - Quick Start Guide

## 🎉 Your Application is Ready!

The complete OITMP frontend mockup has been created and is running at:
**http://localhost:3000**

## What You Have

✅ **Complete Application** with all 21 entities
✅ **Landing Page** with hero section
✅ **Login & Registration** pages
✅ **Dashboard** with statistics
✅ **Dynamic Entity Pages** for all entity types
✅ **Create, View, Edit, Delete** operations
✅ **Dependency-Aware Deletion** system
✅ **Responsive Design** (mobile, tablet, desktop)
✅ **Brand Colors** applied throughout

## Test the Application

### 1. Landing Page
- Visit: http://localhost:3000
- See hero section, features, statistics
- Click "Get Started" to go to login

### 2. Login Page
- Visit: http://localhost:3000/login
- See login form (not functional yet - needs backend)
- Click "Sign in" button

### 3. Dashboard
- Visit: http://localhost:3000/dashboard
- See statistics cards
- See recent activities
- See quick actions
- See entity overview grid

### 4. Entity Pages (Try these!)

Visit any entity page:
- http://localhost:3000/dashboard/user
- http://localhost:3000/dashboard/research
- http://localhost:3000/dashboard/invention-disclosure
- http://localhost:3000/dashboard/patent-utility
- http://localhost:3000/dashboard/fund
- ... and 16 more!

### 5. Test CRUD Operations

**Create:**
1. Go to any entity page
2. Click "Create New" button (top right)
3. Fill in the form
4. Click "Create"
5. See toast notification
6. See new record in table

**View:**
1. In the table, click Actions (three dots)
2. Click "View"
3. See detailed modal with all fields
4. Close modal

**Edit:**
1. In the table, click Actions
2. Click "Edit"
3. Change some values
4. Click "Update"
5. See changes in table

**Delete (with dependency checking):**
1. In the table, click Actions
2. Click "Delete"
3. If record has dependencies:
   - See red alert
   - See list of dependent records
   - Cannot delete
4. If no dependencies:
   - See yellow confirmation
   - Click "Delete" to confirm
   - Record removed

### 6. Test Dependency Checking

**Try this:**
1. Go to Users page: http://localhost:3000/dashboard/user
2. Try to delete "John Doe" (user u1)
3. You'll see it's referenced by:
   - Research projects
   - Invention disclosures
   - Patents
   - And more!
4. The system prevents deletion and shows all dependencies

### 7. Navigation

**Sidebar:**
- Click hamburger menu (mobile)
- Click any entity in the sidebar groups:
  - Research & Innovation
  - Intellectual Property
  - Assessments
  - Support Services
  - Funding
  - Industry Collaboration
- Each entity has its own page

**Dashboard Links:**
- From dashboard, click any entity card
- Direct navigation to entity page

## Explore the Code

### Key Files to Look At

1. **Dynamic Entity Page**: `app/dashboard/[entity]/page.tsx`
   - Handles ALL 21 entities
   - Just by changing the URL!

2. **Entity Metadata**: `lib/entities.ts`
   - Defines all entity fields
   - Contains mock data
   - Dependency checking logic

3. **Generic Form**: `components/forms/EntityForm.tsx`
   - One form component for all entities
   - Automatically generates fields

4. **Generic Table**: `components/tables/EntityTable.tsx`
   - One table component for all entities
   - Automatically shows columns

5. **Delete Modal**: `components/modals/DeleteConfirmation.tsx`
   - Smart dependency checking
   - Prevents cascade issues

## Next Steps (Backend Integration)

When you're ready to connect a backend:

1. **Replace Mock Data**
   - Update `lib/entities.ts`
   - Replace mockData with API calls

2. **Add API Service**
   - Create `lib/api.ts`
   - Add fetch functions for CRUD operations

3. **Add Authentication**
   - Implement NextAuth.js
   - Protect dashboard routes
   - Add JWT tokens

4. **Database Connection**
   - Create backend API
   - Connect to PostgreSQL/MySQL
   - Use entity definitions as schema

5. **File Uploads**
   - Integrate Cloudinary or S3
   - Handle file upload in forms
   - Store file URLs in database

## Customization

### Change Brand Colors
Edit `tailwind.config.ts`:
```typescript
extend: {
  colors: {
    brand: {
      navy: "#10112f",      // Change this
      blue: "#243996",      // Change this
      lightBlue: "#4a81f6", // Change this
    },
  },
}
```

### Add New Entity
1. Add interface in `lib/types.ts`
2. Add metadata in `lib/entities.ts`
3. Add label in `lib/constants.ts`
4. Add to sidebar group in `components/layout/Sidebar.tsx`
5. That's it! The dynamic page handles the rest.

### Modify Entity Fields
Edit `lib/entities.ts` → `entityMetadata` → find your entity → update `fields` array

### Change Entity Groups
Edit `components/layout/Sidebar.tsx` → `entityGroups` object

## Troubleshooting

### Server Not Running
```bash
cd frontend
npm run dev
```

### Dependencies Not Installed
```bash
cd frontend
npm install
```

### Port 3000 Already in Use
```bash
# Stop the current server (Ctrl+C)
# Or change port in package.json
"dev": "next dev -p 3001"
```

### Build for Production
```bash
npm run build
npm start
```

## Documentation

- **README.md** - Full project documentation
- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **This file** - Quick start guide

## Entity Reference

Quick URLs for all 21 entities:

1. http://localhost:3000/dashboard/user
2. http://localhost:3000/dashboard/entity
3. http://localhost:3000/dashboard/research
4. http://localhost:3000/dashboard/research-area
5. http://localhost:3000/dashboard/research-outputs
6. http://localhost:3000/dashboard/invention-disclosure
7. http://localhost:3000/dashboard/prior-art-search
8. http://localhost:3000/dashboard/patent-utility
9. http://localhost:3000/dashboard/design-right
10. http://localhost:3000/dashboard/know-how
11. http://localhost:3000/dashboard/license
12. http://localhost:3000/dashboard/tech-assessment
13. http://localhost:3000/dashboard/market-assessment
14. http://localhost:3000/dashboard/consultation
15. http://localhost:3000/dashboard/equipment
16. http://localhost:3000/dashboard/events
17. http://localhost:3000/dashboard/fund-type
18. http://localhost:3000/dashboard/fund
19. http://localhost:3000/dashboard/proposal
20. http://localhost:3000/dashboard/industry-challenge
21. http://localhost:3000/dashboard/challenge-solution

## Support

For any questions or issues:
1. Check README.md for detailed documentation
2. Check IMPLEMENTATION_SUMMARY.md for feature list
3. Review the code comments
4. Inspect browser console for errors

---

**Enjoy your new OITMP Frontend! 🚀**

Everything is working and ready to use!
