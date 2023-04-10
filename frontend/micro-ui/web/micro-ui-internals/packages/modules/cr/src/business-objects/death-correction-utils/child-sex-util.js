export const getFilteredChildSexData = (data) =>{
    let query = "[?(@.condition ==";
    if(data?.placeOfDeath === "HOSPITAL"){
       query += "HOSPITAL";
    } else if(data?.placeOfDeath === "NON-HOSPITAL"){
       query += "NON-HOSPITAL";
    }
    query += ")]";
    return query;
}