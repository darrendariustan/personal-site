# Darren's Professional Portfolio & AI Twin

Welcome to my professional portfolio! This is a modern, responsive, and highly interactive web application built to showcase my career in GenAI, Business Analytics, and Cloud technologies. It features a sleek design and an integrated **AI Digital Twin** that allows visitors to "chat" with an AI version of me.

🌍 **Live Site**: [https://personal-site-ecru-xi.vercel.app/](https://personal-site-ecru-xi.vercel.app/)

---

## 🚀 Features

- **AI Digital Twin Chatbot**: An integrated, OpenAI-powered chatbot that acts as my digital twin. It securely answers questions about my skills, experience, and education, mimicking my professional persona.
- **Dynamic Data Rendering**: All portfolio projects, skills, and work experiences are decoupled from the UI and driven by a central JSON data layer (`src/data/resume.json`), making updates seamless.
- **Responsive & Accessible UI**: Built with accessibility in mind (ARIA labels, semantic HTML) and features a fully responsive mobile menu with Framer Motion slide-out animations.
- **Modern Design**: Utilises Tailwind CSS to implement a dark-themed, glassmorphism-inspired UI with smooth transitions and micro-interactions.
- **Production-Ready Security**: The API route powering the AI chatbot includes input validation, error masking, and an in-memory IP-based rate limiter to protect resources.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [OpenAI Node.js SDK](https://github.com/openai/openai-node) (gpt-4o-mini)
- **Deployment**: [Vercel](https://vercel.com)

---

## ⚙️ Local Development

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/darrendariustan/personal-site.git
cd personal-site
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root of the project and add your OpenAI API key. This is required for the AI chat widget to function.
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.

---

## 🔒 API Security Details

The `/api/chat` route is designed for production environments and includes:
- **Rate Limiting**: Restricts users to 10 requests per minute per IP address.
- **Strict Payload Validation**: Checks that the message array is under 20 items and enforces tight limits on message string length and character count.
- **Graceful Error Handling**: Wraps internal SDK/API errors to ensure backend details are never leaked to the client.

