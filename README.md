# Fantasy Sports Application 

## 📄 Project Overview

This project is a responsive web application simulating a fantasy sports team-building experience, developed as an assignment. It allows users to browse upcoming cricket matches, create personalized teams of 11 players based on specific constraints, and manage their selections. The application demonstrates proficiency in modern frontend development practices, state management, API integration, and responsive design.

The core functionalities provided in this application include:
*   Displaying a list of upcoming matches.
*   Allowing users to select 11 players for a match with various restrictions (e.g., player roles, credits, max players per real-life team).
*   Assigning a Captain and Vice-Captain to the created team.
*   Managing multiple created teams (edit, delete, preview).
*   Registering teams for contests.

## ✨ Features Implemented

*   **Dynamic Match Listing:** Fetches and displays upcoming cricket matches from a provided API endpoint.
*   **Intuitive Player Selection:**
    *   Users can select up to 11 players for their team.
    *   **Real-time Validation:** Implements complex business logic for player selection, including:
        *   Maximum of 7 players from a single real-life team.
        *   Total team credit limit (100 credits).
        *   Specific player role distribution requirements (e.g., 3-7 Batsmen, 1-5 Wicket-Keepers, 0-4 All-Rounders, 3-7 Bowlers).
        *   Clear toast messages guide the user through validation rules.
    *   **Player Filtering:** Filter players by role and team for easier selection.
    *   **Progress Visualization:** Visual progress bar and team stats (players selected, credits left) update in real-time.
*   **Captain & Vice-Captain Assignment:** Enables users to designate a Captain (2x points) and Vice-Captain (1.5x points) from their selected 11 players.
*   **Comprehensive Team Management:**
    *   **Create New Team:** Start a fresh team for any match.
    *   **Edit Existing Team:** Load a previously saved team for modification.
    *   **Delete Team:** Remove a team with a confirmation dialog.
    *   **Team Preview:** View a detailed summary of any created team in a modal.
    *   **Multi-Team Registration:** Select and register one or more teams for a contest with dynamic pricing.
*   **Persistent State Management:** User-created teams and selections are persisted locally using `redux-persist`, ensuring data is saved across browser sessions.
*   **Responsive User Interface:** Designed to provide an optimal viewing and interaction experience across a wide range of devices (mobile, tablet, desktop) without compromising the mobile-first design.

## 💻 Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) - Chosen for its strong developer experience, server-side rendering capabilities and efficient build process.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid and consistent UI development, ensuring a clean and modern design.
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) - Reusable and accessible UI components, integrated for a polished look and feel.
*   **State Management:**
    *   [Redux Toolkit](https://redux-toolkit.js.org/) - Simplifies Redux development, providing a robust and scalable solution for managing application state.
    *   [Redux Persist](https://github.com/rt2zz/redux-persist) - Integrates with Redux to persist and rehydrate the Redux store, maintaining user data across sessions.
*   **Data Fetching & Caching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) - Manages server state, asynchronous data fetching, caching, and synchronization, improving performance and developer experience.
*   **Icons:** [Lucide React](https://lucide.dev/icons/) - A collection of beautiful and customizable open-source icons.

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sumitbairola/fantasy-sports.git
    cd fantasy-sports
    ```

2.  **Install dependencies:**
    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Install Shadcn UI components:**
    This project uses several Shadcn UI components. Ensure they are installed in your project:
    ```bash
    npx shadcn-ui@latest init
    npx shadcn-ui@latest add button
    npx shadcn-ui@latest add toast
    npx shadcn-ui@latest add alert-dialog
    npx shadcn-ui@latest add dialog
    npx shadcn-ui@latest add dropdown-menu
    ```

4.  **Environment Variables:**
    This project primarily uses publicly accessible API endpoints. If you were to integrate private APIs, you would create a `.env.local` file in the root of your project:
    ```
    # Example .env.local (no sensitive keys required for this assignment)
    # NEXT_PUBLIC_EXAMPLE_API_URL=https://api.example.com
    ```

5.  **Run the development server:**
    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Important Note on Local Storage & State Persistence

This application leverages `redux-persist` to store the user's created teams in the browser's local storage. If you modify the Redux state structure (`src/types/index.ts` or `src/store/slices/teamSlice.ts`) and encounter unexpected behavior or data inconsistencies, it is recommended to clear your browser's local storage for your application's domain.

**How to clear local storage (e.g., in Chrome/Edge/Firefox):**
1.  Open Developer Tools (usually `F12` or `Ctrl+Shift+I` on Windows/Linux; `Cmd+Option+I` on macOS).
2.  Go to the "Application" tab (or "Storage" in Firefox).
3.  Under "Storage", expand "Local Storage".
4.  Find your application's domain (e.g., `localhost:3000` for local development).
5.  Right-click on it and select "Clear" or "Delete All".
6.  Refresh your application page.

## 🌐 Deployment

The application is configured for seamless deployment to [Vercel](https://vercel.com/). You can deploy by connecting your GitHub repository directly to Vercel. Vercel will automatically detect the Next.js framework and handle the build process. Ensure any environment variables are configured in your Vercel project settings if applicable.

## 💡 Usage Guide

*   **Home Page:** Displays a list of upcoming matches. You can switch between different sports (Cricket is currently functional). Clicking on a match card navigates to the team management page for that specific match.
*   **My Teams Page:** Shows all teams you've created for the selected match.
    *   **"Create Team"**: Starts the process of building a new team.
    *   **Edit (Pencil icon)**: Loads an existing team into the player selection flow for modifications.
    *   **Delete (Trash icon)**: Removes a team after a confirmation prompt.
    *   **Preview (Button)**: Opens a modal with a detailed overview of the team.
    *   **Checkboxes & "Register Team" Button**: Select multiple teams to register them for a contest, with the total cost dynamically updated.
*   **Pick Players Page:** This is where you assemble your 11-player squad.
    *   **Team Logos with Player Count:** Shows the number of players selected from each real-life team.
    *   **Progress Bar:** Visualizes selected players out of 11.
    *   **Role & Team Filters:** Helps in narrowing down the player list.
    *   **Player Cards:** Each player displays points and credits. Click to add/remove.
    *   **"Save Team"**: Proceeds to the Captain/Vice-Captain selection once 11 players are selected and all validation rules are met.
*   **Captain & Vice-Captain Page:** Designate a Captain (2x points) and Vice-Captain (1.5x points) from your selected 11 players. Clicking "Save Team" here finalizes and saves the team.

## 🤝 Challenges & Learnings

*   **Complex Validation Logic:** Implementing the multi-faceted validation rules (total players, per-team limits, role distribution, credits) for player selection required careful state management and conditional logic.
*   **State Persistence:** Integrating `redux-persist` was essential to ensure a smooth user experience where created teams are not lost on page refresh or navigation.
*   **Responsive Design:** Ensuring a consistent and intuitive UI across mobile, tablet, and desktop views, particularly for dynamic elements like player lists and team statistics, involved thoughtful use of Tailwind CSS breakpoints and flexible layouts.
*   **API Data Mapping:** Adapting the application's types and data handling to match the structure of the provided external APIs.

## 🔮 Future Enhancements

*   **Team Preview Details:** Enhance the team preview modal with more detailed player statistics and projections.
*   **Match Details Page:** Implement a dedicated page for detailed match information.
*   **User Authentication:** Introduce user login/registration to personalize team data.
*   **Backend Integration:** Connect to a backend to manage contests, leaderboards, and actual game logic.
*   **Advanced Filtering:** Add more sophisticated filtering and sorting options for players.
*   **Error Handling UI:** More user-friendly error displays for API failures.

---
