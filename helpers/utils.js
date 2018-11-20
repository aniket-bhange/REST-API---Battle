
class Utils{
    l(messgae){
        console.log(`${messgae}`, new Date())
    }
    e(error){
        console.error(`${error}`, new Date())
    }
    createSuccessResponse(txt, data, code=200){
        this.l(txt)
        return {
            status: code,
            messgae: txt,
            data: data
        }
    }

    createErrorResponse(txt, code=500, data){
        this.e(txt)
        return {
            status: code,
            messgae: txt,
            error: data
        }
    }
}


module.exports = new Utils()