import { UnauthenticatedState, useAppStore } from "./app";

describe("The app store", () => {
  it("should have authenticated = false in the initial state", () => {
    const store = useAppStore.getState();
    expect(store.authenticated).toBe(false);
  });

  describe("auth action should work properly", () => {
    beforeEach(() => {
      (useAppStore.getState() as UnauthenticatedState).auth("username");
    });
    it("should set authenticated to true", () => {
      expect(useAppStore.getState().authenticated).toBe(true);
    });
    it("should set the username", () => {
      expect(useAppStore.getState().username).toBe("username");
    });
  });
});
