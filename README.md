# Nutrition Subscriber Platform

A secure bilingual nutrition subscriber portal built with Next.js, Supabase and Stripe.

## What is included

- Email/password sign up and login
- English/Russian language switching
- Subscriber-only dashboard
- Subscription-gated content pages
- Stripe Checkout subscription flow
- Stripe billing portal
- Stripe webhook subscription sync
- Admin-only content area
- Admin create/edit/delete/publish content
- Supabase SQL schema with row-level security

## 1. Install locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## 2. Create Supabase project

Create a Supabase project, then go to **Project Settings > API** and copy:

- Project URL
- Anon public key
- Service role key

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_PRICE_ID=price_xxx
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` publicly.

## 3. Create the database tables

In Supabase, open **SQL Editor** and run the full contents of:

```text
supabase-schema.sql
```

This creates:

- `profiles`
- `subscriptions`
- `content_items`
- row-level security policies
- automatic profile creation when a user signs up

## 4. Make yourself admin

Sign up once through the website. Then in Supabase SQL Editor run:

```sql
update public.profiles
set role = 'admin'
where email = 'your@email.com';
```

After that, visit:

```text
/admin
```

You can now add, edit, publish and delete content.

## 5. Create Stripe subscription product

In Stripe Dashboard:

1. Go to **Product catalog**.
2. Create a product, e.g. `Nutrition Portal Subscription`.
3. Add a recurring monthly price.
4. Copy the price ID. It starts with `price_`.
5. Put it into `.env.local` as `STRIPE_PRICE_ID`.

## 6. Add Stripe webhook locally

Install Stripe CLI, then run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Stripe will show a webhook signing secret beginning with `whsec_`. Put that into:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

The webhook listens for:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

This is what unlocks or removes subscriber access.

## 7. Test the payment flow

1. Sign up at `/signup`.
2. Log in.
3. Go to `/pricing`.
4. Click subscribe.
5. Use Stripe test card:

```text
4242 4242 4242 4242
Any future expiry
Any CVC
```

After checkout, Stripe sends the webhook, the `subscriptions` table updates, and `/dashboard` unlocks.

## 8. Upload nutrition content

As admin, go to:

```text
/admin/new
```

Add:

- slug
- category
- English title/body
- Russian title/body
- publish status

Only published materials appear to subscribers.

## 9. Deploy to Vercel

1. Push the project to GitHub.
2. Import the GitHub repo into Vercel.
3. Add all environment variables in Vercel.
4. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
5. Deploy.

## 10. Add production Stripe webhook

In Stripe Dashboard:

1. Go to **Developers > Webhooks**.
2. Add endpoint:

```text
https://yourdomain.com/api/stripe/webhook
```

3. Select the subscription events listed above.
4. Copy the production webhook secret into Vercel as `STRIPE_WEBHOOK_SECRET`.

## Important notes

- View-only content cannot be made impossible to copy. Screenshots always remain possible.
- This MVP protects access and disables public indexing, but serious commercial launch should include legal terms, privacy policy, refund policy and nutrition disclaimers.
- Stripe handles card security. Do not store card details yourself.
