# Start Local MongoDB server via Terminal
### `brew services start mongodb/brew/mongodb-community`
### `mongosh`

# Start Backend server.ts
1. cd into Backend folder `cd src/backend/`
2. start server-ts `npx ts-node src/server.ts`

# Start Frontend
1. cd into Frontend folder `cd src/frontend/`
2. start webserver `npm start`


# Dependencies for Backend:
1. `npm install express mongoose bcryptjs jsonwebtoken cors dotenv csurf cookie-parser uuid`
2. `npm install --save-dev @types/express @types/bcryptjs @types/jsonwebtoken @types/cors @types/node typescript @types/nodemailer @types/express-rate-limit`


# Dependencies for Frontend:
1. `npm install axios react react-dom react-router-dom cookie-parser`
2. `npm install --save-dev @types/react @types/react-dom @types/react-router-dom @types/typescript @types/zxcvbn`
3. `npm install style-loader css-loader --save-dev`
4. `npm install @svgr/webpack --save-dev`
5. `npm install --save-dev @types/js-cookie`


# Stop Process on Port via Terminal
### `losf -i :<port>`
### `kill -9 <pid>`
