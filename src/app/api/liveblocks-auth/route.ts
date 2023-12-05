// import { Liveblocks } from "@liveblocks/node";

// import { Magic } from "@magic-sdk/admin";

// let mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

// const liveblocks = new Liveblocks({
//   secret:
//     "sk_dev_-DqgpFjUfnuiq_Zg_Jiul0Z59tJqdRwK6hBgefsetWQVaChHeGUcExXNEHSWk5J6",
// });

// export async function POST(request: Request) {
//   const reqAuth = request.headers.get("Authorization");
//   if (!reqAuth) {
//     return new Response("No Authorization", { status: 401 });
//   }

//   const didToken = mAdmin.utils.parseAuthorizationHeader(reqAuth);
//   // Validate the token and send back a successful response
//   const validToken = mAdmin.token.validate(didToken);
//   // Get the current user from your database
//   const user = __getUserFromDB__(request);

//   // Start an auth session inside your endpoint
//   const session = liveblocks.prepareSession(
//     user.id,
//     { userInfo: user.metadata } // Optional
//   );

//   // Implement your own security, and give the user access to the room
//   const { room } = await request.json();
//   if (room && __shouldUserHaveAccess__(user, room)) {
//     session.allow(room, session.FULL_ACCESS);
//   }

//   // Authorize the user and return the result
//   const { status, body } = await session.authorize();
//   return new Response(body, { status });
// }
