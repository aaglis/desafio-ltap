// src/core/hooks.ts
import { createTypedHooks } from "easy-peasy";
import { UserModel } from "./stores/users.store";

const typedHooks = createTypedHooks<UserModel>();

export const useTypedStoreActions = typedHooks.useStoreActions;
export const useTypedStoreDispatch = typedHooks.useStoreDispatch;
export const useTypedStoreState = typedHooks.useStoreState;
