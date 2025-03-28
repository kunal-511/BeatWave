.
├── backend
│   ├── dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── controller
│       │   ├── admin.controller.js
│       │   ├── album.controller.js
│       │   ├── auth.controller.js
│       │   ├── song.controller.js
│       │   ├── stat.controller.js
│       │   └── user.controller.js
│       ├── index.js
│       ├── lib
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   └── socket.js
│       ├── middleware
│       │   └── auth.middleware.js
│       ├── models
│       │   ├── album.model.js
│       │   ├── message.model.js
│       │   ├── song.model.js
│       │   └── user.model.js
│       ├── routes
│       │   ├── admin.route.js
│       │   ├── album.route.js
│       │   ├── auth.route.js
│       │   ├── song.route.js
│       │   ├── stat.route.js
│       │   └── user.route.js
│       └── seeds
│           ├── albums.js
│           └── songs.js
├── frontend
│   ├── components.json
│   ├── dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── albums
│   │   │   ├── 1.jpg
│   │   │   ├── 2.jpg
│   │   │   ├── 3.jpg
│   │   │   └── 4.jpg
│   │   ├── cover-images
│   │   │   ├── 10.jpg
│   │   │   ├── 11.jpg
│   │   │   ├── 12.jpg
│   │   │   ├── 13.jpg
│   │   │   ├── 14.jpg
│   │   │   ├── 15.jpg
│   │   │   ├── 16.jpg
│   │   │   ├── 17.jpg
│   │   │   ├── 18.jpg
│   │   │   ├── 1.jpg
│   │   │   ├── 2.jpg
│   │   │   ├── 3.jpg
│   │   │   ├── 4.jpg
│   │   │   ├── 5.jpg
│   │   │   ├── 6.jpg
│   │   │   ├── 7.jpg
│   │   │   ├── 8.jpg
│   │   │   └── 9.jpg
│   │   ├── google.png
│   │   ├── songs
│   │   │   ├── 10.mp3
│   │   │   ├── 11.mp3
│   │   │   ├── 12.mp3
│   │   │   ├── 13.mp3
│   │   │   ├── 14.mp3
│   │   │   ├── 15.mp3
│   │   │   ├── 16.mp3
│   │   │   ├── 17.mp3
│   │   │   ├── 18.mp3
│   │   │   ├── 1.mp3
│   │   │   ├── 2.mp3
│   │   │   ├── 3.mp3
│   │   │   ├── 4.mp3
│   │   │   ├── 5.mp3
│   │   │   ├── 6.mp3
│   │   │   ├── 7.mp3
│   │   │   ├── 8.mp3
│   │   │   └── 9.mp3
│   │   ├── spotify.png
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── SignInOAuthButtons.tsx
│   │   │   ├── skeletons
│   │   │   │   ├── FeaturedGridSkeleton.tsx
│   │   │   │   ├── PlaylistSkeleton.tsx
│   │   │   │   └── UsersListSkeleton.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── ui
│   │   │       ├── avatar.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── resizable.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       ├── select.tsx
│   │   │       ├── slider.tsx
│   │   │       ├── table.tsx
│   │   │       └── tabs.tsx
│   │   ├── index.css
│   │   ├── layout
│   │   │   ├── components
│   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   ├── FriendsActivity.tsx
│   │   │   │   ├── LeftSidebar.tsx
│   │   │   │   └── PlaybackControls.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── lib
│   │   │   ├── axios.ts
│   │   │   └── utils.ts
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── 404
│   │   │   │   └── NotFoundPage.tsx
│   │   │   ├── admin
│   │   │   │   ├── AdminPage.tsx
│   │   │   │   └── components
│   │   │   │       ├── AddAlbumDialog.tsx
│   │   │   │       ├── AddSongDialog.tsx
│   │   │   │       ├── AlbumsTabContent.tsx
│   │   │   │       ├── AlbumsTable.tsx
│   │   │   │       ├── DashboardStats.tsx
│   │   │   │       ├── Header.tsx
│   │   │   │       ├── SongsTabContent.tsx
│   │   │   │       ├── SongsTable.tsx
│   │   │   │       └── StatsCard.tsx
│   │   │   ├── album
│   │   │   │   └── AlbumPage.tsx
│   │   │   ├── auth-callback
│   │   │   │   └── AuthCallbackPage.tsx
│   │   │   ├── chat
│   │   │   │   ├── ChatPage.tsx
│   │   │   │   └── components
│   │   │   │       ├── ChatHeader.tsx
│   │   │   │       ├── MessageInput.tsx
│   │   │   │       └── UsersList.tsx
│   │   │   └── home
│   │   │       ├── components
│   │   │       │   ├── FeaturedSection.tsx
│   │   │       │   ├── PlayButton.tsx
│   │   │       │   ├── SectionGridSkeleton.tsx
│   │   │       │   └── SectionGrid.tsx
│   │   │       └── HomePage.tsx
│   │   ├── providers
│   │   │   └── AuthProvider.tsx
│   │   ├── stores
│   │   │   ├── useAuthStore.ts
│   │   │   ├── useChatStore.ts
│   │   │   ├── useMusicStore.ts
│   │   │   └── usePlayerStore.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── k8s
│   ├── backend-deployment.yml
│   ├── backend-service.yml
│   ├── configmaps.yml
│   ├── frontend-deployment.yml
│   ├── frontend-service.yml
│   ├── namespace.yml
│   └── secrets.yml
├── package.json
├── package-lock.json
└── README.md
