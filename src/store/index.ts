import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  EnhancedStore,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import userReducer from '@src/features/users/slice';
import productReducer from '@src/features/products/slice';
import { useSelector as rawUseSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';

// 参考 https://zenn.dev/nus3/articles/c2d86097029c12285680
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'p-next-test',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const useStore = (): EnhancedStore => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
};

/* Types */
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
