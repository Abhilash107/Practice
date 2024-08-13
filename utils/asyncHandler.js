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