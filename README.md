# CA Monk - Blog Application Assignment

Welcome to the CA Monk Blog Application assignment! This project tests your ability to build a modern React application with state management, styling, and component libraries.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Git
- React.js knowledge
- Familiarity with TanStack Query, Tailwind CSS, and shadcn/ui.

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrDeepakk/Frontend-Interview.git
   cd Frontend-Interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

  3. ## ⭐ Development Notes

- The project uses JSON Server for local API mocking.
- Running `npm run dev` starts both:
 ```bash
  npm run dev
  ```
  - Vite development server (http://localhost:5173)
  - JSON Server (http://localhost:3001)
- API base URL is centralized to allow seamless switch to a real backend.


4. **Start the JSON Server explicitly (only if `npm run dev` does not work)**

If the backend server does not start automatically with `npm run dev`, you can start it manually using:
   ```bash
   npm run server
   ```
   The API will run on `http://localhost:3001`

5. **Start the Development Server (in a new terminal)**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## Assignment Tasks

You are required to build a blog application with the following features:

### Required Technologies
- ✅ **TanStack Query** - For server state management and data fetching
  - 📚 [Documentation](https://tanstack.com/query/latest)
- ✅ **Tailwind CSS** - For styling
  - 📚 [Documentation](https://tailwindcss.com/docs)
- ✅ **shadcn/ui** - For UI components
  - 📚 [Documentation](https://ui.shadcn.com/)

## UI Reference

Here's a reference design for the blog application layout:

![Blog Reference](image.png)

**Left Panel:** Blog list view showing blog cards with category, title, and description  
**Right Panel:** Blog detail view displaying cover image, full content

UI IMAGE - ![UI-refernece](ui.jpeg)

> **Note:** This is just a reference design. Your implementation does not have to look exactly like this. 

For the blog content, use plain text — no need to use HTML-formatted text.

### Tasks to Complete

#### 1. **Get All Blogs**
- Create a component to display all blogs using `GET /blogs`
- Use TanStack Query for data fetching
- Handle loading and error states

#### 2. **Get Blog by ID**
- Implement single blog view using `GET /blogs/:id`
- Use TanStack Query for data fetching

#### 3. **Create a New Blog**
- Build a form to create a new blog using `POST /blogs`
- Invalidate queries after successful creation

> Organize your components in a suitable file structure within the `src/` directory.

### API Endpoints

The JSON Server provides the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/:id` | Get a specific blog by ID |
| POST | `/blogs` | Create a new blog |

### Evaluation Criteria

Your submission will be evaluated on:
- ✅ Correct implementation of TanStack Query hooks
- ✅ Proper use of Tailwind CSS for styling
- ✅ Integration of shadcn/ui components
- ✅ Code organization and structure
- ✅ Error handling and loading states
- ✅ Responsive design []
- ✅ User experience and UI polish



## Sample Blog Object

```json
{
  "id": 1,
  "title": "Future of Fintech",
  "category": ["FINANCE", "TECH"],
  "description": "Exploring how AI and blockchain are reshaping financial services",
  "date": "2026-01-11T09:12:45.120Z",
  "coverImage": "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
  "content": "Full blog content..."
}
```

description: A short summary of the blog  
content: The full content of the blog

## Tips

- Set up TanStack Query's `QueryClientProvider` in your app root
- Configure Tailwind CSS properly in your config files
- Use shadcn components like `Card`, `Button`, `Input`, etc.
- Handle loading states with skeletons
- Implement proper error boundaries
- Consider using React Router for navigation (optional)

## Submission

Once you've completed the assignment:
1. Ensure all tasks are working correctly
2. Commit your changes with clear commit messages
3. Push to your repository
4. Share the repository link for review in the google form provided

## FAQ

**Do I need to deploy the code?**  
No. Simply clone the repository, commit and push your changes, and share the repository link via the Google Form.

**Is it mandatory to use TypeScript and TanStack Query?**  
Yes, using both TypeScript and TanStack Query is compulsory for this assignment.

**Is using JSON Server mandatory, or can I create my own server?**  
Using JSON Server is mandatory. Please use the provided JSON Server setup rather than creating your own backend.

**What should I use for styling?**  
Use **Tailwind CSS** and **shadcn/ui** for styling. You are expected to install, configure, and use both Tailwind CSS and shadcn/ui components in your implementation.

**Have more questions?**  
If you have any additional doubts, feel free to reach out at: `developer@camonk.com`.


Good luck! 🚀
