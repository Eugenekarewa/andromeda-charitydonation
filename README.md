# About
The Andromeda Next.js Application Starter is a base setup for developers to start building without having to worry about the prerequisites. Containing all the key parts needed, it allows you to set up in minutes and start working on your builds. The starter contains the following setups:
- Keplr integration
- Andromeda Client (Devnet)
- GraphQL integration
- Contract execution hooks 

Using this as a starting template, any developer can create their own nextjs application with custom embeddables that suit their needs.

This project specifically focuses on facilitating charity donations through a user-friendly interface, allowing users to create, manage, and contribute to various charitable campaigns.

## Features
- **Charity Campaign Management**: Create and manage campaigns for various charitable causes.
- **Donation Processing**: Securely process donations using blockchain technology.
- **User Authentication**: Integrate with Keplr for user authentication and wallet management.
- **Real-time Updates**: Get real-time updates on campaign progress and donation statistics.

**Notes**:
- It mainly uses Chakra UI, but developers can install any styling library, such as Tailwind, for example.
- This setup is currently using our Devnet (Testnet for Devs). If you encounter any issues connecting to the GraphQL or chain, please contact us for support.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

## Getting Started

First, run the development server:

```bash
npm i
# then 
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Usage
To use the charity donation features, navigate to the dashboard where you can create new campaigns, view existing ones, and make donations. Follow the on-screen instructions to complete your transactions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributing
We welcome contributions to this project! Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Licensing

[Terms and Conditions](https://github.com/andromedaprotocol/andromeda-core/blob/development/LICENSE/LICENSE.md)
