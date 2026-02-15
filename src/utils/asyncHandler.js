const asyncHandler = (fn) =>{
    return (req,res,next) =>{
        Promise.resolve(fn(req,res,next)).catch(next);
    }
}

// It automatically catches async errors and sends them to error middleware.
// Magic wrapper.

module.exports = asyncHandler;