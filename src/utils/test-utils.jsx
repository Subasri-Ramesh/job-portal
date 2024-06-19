import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Custom render function to wrap components with providers if needed
function customRender(ui, options = {}) {
  return render(ui, {
    // Wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

// Export all functions from @testing-library/react
export * from '@testing-library/react';
// Export userEvent from @testing-library/user-event
export { default as userEvent } from '@testing-library/user-event';
// Override render export
export { customRender as render };
