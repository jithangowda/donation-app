# Donatory

This is a mini project for the 6th semester.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/donation-app.git
   ```

2. **Navigate to the main folder:**

   ```bash
   cd donation-app/
   ```

3. **Install all dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env.local` file in the root directory:**

   ```bash
   touch .env.local
   ```

5. **Add the following environment variables to [`.env.local`]:**

   ```env
   # Get keys from clerk.com
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=yourKey
   CLERK_SECRET_KEY=yourKey

   # This remains as it is
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Get URL and keys from supabase.com
   NEXT_PUBLIC_SUPABASE_URL=yourURL
   NEXT_PUBLIC_SUPABASE_API_KEY=yourKey

   # Get Google Maps keys
   NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=yourKey

   # Paste URL from supabase bucket named listingImages
   NEXT_PUBLIC_IMAGE_URL=yourURL
   ```

### Supabase Schema

1. **Table: listing**
   _✅ Enable Row Level Security (RLS)_

   | Name          | Type        | Default Value | Primary | Extra Option           |
   | ------------- | ----------- | ------------- | ------- | ---------------------- |
   | id            | int8        | ❌            | ✅      | Is Identity            |
   | created_at    | timestamptz | now()         | ❌      | ❌                     |
   | address       | varchar     | ❌            | ❌      | Is Nullable, Is Unique |
   | coordinates   | json        | ❌            | ❌      | Is Nullable            |
   | created_by    | varchar     | ❌            | ❌      | ❌                     |
   | active        | bool        | false         | ❌      | Is Nullable            |
   | description   | varchar     | ❌            | ❌      | Is Nullable            |
   | donationNeeds | varchar     | ❌            | ❌      | Is Nullable            |
   | donationType  | varchar     | ❌            | ❌      | Is Nullable            |
   | driveName     | varchar     | ❌            | ❌      | Is Nullable            |
   | organizerType | varchar     | ❌            | ❌      | Is Nullable            |
   | profileImage  | varchar     | ❌            | ❌      | Is Nullable            |
   | userName      | varchar     | ❌            | ❌      | Is Nullable            |
   | enddate       | date        | ❌            | ❌      | Is Nullable            |
   | startDate     | date        | ❌            | ❌      | Is Nullable            |

2. **Table: listingImages**
   _✅ Enable Row Level Security (RLS)_

   | Name       | Type        | Default Value | Primary | Extra Option |
   | ---------- | ----------- | ------------- | ------- | ------------ |
   | id         | int8        | ❌            | ✅      | Is Identity  |
   | created_at | timestamptz | now()         | ❌      | ❌           |
   | url        | varchar     | ❌            | ❌      | Is Nullable  |
   | listing_id | int8        | ❌            | ❌      | Is Nullable  |

3. **Create Buctket: listingImages**

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Features

- **User Authentication**: Integrated with Clerk for user sign-in and sign-up.
- **Data Management**: Utilizes Supabase for backend data storage and management.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

- [Clerk](https://clerk.com) for authentication services.
- [Supabase](https://supabase.com) for backend services.
