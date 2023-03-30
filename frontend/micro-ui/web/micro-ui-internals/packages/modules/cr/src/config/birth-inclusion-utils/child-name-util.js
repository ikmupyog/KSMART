export const getFilteredChildNameData = (data) =>{
    let query = "[?(@.condition ==";
    if(data?.placeOfBirth === "HOSPITAL"){
       query += "HOSPITAL";
    } else if(data?.placeOfBirth === "NON-HOSPITAL"){
       query += "NON-HOSPITAL";
    }
    query += ")]";
    return query;
}