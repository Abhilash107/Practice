// const asyncHandler = (fn)=>{// arrow back fn
//     return async (req, res, next)=>{// arrow back fn
//         try {
//             await fn(req, res, next)
//         } catch (error) {
//             res.status(error.code || 500)
//             .json({
//                 success: false,
//                 message: error.message
//             })
            
//         }
//     }
// }
// reqHandler is an async function, so using Promise here
const asyncHandler = (reqHandler) =>{
    return (req, res, next) =>{
        Promise
        .resolve(reqHandler(req, res, next))
        .catch( (error) =>{
            return next(error)
        } )
    }
}


export { asyncHandler };

//asyncHandler --> higher order takes a function(route handler) as argument and returns a function 
//reqHandler --> route handler (controller/function) which performs the DB and server-side operation
//It's an async function, to handle it, we use a promise to catch any errors.