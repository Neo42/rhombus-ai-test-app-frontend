# Infer.io - Data Type Inference Tool

An web app that helps users infer and customize data types from CSV and Excel files.

## Features

- 📤 Drag & drop file upload (CSV, XLSX, XLS)
- 📊 Automatic data type inference
- 🔄 Polling for processing status
- ✏️ Custom data type overrides with validation
- 📋 Sample data preview

## Tech Stack

### Core

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: Zustand, TanStack Query
- **Form Validation**: Zod
- **File Upload**: react-dropzone
- **Toast**: sonner

### Configuration

- **Package Manager**: pnpm
- **Linter**: ESLint
- **Formatter**: Prettier
- **Git Hooks**: Husky, lint-staged
- **Commit Convention**: commitlint
- **Component Config**: shadcn/ui
- **Path Aliases**: TypeScript paths

## Project Structure

```

src/
├── app/
│ └── (upload)/ # Upload page route
├── components/
│ ├── providers/ # App providers
│ └── ui/ # Reusable UI components
├── features/
│ └── inference/ # Data inference feature
│ ├── api/ # API integration
│ ├── components/ # Feature-specific components
│ ├── hooks/ # Custom hooks
│ └── validations/ # Zod schemas for validation
└── lib/ # Utility functions

```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/infer.io.git
cd infer.io
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Key Components

### UploadDropzone

Handles file upload with drag & drop support and file type validation

### DataTable

Displays sample data with inferred types and allows type customization

### CustomDataTypeDialog

Modal for editing column data types with validation

## State Management

The application uses a combination of Zustand stores for client state:

- `useFile`: Manages uploaded file state
- `useCustomType`: Handles custom type editing
- `useToggleDialog`: Controls dialog visibility

TanStack Query is used for server state management and data fetching:

- `useFileData`: Fetches and polls file processing status
- `useUpload`: Handles file upload mutation
- `useUpdateCustomType`: Manages custom type updates

## API Integration

The app communicates with a backend API for:

- File upload
- Data type inference
- Custom type overrides
- Sample data retrieval

## Limitations

- Didn't implement display of all data
