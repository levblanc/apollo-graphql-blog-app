<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/levblanc/apollo-graphql-blogify">
    <img src="./doc/images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Blogify</h3>

  <p align="center">
    A blog created with Next.js (Typescript), Apollo GraphQL Server,<br/> Prisma, Nexusjs, PostgreSQL and Mantine UI
    <br />
    <a href="https://apollo-graphql-blogify.vercel.app/"><strong>View Demo »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Twitter@levblanc][twitter]](https://twitter.com/levblanc)
[![levblanc@gmail.com][gmail]](mailto:levblanc@gmail.com)

<br />

<!-- ABOUT THE PROJECT -->
## Overview

This is a demo project I built to demo my fullstack skills.

### Features 

- [x] User sign up / login / logout
- [x] Post create (with authentication protection)
- [x] Post update (with authentication protection)
- [x] Post publish (with authentication protection)
- [x] Post un-publish (with authentication protection)
- [x] Post delete (with authentication protection)
- [x] User profile (view only)
- [x] Theme Swither (dark / light themems)

### Tech Stack

» Frameworks

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![Typescript][Typescript]][Typescript-url]

» Back End

[![PostgreSQL][PostgreSQL]][PostgreSQL-url]
[![Prisma][Prisma.io]][Prisma-url]
[![Apollo GraphQL][Apollo GraphQL]][ApolloGraphQL-url]
[![Nexusjs][Nexusjs]][Nexusjs-url]

» Front End 

[![Mantine UI][Mantine]][Mantine-url]

## Screenshot Preview

» Light Theme
[![blogify-light](./doc/images/blogify-light.png 'Blofigy Light Theme')](https://apollo-graphql-blogify.vercel.app/)

» Dark Theme
[![blogify-dark](./doc/images/blogify-dark.png 'Blofigy Dark Theme')](https://apollo-graphql-blogify.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- NodeJS: v16+
- Npm / Yarn
- PostgreSQL: v14+
- NextJS: v13+

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/levblanc/apollo-graphql-blogify.git
   ```
2. Install NPM packages
   ```sh
   npm install

   # OR

   yarn install
   ```
3. Set up your `JWT_SIGNATURE` & `DATABASE_URL` in `.env` file (create one under project root)
   ```env
   DATABASE_URL=postgresql://test:test@localhost:5432/test
   JWT_SIGNATURE=jwtsignature
   ```

4. Prototype your DB with prisma:
    ```sh
    npx prisma db push

    # OR

    yarn prisma db push
    ```

5. Run the app, then open browser on `http://localhost:3000`
   ```sh
   npm run dev
   
   #OR

   yarn dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- https://www.markdownguide.org/asic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin
[linkedin-url]: https://linkedin.com/in/linkedin_username
[twitter]: https://img.shields.io/badge/twitter@levblanc-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white
[gmail]:
  https://img.shields.io/badge/levblanc@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]:
  https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Mantine]: https://custom-icon-badges.demolab.com/badge/mantine%20ui-181A1F?style=for-the-badge&logo=mantine-ui
[Mantine-url]: https://mantine.dev/
[Prisma.io]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Apollo GraphQL]: https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=for-the-badge&logo=apollographql&logoColor=white
[ApolloGraphQL-url]: https://www.apollographql.com/docs/apollo-server
[Nexusjs]: https://custom-icon-badges.demolab.com/badge/nexus%20js-black?style=for-the-badge&logo=nexus-js
[Nexusjs-url]: https://nexusjs.org/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
