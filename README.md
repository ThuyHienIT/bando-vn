# ![Facility Booking](https://facility-booking.vercel.app/_next/image?url=%2Flogo.png&w=32&q=75) Facility Booking System

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview of features

- Displaying all available Rooms and Facilities to the user
- Redirect to Room/Facility details when user click on details button
- Allow user to Book a slot by clicking on the white area inside the WeekView
- User can also view their bookings and cancel/edit their booking
- **Extra**: Login process, user can enter any `email` and `password` to login

## Build and start the application

_The application is running much faster than starting a dev server_

Node version: `16.13.2`
Yarn version: `1.22.19`

```bash
yarn // install dependencies

yarn build

yarn start
```

## Development server

_For developer_

```bash
yarn // install dependencies

yarn dev // start dev server
```

The application is serve at [http://localhost:3000](http://localhost:3000)

_Ps: Enter any email & password to login to the system_

_NOTE: I'm interact with files system to retrieve/store database. If you face any issue when submit a booking, please create a new file called `bookings.json` with content `[]` and change its permission to be writable: `chmod 755 db/bookings.json`. I face this issue when deploying to Vercel, because it's all readonly files. Need to integrate to MongoDB or other database services before go to production_

## Testing

This project is using Jest JavaScript testing framework along with Testing React Library. To run the test, simply run

```
yarn test

// or run test and watch files changes
yarn test --watch

// or generate coverage report
yarn test --coverage
```

## Development Process

1. Applied WaterFall methodology in developing the application:

   1. Analyse the requirements to list down all Screens, APIs, Features, etc
   2. Craft a Mock up of how the app look like on Figma ![Mockup](https://icons-for-free.com/download-icon-figma+product+prototyping+soft+icon-1320168267226111826_16.ico 'Figma') [view prototype](https://www.figma.com/proto/bHq2rdBxgsygNlQdMgdrgh/Facility-Booking?node-id=179446%3A170518&scaling=scale-down&page-id=179446%3A170394&starting-point-node-id=179446%3A170518)
   3. Create Tasks on Trello ![Trello](https://icons-for-free.com/download-icon-trello-1330289861633868130_16.png 'Trello Board') [view board](https://drive.google.com/file/d/1IYNZqYJJTIsUaSXjcSaDF6-GkGjjy7d5/view)
   4. Start development

2. Test Driven Development (TDD) Approach. I tried to apply this approach when implementing the application, I have some thoughts:
   1. It is an interesting process which forces developer to write all the unit tests before implementing its logic, so developer must think of all scenario and keep the unexpected bugs at the lowest level.
   2. It was really helpful when I developed the APIs which is I could mostly list down all possible input/output. I think it's helpful to implement those pure functions.
   3. However, to my mind, it was slow me down when I wrote unit tests before implementing React Component. So I decided to implement UI first and write unit tests later

## Technologies

- ![ReactJS](https://icons-for-free.com/download-icon-vscode+icons+type+reactjs-1324451469448726104_16.png) [ReactJS](https://reactjs.org/)
- <img src="https://miro.medium.com/max/1400/1*gxOA6-EF8P8vnYdk3Bc9bg.png" height="16" /> [NextJS](https://nextjs.org/)
- 💅 [Styled Components](https://styled-components.com/): styling
- <img src="https://recoiljs.org/img/logo.svg" alt="REcoilJS" height="16" /> [Recoil](https://recoiljs.org/): light & easy state management
- <img src="https://camo.githubusercontent.com/363242675617648bfbedd1610f89ac28df0f9e1bac8749d83109fafdf8524fff/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f726d73706f7274616c2f4b4470677667754d704766716148506a6963524b2e737667" alt= “” width="16" height="16"> [AntDesign](https://ant.design/)
- [Jest](https://jestjs.io/) + [Testing React Library](https://testing-library.com/docs/react-testing-library/intro/)
