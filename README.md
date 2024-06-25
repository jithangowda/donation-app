This is a mini project for 6th sem

cd to main folder

install all dependencies

```
npm install
```

create .env.local file in root

```
#get keys from clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=yourKey
CLERK_SECRET_KEY=yourKey

#this remains as it is
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#get key from supabase.com
NEXT_PUBLIC_SUPABASE_URL=yourKey
NEXT_PUBLIC_SUPABASE_API_KEY=yourKey

#get key from google maps API
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=yourKey
```

Run dev

```
npm run dev
```
