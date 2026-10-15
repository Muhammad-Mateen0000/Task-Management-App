export const initialBoards = [
  {
    id: "board-1",
    title: "Website Redesign",
    workspace: "IT Beam Solutions",

    lists: [
      {
        id: "list-1",
        title: "To Do",

        cards: [
          {
            id: "card-1",
            title: "Finalize homepage wireframe",
            description:
              "Review the homepage structure and finalize the wireframe before development starts.",
            labels: [
              {
                name: "Design",
                color: "#8b5cf6",
              },
            ],
            dueDate: "2026-08-28",
            members: ["Ali"],
          },
          {
            id: "card-2",
            title: "Prepare content structure",
            description:
              "Define headings, sections, CTA content and supporting text required for the new website.",
            labels: [
              {
                name: "Research",
                color: "#10b981",
              },
            ],
            dueDate: "2026-08-29",
            members: ["Sara"],
          },
          {
            id: "card-3",
            title: "Define responsive breakpoints",
            description:
              "Document responsive breakpoints and layout behavior for desktop, tablet and mobile devices.",
            labels: [
              {
                name: "Design",
                color: "#8b5cf6",
              },
            ],
            dueDate: "2026-08-30",
            members: ["Ahmed"],
          },
        ],
      },

      {
        id: "list-2",
        title: "In Progress",

        cards: [
          {
            id: "card-4",
            title: "Develop homepage",
            description:
              "Implement the approved homepage design using reusable React components and responsive layouts.",
            labels: [
              {
                name: "Development",
                color: "#3b82f6",
              },
              {
                name: "Important",
                color: "#f59e0b",
              },
            ],
            dueDate: "2026-09-02",
            members: ["Ali", "Ahmed"],
          },
          {
            id: "card-5",
            title: "Implement navigation system",
            description:
              "Build the responsive navigation menu with desktop and mobile layouts.",
            labels: [
              {
                name: "Development",
                color: "#3b82f6",
              },
            ],
            dueDate: "2026-09-01",
            members: ["Hassan"],
          },
          {
            id: "card-6",
            title: "Create reusable UI components",
            description:
              "Develop reusable buttons, inputs, cards and other shared interface components.",
            labels: [
              {
                name: "Development",
                color: "#3b82f6",
              },
            ],
            dueDate: "2026-09-03",
            members: ["Sara", "Hassan"],
          },
        ],
      },

      {
        id: "list-3",
        title: "Pending",

        cards: [
          {
            id: "card-7",
            title: "Resolve mobile layout issues",
            description:
              "Investigate and resolve spacing, overflow and alignment issues on smaller screens.",
            labels: [
              {
                name: "Bug",
                color: "#ef4444",
              },
            ],
            dueDate: "2026-08-31",
            members: ["Ahmed"],
          },
          {
            id: "card-8",
            title: "Review accessibility requirements",
            description:
              "Verify keyboard navigation, semantic structure, labels and basic accessibility requirements.",
            labels: [
              {
                name: "Research",
                color: "#10b981",
              },
            ],
            dueDate: "2026-09-04",
            members: ["Ali"],
          },
        ],
      },

      {
        id: "list-4",
        title: "Done",

        cards: [
          {
            id: "card-9",
            title: "Set up project structure",
            description:
              "Initialize the application structure and organize pages, components and utility files.",
            labels: [
              {
                name: "Development",
                color: "#3b82f6",
              },
            ],
            dueDate: "",
            members: ["Hassan"],
          },
          {
            id: "card-10",
            title: "Approve visual design",
            description:
              "Review and approve the final visual direction, typography and component styling.",
            labels: [
              {
                name: "Design",
                color: "#8b5cf6",
              },
            ],
            dueDate: "",
            members: ["Sara"],
          },
          {
            id: "card-11",
            title: "Complete project requirements",
            description:
              "Document and confirm the functional and technical requirements for the redesign.",
            labels: [
              {
                name: "Important",
                color: "#f59e0b",
              },
            ],
            dueDate: "",
            members: ["Ali", "Ahmed"],
          },
        ],
      },
    ],
  },

  {
    id: "board-2",
    title: "Mobile Application",
    workspace: "IT Beam Solutions",

    lists: [
      {
        id: "mobile-list-1",
        title: "To Do",

        cards: [
          {
            id: "mobile-card-1",
            title: "Define authentication flow",
            description:
              "Document login, registration, password recovery and session management flows.",
            labels: [
              {
                name: "Research",
                color: "#10b981",
              },
            ],
            dueDate: "2026-09-05",
            members: ["Ahmed"],
          },
          {
            id: "mobile-card-2",
            title: "Design onboarding screens",
            description:
              "Create the initial onboarding experience for new application users.",
            labels: [
              {
                name: "Design",
                color: "#8b5cf6",
              },
            ],
            dueDate: "2026-09-06",
            members: ["Sara"],
          },
        ],
      },

      {
        id: "mobile-list-2",
        title: "In Progress",

        cards: [
          {
            id: "mobile-card-3",
            title: "Implement user authentication",
            description:
              "Integrate authentication APIs and implement login and registration screens.",
            labels: [
              {
                name: "Development",
                color: "#3b82f6",
              },
              {
                name: "Important",
                color: "#f59e0b",
              },
            ],
            dueDate: "2026-09-08",
            members: ["Ali", "Hassan"],
          },
        ],
      },

      {
        id: "mobile-list-3",
        title: "Pending",

        cards: [
          {
            id: "mobile-card-4",
            title: "Test API error handling",
            description:
              "Verify API failures, validation errors and network error states across the application.",
            labels: [
              {
                name: "Bug",
                color: "#ef4444",
              },
            ],
            dueDate: "2026-09-10",
            members: ["Ahmed", "Hassan"],
          },
        ],
      },

      {
        id: "mobile-list-4",
        title: "Done",

        cards: [
          {
            id: "mobile-card-5",
            title: "Create application architecture",
            description:
              "Define the application structure, navigation flow and reusable component strategy.",
            labels: [
              {
                name: "Development",
                color: "#3b82f6",
              },
            ],
            dueDate: "",
            members: ["Ali"],
          },
        ],
      },
    ],
  },
];
