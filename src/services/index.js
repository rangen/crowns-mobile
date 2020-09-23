const JSON_BUCKET = 'https://pile-of-crowns.s3.us-east-2.amazonaws.com/'

const getDistrictData = async (state, district) => {
    let response = await fetch(JSON_BUCKET.concat(`${state}-${district}.json`));
    let json = await response.json();
    return json.reps;
}

const getStateData = async state => {
    let response = await fetch(JSON_BUCKET.concat(`${state}.json`));
    let json = await response.json();
    return json.senators;
}
const getDistrictGeoJSON = async (state, district) => {
    let response = await fetch(JSON_BUCKET.concat(`districts/${state}-${district}/shape.geojson`));
    let json = await response.json();
    return json;
}

const checkAddressInput = async input => {
    console.time('address')
    let result = {ok: false};

    let response = await fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${input}&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=${process.env.REACT_APP_GOOGLE_CIVIC}`)

    if (response.ok) {
        let json = await response.json();
        const {line1, city, state, zip} = json.normalizedInput;
        result.normalizedAddress = `${line1}  ${city}, ${state} ${zip}`

        const divisionKeys = Object.keys(json.divisions)

        // Google formats XXXXXXX's Congressional District or <State> for us
        // Object keys not predictable but the longest key is the most specific (state + district > state)
        const mostGranularKey = divisionKeys.reduce((res, ele)=>{if (ele.length > res.length) res = ele; return res;}, '')
        result.addressRegion = json.divisions[mostGranularKey].name
        
        let divisions = divisionKeys.map(d=>d.slice(d.lastIndexOf('/') + 1));

        divisions.forEach(i=>{
            let [type, value] = i.split(':');
            result[type] = value.toUpperCase();
        })

        if (result.state && result.cd) {
            result.ok = true;
        } else if (['DE', 'VT', 'WY', 'MT', 'ND', 'AK', 'SD'].includes(result.state)) {
            result.cd = '0';
            result.ok = true;
            result.addressRegion += "'s At-Large District"
        }
    } else {
        console.error('Malformed Address. Please try again.');
    }
    console.timeEnd('address');
    return result;
}
//     if (result.state && result.cd) {
//         let promises = [];
//         promises.push(getDistrictData(result.state, result.cd));
//         if (!['CA', 'CT', 'FL', 'HI', 'IN', 'MD', 'MO', 'NV', 'NY', 'ND', 'OH', 'PA', 'UT', 'VT', 'WA', 'WI'].includes(result.state)) {
//             promises.push(getStateData(result.state));
//         }
//         await Promise.all(promises)
//             .then(values=> {
//                 result.reps = values[0].reps;
//                 values[1] && (result.senators = values[1].senators);
//             });
//     }
//     return result;
// }

export default {
    getStateData:       getStateData,
    getDistrictData:    getDistrictData,
    checkAddress:       checkAddressInput,
    getDistrictGeoJSON: getDistrictGeoJSON
}