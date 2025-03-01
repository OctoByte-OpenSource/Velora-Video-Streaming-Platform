
const TryCatch = async (passedFunction) => {
    try{
        await passedFunction;
    }catch(error){
        console.log(error)
    }
  
}

export default TryCatch
