const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    clone: () => ({
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
    }),
  })
);

if (!global.fetch) {
  (global as any).fetch = mockFetch;
}

export { mockFetch };
