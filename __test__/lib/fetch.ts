const mockFetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
);

(global as any).fetch = mockFetch;

export { mockFetch };
