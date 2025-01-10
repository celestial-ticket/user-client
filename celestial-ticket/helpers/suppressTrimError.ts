// suppressConsoleErrors.js
export const suppressSpecificConsoleErrors = () => {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Cannot read property 'trim' of undefined")
    ) {
      // Suppress the specific error message
      return;
    }
    // Call the original console.error for other errors
    originalConsoleError(...args);
  };
};
