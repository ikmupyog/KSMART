import _ from "lodash";


export const NA = "Not Recorded";


/**
 * 
 *  Returns joined String with Separator from obj with specified Key
 * 
 * @author: 
 * 
 * @param {{}} response 
 * 
 * @param {String} key 
 * 
 * @param {Boolean} multi 
 * 
 * @param { {defaultValue:"N/A", order:["En", "Ml"], separator: "/"} } props 
 * 
 * @returns {String}
 * 
 */
export const getFormattedValue = (data = {}, key = "", multi = true, props = {}) => {
    let initialValues = { defaultValue: NA, order: ["En", "Ml"], separator: "/" };
    const defaultData = { ...initialValues, ...props };
    if (multi) {
        let response = [];
        _.forEach(defaultData.order || [], (lang_key) => {
            let tempData = _.get(data, `${key}${lang_key}`);
            _.isEmpty(tempData) ? response.push(defaultData.defaultValue) : response.push(tempData)
        });
        return response.join(defaultData.separator);
    } else {
        let singleData = _.get(data, key);
        return _.isEmpty(singleData) ? defaultData.defaultValue : singleData;
    }
};