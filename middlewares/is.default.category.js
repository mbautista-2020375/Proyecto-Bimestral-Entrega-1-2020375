import Category from "../src/category/category.model.js"

export const denyIfDefaultId = async(req, res, next)=>{
    console.log("Default category verification: ");
    
    try{
        const defaultCategory = await Category.findOne({name: 'Not Assigned'})
        if(req.params.id === defaultCategory._id.toString()){ 
            console.log(`-> You cant edit or delete this category, default category must stay.`);
            return res.status(403).send(
            {
                success: false,
                message: `Admin verification -> You cant edit or delete this category, default category must stay.`
            }
            
        )
        
    }
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Category verification -> Unauthorized to edit'
            }
        )
    }
}