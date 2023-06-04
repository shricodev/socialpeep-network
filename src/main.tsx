import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalProvider } from "./services/appwrite-service.tsx";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";
import authReducer from "./state";

// START
// this is straight from the documentation to help persist the state between closing and opening of the site
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// END

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </Provider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
