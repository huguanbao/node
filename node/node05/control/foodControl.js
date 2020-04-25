const foodModel = require("../db/model/foodModel");
// 添加菜品
let addFoods = async(obj) => {
        let result = await foodModel.insertMany(obj);
        return result;
    }
    // 查询所有菜品
let checkAllFoods = async(_id) => {
    let result = await foodModel.find({ _id });
    return result;
}

// 删除菜品
let removeFood = async(_id) => {
    let result = await foodModel.deleteOne({ _id });
    return result;
}

// 修改菜品
let modifyFood = async(_id, infos) => {
        let result = await foodModel.updateOne({ _id }, infos)
        return result;
    }
    // 分页查询
let pageFoods = async(page, pageSize) => {
        let allFood = await foodModel.find();
        let allFoods = await allFood.length;
        let result = await foodModel.find().skip(Number(page - 1) * pageSize).limit(Number(pageSize));
        return { result, allFoods };
    }
    // 分类查询
let classifyFood = async(foodType) => {

        let result = await foodModel.find({ foodType });
        return result;
    }
    // 关键字查询
let keywordFood = async(kw, page, pageSize) => {
    let regex = await new RegExp(kw);
    let allFood = await foodModel.find({ $or: [{ desc: { $regex: regex } }, { name: { $regex: regex } }] });
    let allCount = allFood.length
        // 分页后满足关键字的数据
    let result = await foodModel.find({ $or: [{ desc: { $regex: regex } }, { name: { $regex: regex } }] })
        .skip(Number((page - 1) * pageSize)).limit(Number(pageSize))
    return { result, allCount }

}
module.exports = { addFoods, checkAllFoods, removeFood, modifyFood, pageFoods, classifyFood, keywordFood }