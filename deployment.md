# Vercel Deployment Checklist

Follow these targeted steps to prepare your Next.js application for production and hook it up to Vercel for live hosting.

## Phase 1: Local Production Verification
Before hooking up to Vercel, verify that the application builds correctly in a production environment locally.

- `[ ]` **Lint the Codebase**: Run `npm run lint` in your terminal to catch any syntax or React hook errors.
- `[ ]` **Create a Production Build**: Run `npm run build`. Next.js will compile all your components, build your CSS, and generate static pages where possible. 
  > [!TIP]
  > Check the terminal output to ensure the `/api/chat` route is marked with a `ƒ` (Dynamic/Server-rendered) and other pages are marked with a `○` (Static).
- `[ ]` **Test the Production Build Locally**: Run `npm start`. This will spin up the exact compiled version of your app that Vercel will host. Open your browser to `http://localhost:3000` and test the chat widget to ensure it works outside of dev mode.

## Phase 2: Source Control (Git & GitHub)
Vercel integrates seamlessly with GitHub to provide Continuous Deployment (CD). Every time you push code, Vercel will automatically build and deploy it.

- `[ ]` **Initialize Git** (if you haven't already):
  ```bash
  git init
  git add .
  git commit -m "Initial commit - Ready for production"
  ```
- `[ ]` **Create a GitHub Repository**: Go to [GitHub](https://github.com/), create a new empty repository (e.g., `darren-portfolio`).
- `[ ]` **Push your code**: Link your local folder to GitHub and push:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
  git branch -M main
  git push -u origin main
  ```

## Phase 3: Hooking up to Vercel
Now that your code is on GitHub, deploying to Vercel takes just a few clicks.

- `[ ]` **Log into Vercel**: Create a free account at [Vercel.com](https://vercel.com/) and connect your GitHub account.
- `[ ]` **Import Project**: On your Vercel dashboard, click **"Add New..." > "Project"**.
- `[ ]` **Select Repository**: Find the repository you just pushed to GitHub and click **"Import"**.
- `[ ]` **Configure Build Settings**:
  - Vercel will automatically detect that you are using **Next.js**. 
  - Leave the Build Command and Output Directory as their defaults.
- `[ ]` **Set Environment Variables**: 
  > [!IMPORTANT]
  > **Crucial Step:** Your `/api/chat` route will crash in production if it doesn't have your OpenAI API key!
  - In the "Environment Variables" section, add a new variable:
    - **Name**: `OPENAI_API_KEY`
    - **Value**: *(Paste your secret OpenAI API key here)*
- `[ ]` **Deploy**: Click the **"Deploy"** button.

## Phase 4: Verification & Manual Vercel CLI (Optional)
Once Vercel finishes building (usually under 2 minutes), it will provide you with live preview URLs and a main production domain.

- `[ ]` **Verify the Live Site**: Visit your new `.vercel.app` domain. Test the mobile menu, portfolio links, and specifically send a message to your AI Twin to verify that the OpenAI API key was injected correctly.

---
## Alternative: Direct Deployment via Vercel CLI
If you prefer to push code directly from your terminal *without* using GitHub, you can skip Phase 2 and 3 and use the Vercel CLI instead:
- `[ ]` **Install the CLI**: Open your terminal and run `npm i -g vercel`.
- `[ ]` **Log In**: Run `vercel login` and follow the prompts to authenticate your account in the browser.
- `[ ]` **Initialize the Project**: Run `vercel` in your project root directory (`site/`). Follow the interactive prompts:
  - Set up and deploy? -> `Y`
  - Link to existing project? -> `N`
  - Directory? -> `./`
  *(This will create a Preview deployment without the API key.)*
- `[ ]` **Add Environment Variables**: Since the AI chat needs the API key, add it securely via the CLI:
  ```bash
  vercel env add OPENAI_API_KEY production
  ```
  *(Paste your secret API key when prompted).*
- `[ ]` **Deploy to Production**: Trigger a final production build to make your environment variable live:
  ```bash
  vercel --prod
  ```
- `[ ]` **Verify**: Vercel will output your final production `.vercel.app` URL. Visit it and test your AI Twin!
