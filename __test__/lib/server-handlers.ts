// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import { rest } from 'msw'; // msw supports graphql too!

const handlers = [
  rest.get('/api/booking/cancel/*', async (req, res, ctx) => {
    console.log('here');
    return res(ctx.json({}));
  }),
  rest.post('/checkout', async (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
];

export { handlers };
