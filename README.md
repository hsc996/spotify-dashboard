# Spotify Stats Dashboard

## Context data / Global State

- Spotify API Context Provider
  - async reducer
    - endpoints for the data we want handled in the switch statement
    - save endpoint responses to state
- CSS theme context provider
  - dark/light/system
  - nor educer, just simple context state stuff


## Routes

- Homepage
  - Tiles for different stats
    - top 5 songs
    - top 5 artists
    - currently listening
    - most listened to genre (based on top 5 songs)
    - larger list of followed artists
    - users saved of top audiobooks
    - recommended content
- `localhost:3000/search/{userId}/`
- search page to get stats of other users --> "nice to have", not a priority


## App Features

- User profile data
  - Different API endpoints for self/current user and for user by id/username
- User's top items
- User's currently playing
- Form to check if user follows an artist
- Animations
- Styling
- Good documentations/code comments
- App theme


## Frontend UI Frankworks

- [Charka UI](https://v2.chakra-ui.com/)
- [Material UI](google.com)
- [UI Shadcn](https://ui.shadcn.com)

## Deployment and Security

- Netlify env variables: https://docs.netlify.com/environment-variables/overview/

## Useful Resources

- [Spotify Dev Docs](https://developer.spotify.com/documentation/web-api)