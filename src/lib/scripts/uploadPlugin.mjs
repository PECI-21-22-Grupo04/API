// /* The upload plugin and its functions. */

// import multer from "multer";
// import fs from "fs-extra";
// import path from "path";

// const uploadHandler = multer({ dest: "./uploads" }).single("file");

// /* Uploads the files server-side */
// const uploadFiles = async (req) =>
//     new Promise((resolve) =>
//         uploadHandler(req, null, () => resolve({ success: true, videopath:req.file.path }))


//     );

// export const uploadMiddleware = async (req, res, next) => {

//             if (!req.url.startsWith("/upload")) return next();

//             try {
//                 const hello=await uploadFiles(req);
//                 console.log("HELLOHELLOHELLOHELLO "+JSON.stringify(hello));
//                 res.writeHead(200, { "Content-Type": "text/plain" });
//                 //return res.end("XPTO");
//                 return{
//                     status: 200,
//                     body: {
//                         path: hello.videopath
//                     }
//                 }
//             } catch (err) {
//                 res.writeHead(500, {
//                     "Content-Type": "text/plain",
//                 });
//                 return res.end("upload plugin error: " + err);
//             }
//         }

// /* The upload plugin. See the svelte.config.js file */
// export const uploadPlugin = {
//     name: "upload-middleware",
//     configureServer(server) {
//         server.middlewares.use(uploadMiddleware);
//     },
// };

