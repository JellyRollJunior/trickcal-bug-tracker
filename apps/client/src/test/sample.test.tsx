import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { App } from '@/app/App.tsx';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
  });
});

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});
